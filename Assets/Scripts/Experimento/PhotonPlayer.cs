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
		
			PhotonNetwork.Instantiate(Path.Combine("PhotonPrefabs","Pirata3"),
			GameSetup.GS.spawnPoints[spawnPicker].position,GameSetup.GS.spawnPoints[spawnPicker].rotation,
			0);

		}
	}
}
