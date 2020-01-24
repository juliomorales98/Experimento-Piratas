/*
Script para cambiar los colores de las piezas del barco, dependiendo de si es
el pirata 1 o no.
Solamente necesitamos lanzarlo cuando se inicia el experimento.
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class setGrayMaterials : MonoBehaviour {

	public Text pirateName;//Nombre del pirata en pantalla asignado en GameSetup.js
	public GameObject[] figuras;//Todas las partes del barco como gameObjects
	Renderer render;
	public Material[] materials;//Los materiales que se usarán (gris, rojo y verde en ese orden)
	
	void Start () {

		if(pirateName.text == "Pirata 1"){
			/*
			Si es el pirata 1, para cada figura le asignamos el color gris.
			*/
			foreach(GameObject g in figuras){
				render = g.GetComponent<Renderer>();
				render.enabled = true;

				render.sharedMaterial = materials[0];
			}
		}else{

			/*
			Si no es el pirata 1, asignamos el color rojo a las figuras 0-8 en el arreglo
			y verde a las figuras 9-14.
			*/
			for(int i = 0; i < 3; i++){
				render = figuras[i].GetComponent<Renderer>();
				render.enabled = true;

				render.sharedMaterial = materials[1];//asignamos rojo
			}

			for(int i = 3; i < 7; i++){
				render = figuras[i].GetComponent<Renderer>();
				render.enabled = true;

				render.sharedMaterial = materials[2];//asignamos verde
			}
		}
		
	}
	
	
}
