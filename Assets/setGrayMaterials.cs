/*
Script para cambiar los colores de las piezas del barco, dependiendo de si es
el pirata 1 o no.
Solamente necesitamos lanzarlo cuando se inicia el experimento.
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;

public class setGrayMaterials : MonoBehaviour {

	
	private Renderer render;
	[SerializeField]private Material grayMaterial;
	
	void Start () {

		if(transform.GetComponent<PhotonView>().IsMine){
			foreach( GameObject go in GameObject.FindGameObjectsWithTag("Barco_Pieza") ){			
			
				render = go.GetComponent<Renderer>();
				render.enabled = true;

				render.sharedMaterial = grayMaterial;
			
			}
		}
		
		
	}
	
	
}
