using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
public class ObjectClicker : MonoBehaviour {

	
	private Vector3 mOffset;
    private float mZCoord;
	private Vector3 originalRotation;	

	private bool rotating;	
	private Vector3 toAddRotation;
	
	private PhotonView myPV;

	private Camera myCamera;

	private RaycastHit hit;
	private Ray ray;
	void Start(){
		rotating = false;
		toAddRotation = new Vector3(0,0,0);
		myPV = gameObject.GetComponent<PhotonView>();
		myCamera = transform.GetChild(0).GetComponent<Camera>();
		
	}
	void Update () {

		if(!myPV.IsMine)
			return;

		//RaycastHit hit;
		ray = myCamera.ScreenPointToRay(Input.mousePosition);

		
		if(Physics.Raycast(ray,out hit, 100.0f)){			

			if(hit.transform){	

				//Para hacer el drag					
				if(Input.GetMouseButtonDown(0)){

					hit.transform.GetComponent<DragObject>().MovePiece(myCamera);
					//hit.transform.GetComponent<DragObject>().DragPiece();	
				}

				//Para hacer que no se mueva ya
				if(Input.GetMouseButton(1)){
					hit.transform.GetComponent<DragObject>().SetKinematic(true);
					
					Input.GetMouseButtonDown(0).Equals(false);
				}

				if(Input.GetKey(KeyCode.Q)){
					
					hit.transform.GetComponent<DragObject>().RotatePiece(1);
					//hit.transform.GetComponent<DragObject>().SetKinematic(false);

				}
				
				if(Input.GetKey(KeyCode.E)){
					hit.transform.GetComponent<DragObject>().RotatePiece(2);
					//hit.transform.GetComponent<DragObject>().SetKinematic(false);
				}

				if(Input.GetKey(KeyCode.R)){
					hit.transform.GetComponent<DragObject>().RotatePiece(3);
					//hit.transform.GetComponent<DragObject>().SetKinematic(false);
				}
			}			
		}		
		
	}

	/*void OnMouseDrag(){
		if(!myPV.IsMine)
			return;

		RaycastHit hit2;
		Ray ray2 = myCamera.ScreenPointToRay(Input.mousePosition);

		if(Physics.Raycast(ray2,out hit2, 100.0f)){	
			if(hit2.transform){
				Debug.Log("Entró al drag");
				hit.transform.GetComponent<DragObject>().DragPiece();
			}
		}
	}*/

	
}
