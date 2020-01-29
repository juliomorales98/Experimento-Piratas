using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class SelectCharacter : MonoBehaviour {

	public Text playerSelected;
	public Text info;

	List<GameObject> CharacterGlows = new List<GameObject>();
	void Start () {
		foreach( GameObject o in CharacterGlows){
			o.GetComponent<Renderer>().enabled = false;
		}

		playerSelected.text = "";
		info.text = "";
	}
	
	// Update is called once per frame
	void Update () {
		
	}

	public void StartExperiment(){
		if(playerSelected.text == ""){
			Debug.Log("No se ha seleccionado ningún pirata");
			return;
		}

		SceneManager.LoadScene(2);
	}

	void OnGUI(){
		if(playerSelected.text != ""){
			if(playerSelected.text == "Pirata 1"){
				info.text = "Problemas de visión";
			}else if(playerSelected.text == "Pirata 2"){
				info.text = "Problemas con su manita";

			}else if(playerSelected.text == "Pirata 3"){
				info.text = "Problemas de sobrepeso";

			}else if(playerSelected.text == "Pirata 4"){
				info.text = "Problemas con el habla";

			}
		}
	}

	
}
