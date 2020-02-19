using System.Collections;
using System.Collections.Generic;
using UnityEngine;



public class MovePiece : MonoBehaviour {

	private Vector3 position1;
	private Quaternion rotation1;
	private bool move;

	// Use this for initialization
	void Start () {
		gameObject.GetComponent<Rigidbody>().isKinematic = false;
		gameObject.GetComponent<Rigidbody>().useGravity = true;

		/*yield WaitForSeconds(2);
		gameObject.GetComponent<Rigidbody>().isKinematic = true;*/

	}
	
	// Update is called once per frame
	void Update () {
		position1 = gameObject.transform.position;
		rotation1 = gameObject.transform.rotation;
	}

	void OnMouseDown()
{
		//rigidbody.useGravity = false;
		//GetComponent.<NetworkView>().RPC("SendMovement", RPCMode.Others, position1, rotation1, false, true);
		SendMovement(position1, rotation1, false, true);
		//	Debug.Log("Se oprimio Mouse");
	}

	void OnMouseUp(){
		gameObject.GetComponent<Rigidbody>().useGravity = true;
		//GetComponent.<NetworkView>().RPC("SendMovement", RPCMode.Others, position1, rotation1, true, false);
		SendMovement(position1, rotation1, true, false);
		StartCoroutine(WaitForSendMovement());

	}

	private IEnumerator WaitForSendMovement(){
		yield return new WaitForSeconds(2);
		SendMovement(position1, rotation1, true, false);
		//	Debug.Log("Se dejo de Oprimir Mouse");
		gameObject.GetComponent<Rigidbody>().isKinematic = false;
	}

	void OnMouseDrag(){
		SendMovement(position1, rotation1, false, true);
	}

	private void SendMovement(Vector3 position1, Quaternion rotation1, bool usaGravedad, bool esKin){
		gameObject.transform.position = position1;
		gameObject.transform.rotation = rotation1;
		gameObject.GetComponent<Rigidbody>().useGravity = usaGravedad;
		gameObject.GetComponent<Rigidbody>().isKinematic = esKin;
	}
}
