using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;
public class ShowPosition : MonoBehaviour {

	// Use this for initialization
	private Text[] positionsText;
	void Start () {
		positionsText = new Text[3];
		foreach(GameObject g in GameObject.FindGameObjectsWithTag("Player_Info")){
			if(g.name == "PlayerPosition"){
				positionsText[0] = g.transform.GetChild(0).GetComponent<Text>();
				positionsText[1] = g.transform.GetChild(1).GetComponent<Text>();
				positionsText[2] = g.transform.GetChild(2).GetComponent<Text>();
			}
		}
	}
	
	// Update is called once per frame
	void Update () {

		if(transform.GetComponent<PhotonView>().IsMine){
			positionsText[0].text = transform.position.x.ToString();
			positionsText[1].text = transform.position.y.ToString();
			positionsText[2].text = transform.position.z.ToString();
		}
		
	}

	void OnGUI(){
		/*
		//Estilo del texto a mostrar con las posiciones actuales del pirata
		GUIStyle style = new GUIStyle();
		style.fontSize = 20;
		style.normal.textColor = Color.white;
		
		Rect rectangulo = new Rect(10,80,500,100);
		string cadena = "X = " + (int)transform.position.x + "\nY = " + (int)transform.position.y + "\nZ = " + (int)transform.position.z;
		
		GUI.Label(rectangulo,cadena,style);
		*/
	}
}
