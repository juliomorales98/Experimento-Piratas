/*
Entornos virtuales
Creador: Julio Morales: juliocesar.mr@protonmail.com

Valida si el jugador intenta mandar un mensaje, si es así llama función RPC para que se instancie en todos los clientes.
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
	
	
	void Update () {
		if(Input.GetKey(KeyCode.Return) && msgInput.text != ""){			
			myPV.RPC("SendChatMessage", RpcTarget.All, "(" + PhotonNetwork.NickName + "): " + msgInput.text);
			//Hacemos que quede el focus en el chat
			msgInput.text = "";
			msgInput.ActivateInputField();
		}
	}

	[PunRPC]
	private void SendChatMessage(string msg){		
		GameObject aux = GameObject.FindGameObjectWithTag("ChatManager");
		aux.GetComponent<MessagesList>().AddMessage(msg);
		
	}
}
