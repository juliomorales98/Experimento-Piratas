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

	[SerializeField]private GameObject networkGlow;
	

	// Use this for initialization
	void Start () {
		myPV = GetComponent<PhotonView>();

		myPV.OwnershipTransfer = OwnershipOption.Takeover;
		isSelected = false;
		owner = "";
	}

	void Update(){
		if(isSelected){
			
			networkGlow.GetComponent<Renderer>().enabled = true;
			
		}else{			
			networkGlow.GetComponent<Renderer>().enabled = false;
		}
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
			networkGlow.GetComponent<Renderer>().enabled = true;
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
		networkGlow.GetComponent<Renderer>().enabled = false;
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
