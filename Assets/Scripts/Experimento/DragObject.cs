using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DragObject : MonoBehaviour {

	private Vector3 mOffset;

    private float mZCoord;

	private Vector3 originalRotation;

    private bool pieceSet;

    void Start(){
        pieceSet = false;
    }
    
    public void MovePiece(){
        originalRotation = new Vector3(transform.rotation.eulerAngles.x,transform.rotation.eulerAngles.y,transform.rotation.eulerAngles.z);

        mZCoord = Camera.main.WorldToScreenPoint(gameObject.transform.position).z;
        
        mOffset = gameObject.transform.position - GetMouseAsWorldPoint();

		//Quitamos las rotaciones para que no se aloque
		transform.eulerAngles = originalRotation;

        
    }

    public void RotatePiece(int op){
        
    }

    public void SetKinematic(bool var){
        gameObject.GetComponent<Rigidbody>().isKinematic = var;
        pieceSet = var;
    }

    private Vector3 GetMouseAsWorldPoint(){

        
        Vector3 mousePoint = Input.mousePosition;

        
        mousePoint.z = mZCoord;

        // Convertimos coordenadas a posiciones en el world.
        return Camera.main.ScreenToWorldPoint(mousePoint);
    }



    void OnMouseDrag(){
        transform.position = GetMouseAsWorldPoint() + mOffset;
		transform.eulerAngles = originalRotation;
    }
}
