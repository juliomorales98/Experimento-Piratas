using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ResetPosition : MonoBehaviour {

	private Vector3 initialPosition;

	private bool reseted;
	// Use this for initialization
	void Start () {
		initialPosition = transform.position;
		reseted = false;
	}
	
	// Update is called once per frame
	void Update () {
		
		if(reseted){
			transform.GetComponent<Rigidbody>().isKinematic = true;
			transform.GetComponent<Rigidbody>().useGravity = false;
			transform.GetComponent<Rigidbody>().freezeRotation = true;

			return;
		}
		if(transform.GetComponent<Rigidbody>() != null){
			if(transform.position.y > 45 || transform.position.y < -2f || transform.position.z > 260f || transform.position.z < -200f || transform.position.x > 270f || transform.position.x < -200f){
				transform.position = initialPosition;
				
				reseted = true;
				StartCoroutine(RemoveSpeedForce());
				
			}
		}else{
			if(transform.position.y < -2f){
				transform.position = initialPosition;
			}
		}
		
	}

	public IEnumerator RemoveSpeedForce(){
		
		yield return new WaitForSeconds(2);
		transform.GetComponent<Rigidbody>().isKinematic = false;
		transform.GetComponent<Rigidbody>().useGravity = true;
		transform.GetComponent<Rigidbody>().freezeRotation = false;
		reseted = false;
		Debug.Log("Hizo yield");
	}
}
