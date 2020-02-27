/*
Entornos virtuales
Creador: Julio Morales: juliocesar.mr@protonmail.com
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
public class IsSelected : MonoBehaviour, IPunObservable {

	private PhotonView myPV;

	private bool isSelected;
	private string owner;

	// Use this for initialization
	void Start () {
		myPV = GetComponent<PhotonView>();

		myPV.OwnershipTransfer = OwnershipOption.Takeover;
		isSelected = false;
		owner = "";
	}
	
	public bool GetIsSelected(){
		return isSelected;
	}
	public string GetOwner(){
		return owner;
	}

	public bool SetOwnership(string newOwner){
		if(!isSelected){
			isSelected = true;
			owner = newOwner;
			return true;
		}else{
			//Debug.Log("Pirata ya está seleccionado por " + owner);
			NotificationManager.Instance.SetNewNotification("Este pirata ya está seleccionado por " + owner);
		}
		return false;
	}

	public void RemoveOwnership(){
		isSelected = false;
		owner = "";
	}

	public void OnPhotonSerializeView(PhotonStream stream, PhotonMessageInfo info){

		if(stream.IsWriting){
			stream.SendNext(isSelected);
			stream.SendNext(owner);
		}else{
			isSelected = (bool)stream.ReceiveNext();
			owner = (string)stream.ReceiveNext();
		}
	}
}
