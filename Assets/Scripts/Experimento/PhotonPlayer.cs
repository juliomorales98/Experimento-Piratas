/*
Entornos virtuales
Creador: Julio Morales: juliocesar.mr@protonmail.com
*/


using Photon.Pun;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.IO;

public class PhotonPlayer : MonoBehaviour {

	private PhotonView PV;

	void Start(){
		
		CreateAvatar();
	}
	
	
	void CreateAvatar () {
		PV = GetComponent<PhotonView>();
		int spawnPicker = Random.Range(0,GameSetup.GS.spawnPoints.Length);
		if(PV.IsMine){		
			string pirata = "";
			switch(SelectCharacter.SC.characterSelected){
				case 1: 
					pirata = "Pirata1";
					break;
				case 2: 
					pirata = "Pirata 2";
					break;
				case 3: 
					pirata = "Pirata3";
					break;
				case 4: 
					pirata = "Pirata 4";
					break;	
			}
			PhotonNetwork.Instantiate(Path.Combine("PhotonPrefabs",pirata),
			GameSetup.GS.spawnPoints[spawnPicker].position,GameSetup.GS.spawnPoints[spawnPicker].rotation,
			0);

		}
	}
}
