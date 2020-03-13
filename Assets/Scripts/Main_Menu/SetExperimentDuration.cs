/*
Entornos virtuales
Creador: Julio Morales: juliocesar.mr@protonmail.com

Instancia para determinar la duración del juego en escenas posteriores.
Guardamos el tiempo en una variable y en el experimento la comparamos con el tiempo actual.
*/


using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;

public class SetExperimentDuration : MonoBehaviour {

	public static SetExperimentDuration SED;
	[SerializeField] private InputField timeText;

	private int length;
	void Start () {

		//Creamos instancia del script
		if(SetExperimentDuration.SED == null){
			SetExperimentDuration.SED = this;
		}else if( SetExperimentDuration.SED != this){
			Destroy(SetExperimentDuration.SED);
			SetExperimentDuration.SED = this;
		}
	}
	
	
	public void SetLength () {
		if(timeText.text == ""){
			length = 10;
		}else{
			length = Int32.Parse(timeText.text);
		}

		Debug.Log("Tiempo del experimento es: " + length + " minutos.");
	}

	public int getLength(){
		return length;
	}
}
