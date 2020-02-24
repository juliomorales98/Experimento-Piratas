/*
Entornos virtuales
Creador: Julio Morales: juliocesar.mr@protonmail.com
*/


using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;
public class SyncChat : MonoBehaviour, IPunObservable {

	private Text msgText;

	// Use this for initialization
	void Start () {
		msgText = gameObject.GetComponent<Text>();
		gameObject.GetComponent<PhotonView>().OwnershipTransfer = OwnershipOption.Takeover;
	}
	
	public void OnPhotonSerializeView(PhotonStream stream, PhotonMessageInfo info){
		if(stream.IsWriting){
			stream.SendNext(msgText.text);
		}else{
			msgText.text = (string)stream.ReceiveNext();
		}
	}
}
