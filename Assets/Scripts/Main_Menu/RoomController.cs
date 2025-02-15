﻿/*
juliocesar.mr@protonmail.com

Manager para todas las opciones del room excepto el chat.
*/

using Photon.Pun;
using Photon.Realtime;
using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using System.IO;
public class RoomController : MonoBehaviourPunCallbacks {

	[SerializeField]
	private int multiPlayerSceneIndex; //para cargar multiplayer scene

	[SerializeField]
	private GameObject lobbyPanel;

	[SerializeField]
	private GameObject roomPanel;

	[SerializeField]
	private GameObject startButton;

	[SerializeField] private GameObject timeInputField;

	[SerializeField]
	private Transform playersContainer;

	[SerializeField]
	private GameObject playerListingPrefab;

	[SerializeField]
	private Text roomNameDisplay;

	//[SerializeField]private Text chatText;

	[SerializeField]private Transform messageList;

	[SerializeField]private GameObject messageManager;

	[SerializeField]
	private Transform roomsContainer; //contenedor para tener la lista de rooms

	void ClearPlayerListing(){	//Limpiamos lista de jugadores conectados a la sala.

		for( int i = playersContainer.childCount - 1; i >= 0; i--){
			Destroy(playersContainer.GetChild(i).gameObject);
		}

	}

	void ListPlayers(){	//Agregamos los jugadores a la lista de la sala.
		foreach(Player player in PhotonNetwork.PlayerList){
			GameObject tempListing = Instantiate(playerListingPrefab, playersContainer);
			Text tempText = tempListing.transform.GetChild(0).GetComponent<Text>();

			tempText.text = player.NickName;

		}
	}

	public override void OnJoinedRoom(){
		//Activamos panel de sala
		roomPanel.SetActive(true);
		lobbyPanel.SetActive(false);

		//Ponemos el nombre de la sala en el título
		roomNameDisplay.text = "Sala: " + PhotonNetwork.CurrentRoom.Name;

		//Si es host puede inicial el juego
		if(PhotonNetwork.IsMasterClient){
			startButton.SetActive(true);
			timeInputField.SetActive(true);

		}else{
			startButton.SetActive(false);
			timeInputField.SetActive(false);
		}

		ClearPlayerListing();
		ListPlayers();

		//Prefab para poder interactuar con el chat, teniendo una conexión con este
		PhotonNetwork.Instantiate(Path.Combine("PhotonPrefabs","PlayerChat"),Vector3.zero, Quaternion.identity);
		
		
		//Cuando ingresemos a la sala, eliminamos los mensajes si es que hay, evitando que
		//si salimos y entramos a otra sala se vean los mensajes anteriores.
		for( int i = messageList.childCount - 1; i >= 0; i--){
			Destroy(messageList.GetChild(i).gameObject);
		}

		
				
	}

	public override void OnPlayerEnteredRoom(Player newPlayer){
		ClearPlayerListing();
		ListPlayers();		
	}

	public override void OnPlayerLeftRoom(Player otherPlayer){
		ClearPlayerListing();
		ListPlayers();

		//Host migration
		//Validamos si el actual jugador se convirtió en host después de que este 
		//abandonara el room
		if(PhotonNetwork.IsMasterClient){
			startButton.SetActive(true);
		}
		
	}

	public void StartGame(){
		if(PhotonNetwork.IsMasterClient){			
			PhotonNetwork.CurrentRoom.IsOpen = false; //Si está en false, jugadores ya no podrán unirse iniciado el juego
			PhotonNetwork.LoadLevel(multiPlayerSceneIndex);
		}
	}

	IEnumerator rejoinLobby(){
		yield return new WaitForSeconds(1);
		PhotonNetwork.JoinLobby();
	}

	public void BackOnClick(){	//Salimos de la sala
		//Para evitar errores con el host al regresar al lobby
		lobbyPanel.SetActive(true);
		roomPanel.SetActive(false);
		PhotonNetwork.LeaveRoom();
		PhotonNetwork.LeaveLobby();
		StartCoroutine(rejoinLobby());
		//Eliminamos salas para que se actualizen sin repetirse
		messageManager.GetComponent<MessagesList>().DeleteMessages();		
		for( int i = roomsContainer.childCount - 1; i >= 0; i--){
			Destroy(roomsContainer.GetChild(i).gameObject);
		}
	}

	
}
