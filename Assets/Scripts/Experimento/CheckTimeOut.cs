using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using System;

///<summary>
///Está revisando si ya han pasado 10 minutos y, si es así
///Manda un mensaje a la pantalla del jugador y después de 
///5 segundos regresa al menú principal.
///<summary>
public class CheckTimeOut : MonoBehaviour {

	public Text TimeText;

	public IOConfig ioscript;

	private int tiempoMaximo;

	void Start(){

		ioscript.ReadConf();
		tiempoMaximo = Int32.Parse(ioscript.parametres[2]);
		Debug.Log("Tiempo Máximo del juego: " + tiempoMaximo.ToString());
	}
	
	void OnGUI(){
		int tiempoActual = Int32.Parse(TimeText.text[16].ToString() + TimeText.text[17].ToString());

		if(tiempoActual == tiempoMaximo){

			GUIStyle style =new GUIStyle();
			style.fontSize = 22;
			style.normal.textColor = Color.white;
			GUI.Label(new Rect (Screen.width * 0.35f,Screen.height * 0.2f,500,20),"Tiempo Terminado, será regresado al menú principal...",style);
			StartCoroutine(DisconnectFromGame());
			
		}
	}
	
	public IEnumerator DisconnectFromGame(){
		
		yield return new WaitForSeconds(5);
		Network.Disconnect();
		//Application.LoadLevel(0);
		SceneManager.LoadScene(0);

	}

	
}
