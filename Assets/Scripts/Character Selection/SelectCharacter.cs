/*
Entornos virtuales
Creador: Julio Morales: juliocesar.mr@protonmail.com

Manejamos las validaciones de la escena, así como poner el glow naranja localmente y cambiar las propiedades de los avatares cuando se seleccionan
*/


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

	[SerializeField]private GameObject[] avatarsGlow;

	private GameObject currentSelected;
	
	void Start () {

		//Creamos instancia de script
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

		//Quitamos el glow de todos los avatares
		InicializarGlow();

		currentSelected = null;
	}
	
	void Update(){
		if(Input.GetMouseButtonUp(0)){
			Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			RaycastHit hit;
			
			if(Physics.Raycast(ray, out hit, 100.0f)){
				if(!hit.transform)
					return;

				GameObject hitGo = hit.collider.gameObject;

				/*
				Para la parte del selector se realizan los siguientes pasos:
				1. Se valida si se ha dado click en un avatar de pirata.
				2. Se le pide el ownership al objeto para poder cambiar los valores a través de la red.
				3. Se valida si ya se ha seleccionado un pirata y si ese seleccionado es el mismo al que se le dió click.Si esto se cumple no realiza nada más.
				4. Si el punto tres no se cumple, valida que el pirata no haya sido seleccionado. Si es así, primero quita el actual seleccionado (en caso de tener uno) y le asigna
				el nuevo.Ilumina la plataforma también.				
				*/

				if(hit.collider.name == "_Character1"){
					hitGo.GetComponent<PhotonView>().RequestOwnership();
					if(HaveSelected() && hitGo.GetComponent<IsSelected>().GetOwner() == PhotonNetwork.NickName){
						Debug.Log("Ya es mío");
					}else if(hitGo.GetComponent<IsSelected>().SetOwnership(PhotonNetwork.NickName)){
						playerSelected.text = "Pirata 1";
						characterSelected = 1;
						if(currentSelected != null)
							currentSelected.GetComponent<IsSelected>().RemoveOwnership();
						currentSelected = hitGo;
						IluminatePlatform(0);
						
					}

				}else if(hit.collider.name == "_Character2"){
					hitGo.GetComponent<PhotonView>().RequestOwnership();
					if(HaveSelected() && hitGo.GetComponent<IsSelected>().GetOwner() == PhotonNetwork.NickName){
						Debug.Log("Ya es mío");
					}else if(hitGo.GetComponent<IsSelected>().SetOwnership(PhotonNetwork.NickName)){
						playerSelected.text = "Pirata 2";
						characterSelected = 2;
						if(currentSelected != null)
							currentSelected.GetComponent<IsSelected>().RemoveOwnership();
						currentSelected = hitGo;
						IluminatePlatform(1);
						
					}

				}else if(hit.collider.name == "_Character3"){
					hitGo.GetComponent<PhotonView>().RequestOwnership();
					if(HaveSelected() && hitGo.GetComponent<IsSelected>().GetOwner() == PhotonNetwork.NickName){
						Debug.Log("Ya es mío");
					}else if(hitGo.GetComponent<IsSelected>().SetOwnership(PhotonNetwork.NickName)){
						playerSelected.text = "Pirata 3";
						characterSelected = 3;
						if(currentSelected != null)
							currentSelected.GetComponent<IsSelected>().RemoveOwnership();
						currentSelected = hitGo;
						IluminatePlatform(2);
						
					}

				}else if(hit.collider.name == "_Character4"){
					hitGo.GetComponent<PhotonView>().RequestOwnership();
					if(HaveSelected() && hitGo.GetComponent<IsSelected>().GetOwner() == PhotonNetwork.NickName){
						Debug.Log("Ya es mío");
					}else if(hitGo.GetComponent<IsSelected>().SetOwnership(PhotonNetwork.NickName)){
						playerSelected.text = "Pirata 4";
						characterSelected = 4;
						if(currentSelected != null)
							currentSelected.GetComponent<IsSelected>().RemoveOwnership();
						currentSelected = hitGo;
						IluminatePlatform(3);
						
					}
				}
					
			}
		}

		
	}

	private bool HaveSelected(){
		if(currentSelected == null){
			return false;
		}

		return true;
	}

	private void IluminatePlatform(int op){
		//Quitamos el glow naranja de todos los piratas y activamos el del indíce de argumento
		InicializarGlow();
		avatarsGlow[op].GetComponent<Renderer>().enabled = true;
		
	}

	private void InicializarGlow(){
		foreach(GameObject go in avatarsGlow){
			go.GetComponent<Renderer>().enabled = false;
		}
	}
	
	public void StartExperiment(){
		if(playerSelected.text == ""){	//Si el host no ha seleccionado algún pirata
			NotificationManager.Instance.SetNewNotification("No has seleccionado ningún pirata");
			return;
		}

		//---------------------------------Validación de si todos los jugadores han seleccionado un pirata.-------------\\
		GameObject[] characters = GameObject.FindGameObjectsWithTag("CharacterToSelect");
		int playersSelected = 0;
		foreach(GameObject go in characters){
			if(go.transform.GetComponent<IsSelected>().GetIsSelected()){
				playersSelected += 1;
			}
				
		}

		if(PhotonNetwork.PlayerList.Length > playersSelected){
			NotificationManager.Instance.SetNewNotification("No todos los jugadores han seleccionado a un pirata.");
			Debug.Log(PhotonNetwork.PlayerList.Length + " < " + playersSelected);
			return;
		}
		//------------------------------------------------------------------------------------------------------------------\\


		PhotonNetwork.LoadLevel(2);
	}

	void OnGUI(){
		//Dependiendo del pirata seleccionado, la descripción que aparece en pantalla de este cambiará.
		if(characterSelected != 0){
			if(characterSelected == 1){
				info.text = "Las piezas del barco aparecen todas del mismo color. Esto no le permite saber cómo intercalarlas.";
				
			}else if(characterSelected == 2){
				info.text = "No se le permite cargar objetos pesados (Proa, cubierta desde proa, popa y cubierta desde popa).";
				
			}else if(characterSelected == 3){
				info.text = "Al navegar su avatar avanza más lentamente que el de los demás (le toma el doble de tiempo trasladarse).";
				
			}else if(characterSelected == 4){
				info.text = "Su micrófono está desconectado, de tal forma que los otros jugadores no escuchan su voz.";
				
			}
		}
	}

	
}
