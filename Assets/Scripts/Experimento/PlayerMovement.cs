﻿using Photon.Pun;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour {

	private PhotonView PV;
	private CharacterController myCC;
	public float movementSpeedMio;
	public float rotationSpeedMio;

	private Camera miCamara;
	// Use this for initialization
	void Start () {
		PV = GetComponent<PhotonView>();
		myCC = GetComponent<CharacterController>();
		miCamara = transform.GetChild(1).GetComponent<Camera>();
	}
	
	// Update is called once per frame
	void Update () {
		if(PV.IsMine){
			miCamara.enabled = false;
			miCamara.enabled = true;
			BasicMovement();
			BasicRotation();
		}
	}

	void BasicMovement(){
		if(Input.GetKey(KeyCode.W)){
			myCC.Move(transform.forward * Time.deltaTime * movementSpeedMio);
		}

		if(Input.GetKey(KeyCode.A)){
			myCC.Move(-transform.right * Time.deltaTime * movementSpeedMio);
		}

		if(Input.GetKey(KeyCode.S)){
			myCC.Move(-transform.forward * Time.deltaTime * movementSpeedMio);
		}

		if(Input.GetKey(KeyCode.D)){
			myCC.Move(transform.right * Time.deltaTime * movementSpeedMio);
		}
	}

	void BasicRotation(){
		float mouseX = Input.GetAxis("Mouse X") * Time.deltaTime * rotationSpeedMio;
		transform.Rotate(new Vector3(0, mouseX, 0));
	}
}
