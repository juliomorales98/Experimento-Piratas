/*
Entornos virtuales
Creador: Julio Morales: juliocesar.mr@protonmail.com

Genera la conexión al mejor servidor o al servidor que se haya especificado en unity.
Si ya existe una conexión al iniciar la escena, nos desconectamos de esta y volvemos a conectar.
*/


using Photon.Pun;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class NetworkController : MonoBehaviourPunCallbacks {

	[SerializeField]
	public GameObject connectButton;	
	
	void Start () {
		Cursor.visible = true;
		Cursor.lockState = CursorLockMode.None;
		//Validamos si estamos conectados
		if( PhotonNetwork.CloudRegion != null){
			//Significa que estamos conectados, por lo que primero nos desconectamos del actual servidor
			PhotonNetwork.Disconnect();
			Debug.Log("Nos desconectamos del anterior servidor");
		}

		//Nos conectamos a el mejor servidor según photon
		PhotonNetwork.ConnectUsingSettings();		
	}	
	
	public override void OnConnectedToMaster(){
		
		Debug.Log("Nos conectamos a " + PhotonNetwork.CloudRegion);
		connectButton.SetActive(true);
		PhotonNetwork.AutomaticallySyncScene = true;
	}
}
