using Photon.Pun;
using System.IO;
using UnityEngine;
using UnityEngine.UI;
public class GameSetup : MonoBehaviour {

	[SerializeField]
	private Text pirata;
	// Use this for initialization

	private bool instanciado = false;
	void Start () {
		//PhotonNetwork.AutomaticallySyncScene = true;//activamos de nuevo la sincronización de escenas.
		Debug.Log("Entró a game setup");
		//CreatePlayer();
	}

	void Update(){
		if(pirata.text != "Nombre Pirata" && !instanciado){
			CreatePlayer();
			instanciado = true;
		}
	}
	
	// Update is called once per frame
	private void CreatePlayer(){
		//PhotonNetwork.Instantiate(Path.Combine("PhotonPrefabs","PhotonPlayer1"),new Vector3(-1.3f,6.4f,9.8f), Quaternion.identity);
		string photonPlayer = "";


		switch(pirata.text){
			case "Pirata 1":
				photonPlayer = "PhotonPlayer1";
				break;
			case "Pirata 2":
				photonPlayer = "PhotonPlayer2";
				break;
			case "Pirata 3":
				photonPlayer = "PhotonPlayer3";
				break;
			case "Pirata 4":
				photonPlayer = "PhotonPlayer4";
				break;
			default:
				return;
		}
		
		PhotonNetwork.Instantiate(Path.Combine("PhotonPrefabs",photonPlayer),new Vector3(-1.3f,6.4f,9.8f), Quaternion.identity);
		Debug.Log(photonPlayer + " conectado");
	}
}
