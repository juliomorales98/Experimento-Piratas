/*
Entornos virtuales
Creador: Julio Morales: juliocesar.mr@protonmail.com

Inicializa las ventanas en su orden correcto al iniciar la aplicación, facilitando la edición en unity.
*/


using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MenuSetup : MonoBehaviour {

	[SerializeField]private GameObject loginPanel;
	[SerializeField]private GameObject lobbyPanel;
	[SerializeField]private GameObject roomPanel;

	// Use this for initialization
	void Start () {
		loginPanel.SetActive(true);
		lobbyPanel.SetActive(false);
		roomPanel.SetActive(false);
		
	}
	
	public void OnClickQuit(){
		Application.Quit();
	}
}
