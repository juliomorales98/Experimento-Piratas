/*
Entornos virtuales
Creador: Julio Morales: juliocesar.mr@protonmail.com
*/
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using System;
using Photon.Pun;
///<summary>
///Está revisando si ya han pasado 10 minutos y, si es así
///Manda un mensaje a la pantalla del jugador y después de 
///5 segundos regresa al menú principal.
///<summary>
public class CheckTimeOut : MonoBehaviour {
	private Text TimeText;
	private int tiempoMaximo;
	void Start(){
		tiempoMaximo = SetExperimentDuration.SED.getLength();
		TimeText = GameObject.FindGameObjectWithTag("Info_Display").GetComponent<Text>();
	}	
	void OnGUI(){
		if(!PhotonNetwork.IsMasterClient)
			return;
		int tiempoActual = Int32.Parse(TimeText.text[16].ToString() + TimeText.text[17].ToString());
		if(tiempoActual == tiempoMaximo){
			GUIStyle style =new GUIStyle();
			style.fontSize = 22;
			style.normal.textColor = Color.white;
			//GUI.Label(new Rect (Screen.width * 0.35f,Screen.height * 0.2f,500,20),"Tiempo Terminado, será regresado al menú principal...",style);
			gameObject.GetComponent<PhotonView>().RPC("EndOfTime", RpcTarget.All);			
		}
	}	
	[PunRPC]
	public void EndOfTime(){
		NotificationManager.Instance.SetNewNotification("Tiempo terminado, serás enviado al log in.");
		StartCoroutine(DisconnectFromGame());
	}
	public IEnumerator DisconnectFromGame(){		
		yield return new WaitForSeconds(5);		
		PhotonNetwork.LoadLevel(0);
	}	
}