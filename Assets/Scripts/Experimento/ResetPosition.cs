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
		if(transform.position.y > 45 || transform.position.y < -2f || transform.position.z > 260f || transform.position.z < -200f || transform.position.x > 270f || transform.position.x < -200f){
			transform.position = initialPosition;
			
		}
	}
}
