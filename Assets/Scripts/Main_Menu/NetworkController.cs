using Photon.Pun;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class NetworkController : MonoBehaviourPunCallbacks {

	[SerializeField]
	public GameObject connectButton;
	
	void Start () {
		PhotonNetwork.ConnectUsingSettings();
	}
	
	
	public override void OnConnectedToMaster(){
		Debug.Log("Estamos conectados a " + PhotonNetwork.CloudRegion);
		connectButton.SetActive(true);
	}
}
