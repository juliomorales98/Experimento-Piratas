using Photon.Pun;
using Photon.Realtime;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class SelectCharacter : MonoBehaviourPunCallbacks {

	public static SelectCharacter SC;
	public Text playerSelected;
	public Text info;

	public int characterSelected;

	[SerializeField]private GameObject startButton;
	
	void Start () {
		if(SelectCharacter.SC == null){
			SC = this;
		}else if(SelectCharacter.SC != this){
			Destroy(SelectCharacter.SC);
			SelectCharacter.SC = this;
		}

		characterSelected = -1;

		playerSelected.text = "";
		info.text = "Selecciona un pirata.";

		if(PhotonNetwork.IsMasterClient){
			startButton.SetActive(true);

		}else{
			startButton.SetActive(false);
		}
	}
	
	
	public void StartExperiment(){
		if(playerSelected.text == ""){
			Debug.Log("No se ha seleccionado ningún pirata");
			return;
		}

		
		PhotonNetwork.LoadLevel(2);
	}

	void OnGUI(){
		if(playerSelected.text != ""){
			if(playerSelected.text == "Pirata 1"){
				info.text = "Las piezas del barco aparecen todas del mismo color. Esto no le permite saber cómo intercalarlas.";
				characterSelected = 1;
			}else if(playerSelected.text == "Pirata 2"){
				info.text = "No se le permite cargar objetos pesados (Proa, cubierta desde proa, popa y cubierta desde popa).";
				characterSelected = 2;
			}else if(playerSelected.text == "Pirata 3"){
				info.text = "Al navegar su avatar avanza más lentamente que el de los demás (le toma el doble de tiempo trasladarse).";
				characterSelected = 3;
			}else if(playerSelected.text == "Pirata 4"){
				info.text = "Su micrófono está desconectado, de tal forma que los otros jugadores no escuchan su voz.";
				characterSelected = 4;
			}
		}
	}

	
}
