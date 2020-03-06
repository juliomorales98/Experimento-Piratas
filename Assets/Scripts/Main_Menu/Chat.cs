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
			//SendChatMessage("(" + PhotonNetwork.NickName + "): " + msgInput.text);
			myPV.RPC("SendChatMessage", RpcTarget.All, "(" + PhotonNetwork.NickName + "): " + msgInput.text);
			//Hacemos que quede el focus en el chat
			msgInput.text = "";
			msgInput.ActivateInputField();
		}
	}

	[PunRPC]
	private void SendChatMessage(string msg){
		/*if(msgInput.text == "")
			return;*/
		GameObject aux = GameObject.FindGameObjectWithTag("ChatManager");
		aux.GetComponent<MessagesList>().AddMessage(msg);
		
	}
}
