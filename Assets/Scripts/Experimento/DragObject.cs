using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DragObject : MonoBehaviour {

	private Vector3 mOffset;

    private float mZCoord;

	private Vector3 myRotation;
    
    public void MovePiece(){
       
        mZCoord = Camera.main.WorldToScreenPoint(gameObject.transform.position).z;
        
        mOffset = gameObject.transform.position - GetMouseAsWorldPoint();        
    }

    public void RotatePiece(int op){
        
        if(op == 1){
            gameObject.GetComponent<Rigidbody>().transform.rotation *= Quaternion.AngleAxis(4, new Vector3(1, 0, 0));
        }else if (op == 2){
            gameObject.GetComponent<Rigidbody>().transform.rotation *= Quaternion.AngleAxis(4, new Vector3(0, 1, 0));
        }
        
        
    }

    public void SetKinematic(bool var){
        gameObject.GetComponent<Rigidbody>().isKinematic = var;
        gameObject.GetComponent<Rigidbody>().useGravity = !var;
        
        
    }

    private Vector3 GetMouseAsWorldPoint(){

        
        Vector3 mousePoint = Input.mousePosition;

        
        mousePoint.z = mZCoord;

        // Convertimos coordenadas a posiciones en el world.
        return Camera.main.ScreenToWorldPoint(mousePoint);
    }

    void OnMouseDrag(){
        transform.position = GetMouseAsWorldPoint() + mOffset;
    }
}
