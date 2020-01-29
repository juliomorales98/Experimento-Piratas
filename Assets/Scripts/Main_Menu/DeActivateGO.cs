using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DeActivateGO : MonoBehaviour {

	public GameObject HostGUI;
	public GameObject ClientGUI;

	

	void Start(){
		
		//Desactivamos ambas GUI
		HostGUI.SetActive(false);
		ClientGUI.SetActive(false);
	}
	public void ActivateHostGUI(){

		HostGUI.SetActive(true);
		ClientGUI.SetActive(false);
	}

	public void ActivateClientGUI(){

		HostGUI.SetActive(false);
		ClientGUI.SetActive(true);
	}
}
