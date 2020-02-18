using Photon.Pun;
using System.IO;
using UnityEngine;
using UnityEngine.UI;
public class GameSetup : MonoBehaviour {

	public static GameSetup GS;

	public Transform[] spawnPoints;

	

	private void OnEnable(){
		if(GameSetup.GS == null){
			GameSetup.GS = this;
		}
	}
	void Start () {
		//PhotonNetwork.AutomaticallySyncScene = true;//activamos de nuevo la sincronización de escenas.
		Debug.Log("Entró a game setup");
		CreatePlayer();
	}

	void Update(){
		
	}
	
	// Update is called once per frame
	private void CreatePlayer(){
		PhotonNetwork.Instantiate(Path.Combine("PhotonPrefabs","PhotonNetworkPlayer"),new Vector3(-1.3f,6.4f,9.8f), Quaternion.identity);
		
	}
}
