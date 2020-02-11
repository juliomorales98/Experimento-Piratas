using Photon.Pun;
using System.IO;
using UnityEngine;

public class GameSetup : MonoBehaviour {

	// Use this for initialization
	void Start () {
		CreatePlayer();
	}
	
	// Update is called once per frame
	private void CreatePlayer(){
		Debug.Log("Jugador conectado");
		//PhotonNetwork.Instantiate(Path.Combine("PhotonPrefabs","PhotonPlayer"),Vector3.zero, Quaternion.identity);
	}
}
