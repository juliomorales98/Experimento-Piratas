/*
Entornos virtuales
Creador: Julio Morales: juliocesar.mr@protonmail.com
*/

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
	private PhotonView hitPV;

	private Camera myCamera;

	private RaycastHit hit;
	private Ray ray;

	private LineRenderer line;

	[SerializeField]private GameObject hand;

	[SerializeField]private Material laserMaterial;

	[PunRPC]
	private void RPC_DrawLine(bool draw, Vector3 handPosition, Vector3 hitPosition){
		if(draw){
			line.enabled = true;
			line.SetPosition(0,handPosition);
			line.SetPosition(1,hitPosition);
		}else{
			line.enabled = false;
		}
	}
	void Start(){
		rotating = false;
		toAddRotation = new Vector3(0,0,0);
		myPV = gameObject.GetComponent<PhotonView>();
		myCamera = transform.GetChild(0).GetComponent<Camera>();
		line = transform.GetComponent<LineRenderer>();
		line.enabled = false;
		line.material = laserMaterial;
		line.SetWidth(0.05f, 0.1f);

	}
	void Update () {

		if(!myPV.IsMine)
			return;

		//RaycastHit hit;
		ray = myCamera.ScreenPointToRay(Input.mousePosition);

		
		if(Physics.Raycast(ray,out hit, 100.0f)){			

			if(hit.transform && hit.rigidbody){	
				hitPV = hit.transform.GetComponent<PhotonView>();
								
				//Hacemos el drag.
				if(Input.GetMouseButtonDown(0)){
					hitPV.RequestOwnership();
					hit.transform.GetComponent<DragObject>().MovePiece(myCamera);
					
					//line.enabled = false;;
				}

				//------------------------------------------Línea--------------------------//
				//Para trazar la línea.
				if(Input.GetMouseButton(0)){
					if(hit.transform.GetComponent<DragObject>().ValidarMovimiento()){
						myPV.RPC("RPC_DrawLine", RpcTarget.All, true, hand.transform.position, hit.transform.position);
					}				
				}				
				//Para dejar de dibujar la línea.
				if(Input.GetMouseButtonUp(0)){
					myPV.RPC("RPC_DrawLine", RpcTarget.All, false, hand.transform.position, hit.transform.position);
				}
				//-----------------------------------------------------------------------//


				//Para hacer kinematic la pieza y que ya no se mueva.
				if(Input.GetMouseButtonDown(1)){
					hitPV.RequestOwnership();
					hit.transform.GetComponent<DragObject>().SetKinematic(true);
					
					Input.GetMouseButtonDown(0).Equals(false);
				}
				

				//---------------------------------------------Rotaciones---------------------------------------------//
				if(Input.GetKey(KeyCode.Q)){
					hitPV.RequestOwnership();
					hit.transform.GetComponent<DragObject>().RotatePiece(1);
				}
				
				if(Input.GetKey(KeyCode.E)){
					hitPV.RequestOwnership();
					hit.transform.GetComponent<DragObject>().RotatePiece(2);				
				}

				if(Input.GetKey(KeyCode.R)){
					hitPV.RequestOwnership();
					hit.transform.GetComponent<DragObject>().RotatePiece(3);					
				}
				//-------------------------------------------------------------------------------------------------------//
			}			
		}	

			
		
	}	

	
}
