using UnityEngine;
using System.Collections;

public class TestRenderer : MonoBehaviour {


	// Update is called once per frame
	void Update () {
	
		if (GetComponent<Renderer>().IsVisibleFrom(Camera.main)) Debug.Log("Visible");
	//	else Debug.Log("Not visible");
	}
}
