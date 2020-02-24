/*
Entornos virtuales
Creador: Julio Morales: juliocesar.mr@protonmail.com
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
	
	// Update is called once per frame
	void Update () {
		
	}
}
