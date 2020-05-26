/*juliocesar.mr@protonmail.com
	Se encarga de almacenar los mansajes enviados y de instsanciarlos como objetos hijos en el displayer
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using UnityEngine.UI;

public class MessagesList : MonoBehaviour {

	private List<string> msgList;
	private PhotonView myPv;
	[SerializeField]private GameObject[] messageListPrefab;
	[SerializeField]private Transform msgText;
	[SerializeField]private GameObject scrollBarGO;

	private float scrollBarSize;
	void Start(){
		msgList = new List<string>();
		myPv = transform.GetComponent<PhotonView>();
		scrollBarSize = 1;
		scrollBarGO.GetComponent<Scrollbar>().value = 0;
	}
	
	public void DeleteMessages(){
		msgList = new List<string>();
	}

	public void AddMessage(string msg){
		//Agregamos mensaje a la lista de mensajes
		msgList.Add(msg);		
		//limpiamos mensaje
		int i;
		for(i = msgText.childCount - 1; i >= 0; i--){
			Destroy(msgText.GetChild(i).gameObject);
		}		
		for(i = 0; i < msgList.Count; i++){
			GameObject tempMsg;
			//Dependiendo del tamaño del mensaje, instanciamos un prefab u otro para que se visualize correctamente según su tamaño
			if(msgList[i].Length <= 45){				
				tempMsg = Instantiate(messageListPrefab[0], msgText);
			}else if(msgList[i].Length <= 90){				
				tempMsg = Instantiate(messageListPrefab[1], msgText);
			}else{				
				tempMsg = Instantiate(messageListPrefab[2], msgText);
			}			
			tempMsg.transform.GetComponent<Text>().text = msgList[i];			
		}
		scrollBarGO.GetComponent<Scrollbar>().value = 0;
	}
}
