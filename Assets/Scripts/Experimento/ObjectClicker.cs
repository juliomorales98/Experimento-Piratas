using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObjectClicker : MonoBehaviour {

	public float force = 10;
	private Vector3 mOffset;

    private float mZCoord;

	private Vector3 originalRotation;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {

		if(Input.GetMouseButtonDown(0)){
			RaycastHit hit;

			Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);

			if(Physics.Raycast(ray,out hit, 100.0f)){
				if(hit.transform){
										
					if(hit.transform.GetComponent<Rigidbody>()){
						
						MoveObject(hit);
					}
				}
			}
		}
		
	}

	private void MoveObject(RaycastHit hit){
		
		hit.transform.GetComponent<DragObject>().MovePiece();
		
	}
	private void PrintName(GameObject go){
		Debug.Log(go.name);
	}
}
