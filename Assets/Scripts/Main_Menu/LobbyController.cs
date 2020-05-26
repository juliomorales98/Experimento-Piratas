/*
juliocesar.mr@protonmail.com

Manager para las funciones del lobby, como lo es el listado de salas y creación de estas.
*/

using Photon.Pun;
using Photon.Realtime;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LobbyController : MonoBehaviourPunCallbacks {

	/*[SerializeField]
	private GameObject lobbyConnectButton;//para conectarse al lobby*/

	[SerializeField]
	private GameObject lobbyPanel; //panel que se mostrará en el lobby

	[SerializeField]
	private GameObject mainPanel; //panel que se mostrará en el menú principal

	[SerializeField]
	private InputField playerNameInput;

	private string roomName;
	//private int roomSize;

	private List<RoomInfo> roomListings; //rooms actuales

	[SerializeField]
	private Transform roomsContainer; //contenedor para tener la lista de rooms

	[SerializeField]
	private GameObject roomListingPrefab;

	[SerializeField]private Text chatText;

	[SerializeField]private Text playerNameText;
	public override void OnConnectedToMaster(){
		

		roomListings = new List<RoomInfo>();

		//Validamos el nombre del jguador
		if(PlayerPrefs.HasKey("NickName")){
			if(PlayerPrefs.GetString("NickName") == ""){
				
			}else{
				PhotonNetwork.NickName = PlayerPrefs.GetString("NickName");
			}
		}else{
			
		}

		playerNameInput.text = PhotonNetwork.NickName; //Ponemos el nombre en el campo text
	}

	public void PlayerNameUpdate(string nameInput){

		PhotonNetwork.NickName = nameInput;
		PlayerPrefs.SetString("NickName", nameInput);
	}

	public void JoinLobbyOnClick(){
		if(PhotonNetwork.NickName == ""){	//Si no se ingresó un nombre, le generamos uno random.			
			PhotonNetwork.NickName = "Player " + Random.Range(0, 1000);			
		}
		//Activamos los paneles del lobby
		mainPanel.SetActive(false);
		lobbyPanel.SetActive(true);
		PhotonNetwork.JoinLobby();//Se intenta conectar a un room existente
		playerNameText.text = PhotonNetwork.NickName;		
	}

	//---------------------------Entramos en un lobby...........................\\

	
	static System.Predicate<RoomInfo> ByName(string name){

		return delegate (RoomInfo room){
			return room.Name == name;
		};
	}

	void ListRoom(RoomInfo room){
		if(room.IsOpen && room.IsVisible){
			GameObject tempListing = Instantiate(roomListingPrefab, roomsContainer);			
			RoomButton tempButton = tempListing.GetComponent<RoomButton>(); //Script

			tempButton.SetRoom(room.Name, room.MaxPlayers, room.PlayerCount);
		}
	}

	public override void OnRoomListUpdate(List<RoomInfo> roomList){	//Se manda a llamar automáticamente por photon cuando la información de las salas cambia.
		int tempIndex;
		foreach(RoomInfo room in roomList){
			if(roomListings != null){
				tempIndex = roomListings.FindIndex(ByName(room.Name));
			}else{
				tempIndex = -1;
			}
			if(tempIndex != -1){
				roomListings.RemoveAt(tempIndex);
				Destroy(roomsContainer.GetChild(tempIndex).gameObject);
			}
			if(room.PlayerCount > 0){
				roomListings.Add(room);
				ListRoom(room);
			}
		}
	}

	public void OnRoomNameChanged(string nameIn){
		roomName = nameIn;
	}

	public void OnRoomSizeChanged(string sizeIn){}

	public void LeaveLobbyClick(){//Salimos del lobby al login
		mainPanel.SetActive(true);
		lobbyPanel.SetActive(false);
		PhotonNetwork.LeaveLobby();
	}

	public void CreateRoom(){
		//Validamos que haya ingresado un nombre
		if(string.IsNullOrEmpty(roomName)){			
			NotificationManager.Instance.SetNewNotification("Se debe ingresar un nombre para la sala.") ;
			return;
		}
		//Opciones de sala: visible, abierta para los jugadores y con un máximo de 4 jugadores.
		RoomOptions roomOps = new RoomOptions() { IsVisible = true, IsOpen = true, MaxPlayers = (byte)4 };		
		PhotonNetwork.CreateRoom(roomName, roomOps);
	}

	public override void OnCreateRoomFailed(short returnCode, string message){
		//Normalmente se tiene un nombre duplicado de sala.
		NotificationManager.Instance.SetNewNotification("Error al crear la sala. Cambia el nombre o intentalo más tarde.") ;
	}

	public void MatchmakingCancel(){
		mainPanel.SetActive(true);
		lobbyPanel.SetActive(false);
		PhotonNetwork.LeaveLobby();
	}
}
