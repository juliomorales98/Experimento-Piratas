using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ShowPosition : MonoBehaviour {

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}

	void OnGUI(){

		//Estilo del texto a mostrar con las posiciones actuales del pirata
		GUIStyle style = new GUIStyle();
		style.fontSize = 20;
		style.normal.textColor = Color.white;
		
		Rect rectangulo = new Rect(10,80,500,100);
		string cadena = "X = " + (int)transform.position.x + "\nY = " + (int)transform.position.y + "\nZ = " + (int)transform.position.z;
		
		GUI.Label(rectangulo,cadena,style);

	}
}
