using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObjectClicker : MonoBehaviour {

	
	private Vector3 mOffset;
    private float mZCoord;
	private Vector3 originalRotation;		
	
	void Update () {
		RaycastHit hit;
		Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);

		
		if(Physics.Raycast(ray,out hit, 100.0f)){			

			if(hit.transform){	

				//Para hacer el drag					
				if(Input.GetMouseButtonDown(0)){

					 if (Input.GetKey(KeyCode.Z)) {Debug.Log("Presionó Z");}

					hit.transform.GetComponent<DragObject>().MovePiece();
					hit.transform.GetComponent<DragObject>().SetKinematic(false);		
				}

				//Para hacer que no se mueva ya
				if(Input.GetMouseButton(1)){
					hit.transform.GetComponent<DragObject>().SetKinematic(true);
					
					Input.GetMouseButtonDown(0).Equals(false);
				}				
			}			
		}		
		
	}
}
