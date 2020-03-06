using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using UnityEngine.UI;

public class MessagesList : MonoBehaviour {

	private List<string> msgList;
	private PhotonView myPv;
	[SerializeField]private GameObject messageListPrefab;
	[SerializeField]private Transform msgText;
	[SerializeField]private GameObject scrollBarGO;

	private float scrollBarSize;
	void Start(){
		msgList = new List<string>();
		myPv = transform.GetComponent<PhotonView>();
		scrollBarSize = 1;
		scrollBarGO.GetComponent<Scrollbar>().value = 0;
	}
	

	public void AddMessage(string msg){
		msgList.Add(msg);
		//Limpiamos msg
		int i;
		for(i = msgText.childCount - 1; i >= 0; i--){
			Destroy(msgText.GetChild(i).gameObject);
		}
		//Añadimos mensajes 
		/*foreach(string s in msgList){
			GameObject tempMsg = Instantiate(messageListPrefab, msgText);
			tempMsg.transform.GetComponent<Text>().text = s;

		}*/
		
		for(i = 0; i < msgList.Count; i++){
			GameObject tempMsg = Instantiate(messageListPrefab, msgText);
			tempMsg.transform.GetComponent<Text>().text = msgList[i];
			
		}
		scrollBarGO.GetComponent<Scrollbar>().value = 0;
	}
}
