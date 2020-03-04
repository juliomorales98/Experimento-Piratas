using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ResetPosition : MonoBehaviour {

	private Vector3 initialPosition;
	// Use this for initialization
	void Start () {
		initialPosition = transform.position;
	}
	
	// Update is called once per frame
	void Update () {
		if(transform.position.y < -2f){
			transform.position = initialPosition;
			
		}
	}
}
