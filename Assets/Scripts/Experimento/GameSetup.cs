using Photon.Pun;
using System.IO;
using UnityEngine;

public class GameSetup : MonoBehaviour {

	// Use this for initialization
	void Start () {
		//PhotonNetwork.AutomaticallySyncScene = true;//activamos de nuevo la sincronización de escenas.
		CreatePlayer();
	}
	
	// Update is called once per frame
	private void CreatePlayer(){
		Debug.Log("Jugador conectado");
		PhotonNetwork.Instantiate(Path.Combine("PhotonPrefabs","PhotonPlayer1"),new Vector3(-1.3f,6.4f,9.8f), Quaternion.identity);
	}
}
