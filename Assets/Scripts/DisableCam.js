#pragma strict

function Awake() {
	if(!GetComponent.<NetworkView>().isMine) {
		//GetComponent("MouseLook").active = false;
		GetComponent(Camera).enabled = false;
		//transform.parent.GetComponent("Control Basico").active = false;
		//this.gameObject.SetActive(false);
//		this.gameObject.active = false;
	}
		//We aren't the network owner, disable all these components!
}

function Start() {
	/*if(Application.loadedLevelName == "characterSelector") { 
		GetComponent(Camera).enabled = false;
		GetComponent(AudioListener).enabled = false;
		transform.parent.GetComponent("Control Basico").active = false;
	}
	else */
	if (Application.loadedLevelName == "Experimento") {
	
		name = transform.parent.name;
		GetComponent(Camera).enabled = true;
		//GetComponent(AudioListener).enabled = true;
	//	transform.parent.GetComponent("Control Basico").active = true;
	//	this.gameObject.SetActive(false);
	}
	else
		Debug.Log("ERROR: DisableCam doesnt know the level name!");
}