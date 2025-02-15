﻿/*
Entornos virtuales
Creador: Julio Morales: juliocesar.mr@protonmail.com
*/
using Photon.Pun;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class GameController : MonoBehaviour {
	[SerializeField]
	private GameObject menuPanel;
	private bool inMenu;
	void Start(){
		inMenu = false;
	}
	void Update(){		
		if (Input.GetKeyUp("1")) {
			if(!inMenu){							
				menuPanel.SetActive(true);
				Cursor.visible = true;
				Cursor.lockState = CursorLockMode.None;
				inMenu = true;				
			}else{
				menuPanel.SetActive(false);
				Cursor.visible = false;
				Cursor.lockState = CursorLockMode.Locked;
				inMenu = false;
			}			
		}
		if(!inMenu){			
			Cursor.visible = false;
			Cursor.lockState = CursorLockMode.Locked;
		}
	}
	public void QuitExperimento(){
		Debug.Log("Salimos del experimento por completo");
		Application.Quit();
	}
	public void VolverMenuPrincipal(){
		PhotonNetwork.LoadLevel(0);
	}
}