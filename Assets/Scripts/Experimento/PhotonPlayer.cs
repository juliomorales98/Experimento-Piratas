using Photon.Pun;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.IO;

public class PhotonPlayer : MonoBehaviour {

	private PhotonView PV;

	public GameObject myAvatar;

	private Text pirata;

	private bool instanciado = false;
	// Use this for initialization

	void Start(){
		//pirata = GameObject.Find("Pirate Name").GetComponent<Text>();
		CreateAvatar();
	}

	void Update () {
		/*if(pirata.text != "Nombre Pirata" && !instanciado){
			CreateAvatar();
			instanciado = true;
		}*/
	}
	
	// Update is called once per frame
	void CreateAvatar () {
		PV = GetComponent<PhotonView>();
		int spawnPicker = Random.Range(0,GameSetup.GS.spawnPoints.Length);
		if(PV.IsMine){		
		
			 myAvatar = PhotonNetwork.Instantiate(Path.Combine("PhotonPrefabs","Pirata1"),
			GameSetup.GS.spawnPoints[spawnPicker].position,GameSetup.GS.spawnPoints[spawnPicker].rotation,
			0);

		}
	}
}
