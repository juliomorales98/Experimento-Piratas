using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DragObject : MonoBehaviour {

	private Vector3 mOffset;

    private float mZCoord;

	private Vector3 originalRotation;

	private bool gettingDraged;

	void Start(){
		gettingDraged = false;
	}

	void Update(){

	}
    void OnMouseDown(){

		gettingDraged = true;

		Debug.Log(transform.rotation.x);
		originalRotation = new Vector3(transform.rotation.eulerAngles.x,transform.rotation.eulerAngles.y,transform.rotation.eulerAngles.z);

        mZCoord = Camera.main.WorldToScreenPoint(gameObject.transform.position).z;
        // Store offset = gameobject world pos - mouse world pos
        mOffset = gameObject.transform.position - GetMouseAsWorldPoint();

		//Quitamos las rotaciones para que no se aloque
		transform.eulerAngles = originalRotation;
    }

	void OnMouseUp(){
		gettingDraged = false;
	}

    private Vector3 GetMouseAsWorldPoint(){

        // Pixel coordinates of mouse (x,y)
        Vector3 mousePoint = Input.mousePosition;

        // z coordinate of game object on screen
        mousePoint.z = mZCoord;

        // Convert it to world points
        return Camera.main.ScreenToWorldPoint(mousePoint);
    }



    void OnMouseDrag(){
        transform.position = GetMouseAsWorldPoint() + mOffset;
		transform.eulerAngles = originalRotation;
    }
}
