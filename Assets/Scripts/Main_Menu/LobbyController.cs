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
		//lobbyConnectButton.SetActive(true);

		roomListings = new List<RoomInfo>();

		//validamos el nombre del jguador
		if(PlayerPrefs.HasKey("NickName")){
			if(PlayerPrefs.GetString("NickName") == ""){
				//Le asignamos un nombre random
				//PhotonNetwork.NickName = "Player " + Random.Range(0, 1000);
			}else{
				PhotonNetwork.NickName = PlayerPrefs.GetString("NickName");
			}
		}else{
			//Le asignamos un nombre random
			//PhotonNetwork.NickName = "Player " + Random.Range(0, 1000);
		}

		playerNameInput.text = PhotonNetwork.NickName; //Ponemos el nombre en el campo text
	}

	public void PlayerNameUpdate(string nameInput){

		PhotonNetwork.NickName = nameInput;
		PlayerPrefs.SetString("NickName", nameInput);
	}

	public void JoinLobbyOnClick(){
		if(PhotonNetwork.NickName == ""){
			//NotificationManager.Instance.SetNewNotification("Se debe ingresar un nombre de jugador.") ;
			PhotonNetwork.NickName = "Player " + Random.Range(0, 1000);
			//return;
		}
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

	public override void OnRoomListUpdate(List<RoomInfo> roomList){
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

	public void OnRoomSizeChanged(string sizeIn){
		//roomSize = int.Parse(sizeIn);
	}

	public void CreateRoom(){
		//Debug.Log("Creando room...");

		//Validamos que tenga parámetros
		if(string.IsNullOrEmpty(roomName)){
			//Debug.Log("No se puede crear el room sin los parámetros necesarios.");
			NotificationManager.Instance.SetNewNotification("Se debe ingresar un nombre para la sala.") ;
			return;
		}

		RoomOptions roomOps = new RoomOptions() { IsVisible = true, IsOpen = true, MaxPlayers = (byte)4 };

		
		PhotonNetwork.CreateRoom(roomName, roomOps);


		chatText.GetComponent<PhotonView>().RequestOwnership();
		chatText.text = " ";
	}

	public override void OnCreateRoomFailed(short returnCode, string message){
		//Debug.Log("Error al crear room, intenta cambiar el nombre");
		NotificationManager.Instance.SetNewNotification("Error al crear la sala. Cambia el nombre o intentalo más tarde.") ;
	}

	public void MatchmakingCancel(){
		mainPanel.SetActive(true);
		lobbyPanel.SetActive(false);
		PhotonNetwork.LeaveLobby();
	}
}
