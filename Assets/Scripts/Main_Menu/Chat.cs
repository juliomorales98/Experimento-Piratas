/*
Entornos virtuales
Creador: Julio Morales: juliocesar.mr@protonmail.com
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;
using UnityEngine.Events;

public class Chat : MonoBehaviour {
	private string message;

	private Text messages;

	private InputField msgInput;

	private PhotonView myPV;

	// Use this for initialization
	void Start () {
		myPV = gameObject.GetComponent<PhotonView>();
		foreach(GameObject go in GameObject.FindGameObjectsWithTag("ChatObject")){
			if(go.name == "MessagesText")
				messages = go.GetComponent<Text>();				
			
			if(go.name == "MessageInputField"){
				msgInput = go.GetComponent<InputField>();
			}
		}
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.GetKey(KeyCode.Return) && msgInput.text != ""){
			SendMessage();
		}
	}

	private void SendMessage(){
		if(msgInput.text == "")
			return;

		message = "\n(" + PhotonNetwork.NickName + "): " + msgInput.text;
		msgInput.text = "";
		messages.GetComponent<PhotonView>().RequestOwnership();
		messages.text +=  message;

		//Hacemos que quede el focus en el chat
		msgInput.ActivateInputField();
	}
}
