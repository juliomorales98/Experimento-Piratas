#pragma strict

var seenByCameraList: cameraSight[];
var tempCameraList : Camera[];

/*
If the object has a renderer attached, then this should work:
Create a new class cameraSight and array of this class named seenByCameraList
*/

class cameraSight {
	var cam : Camera;
	var sawMe : boolean = false;
	var sawMeName : String = "";
	var seesMe : boolean = false;
	var seesMeName : String = "";
};
    

function Update() {
	
	tempCameraList = Camera.allCameras;
	seenByCameraList = new cameraSight[tempCameraList.Length];
    for (var i : int = 0; i < seenByCameraList.Length; i++) {
	    seenByCameraList[i] = new cameraSight();
	    seenByCameraList[i].cam = tempCameraList[i];
	    seenByCameraList[i].sawMe = false;
	    seenByCameraList[i].sawMeName = "";
	    seenByCameraList[i].seesMe = false;
	    seenByCameraList[i].seesMeName = "";
    }
    
	for (var j : int = 0; j < seenByCameraList.Length; j++) {
	    seenByCameraList[j].sawMe = seenByCameraList[j].seesMe;
	    seenByCameraList[j].seesMe = false;
    }
}

//then initialize it in 
function Start() {
	
	tempCameraList = Camera.allCameras;
	seenByCameraList = new cameraSight[tempCameraList.Length];
    for (var i : int = 0; i < seenByCameraList.Length; i++) {
	    seenByCameraList[i] = new cameraSight();
	    seenByCameraList[i].cam = tempCameraList[i];
	    seenByCameraList[i].sawMe = false;
	    seenByCameraList[i].seesMe = false;
    }
}


//If Unity whave to render this object, it will call OnWillRenderObject() , where we modify the flags for cameras, to which this object is visible

function OnWillRenderObject () {
	for (var i : int = 0; i < seenByCameraList.Length; i++) {
    	if (seenByCameraList[i].cam == Camera.current) {
    		seenByCameraList[i].seesMe = true;
    		seenByCameraList[i].seesMeName = Camera.current.name;
    		
    		if (Network.isClient && (name != seenByCameraList[i].seesMeName)) { //checks to see if its themselfs
				GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("Viewer", RPCMode.Server, name, seenByCameraList[i].seesMeName);
			}
			/*
			else {
				var scriptObject : GameObject = GameObject.FindWithTag("General");
				var script : Logger = scriptObject.GetComponent(Logger); // THIS IS THE PROBLEM LINE! Reference is null
				script.Viewer(name, seenByCameraList[i].seesMeName);//changed from name to ToString
			}
			*/
		}
    }
}

//And the final function which you call for testing visibility to particular camera
/*
function isRendererVisibleByCamera(observerCamera : Camera) {
    for (var i : int = 0; i < seenByCameraList.Length; i++) {
   		if (seenByCameraList[i].camera == observerCamera) {
   			
   			if (Network.isClient) {
				GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("Viewer", RPCMode.Server, name, seenByCameraList[i].name);
			}
			else {
				var scriptObject : GameObject = GameObject.FindWithTag("General");
				var script : Logger = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
				script.Viewer(name, seenByCameraList[i].name);
			}
			
   			//return seenByCameraList[i].sawMe;
   		}
    }
}
*/
//To avoid clearing of flag, there is sawMe flag which copies a value of seesMe from previous frame. So information is one frame delayed.
/*
//stick this script up the player's bunghole
var morado1 : GameObject;
var morado2 : GameObject;
var morado3 : GameObject;
var morado4 : GameObject;

var rosa1 : GameObject;
var rosa2 : GameObject;
var rosa3 : GameObject;
var rosa4 : GameObject;
var rosa5 : GameObject;
var rosa6 : GameObject;

var verde1 : GameObject;
var verde2 : GameObject;
var verde3 : GameObject;
var verde4 : GameObject;

//add players as well and shit

function Start () {
	morado1 = GameObject.Find("morado1");
	morado2 = GameObject.Find("morado2");
	morado3 = GameObject.Find("morado3");
	morado4 = GameObject.Find("morado4");
	
	rosa1 =  GameObject.Find("rosa1");
	rosa2 =  GameObject.Find("rosa2");
	rosa3 =  GameObject.Find("rosa3");
	rosa4 =  GameObject.Find("rosa4");
	rosa5 =  GameObject.Find("rosa5");
	rosa6 =  GameObject.Find("rosa6");

	verde1 = GameObject.Find("verde1");
	verde2 = GameObject.Find("verde2");
	verde3 = GameObject.Find("verde3");
	verde4 = GameObject.Find("verde4");
}

function Update () {
	CanSee();
}

function CanSee() {
	var here = transform.position;
	var pos;
	var hit: RaycastHit;
	var scriptObject : GameObject;
	var script : Logger;
		 
	if (morado1.renderer.isVisible) { //make one for each box
		pos = morado1.transform.position;
		 
		if (Physics.Linecast(here, pos, hit) && hit.transform == morado1.transform) {
			
			if (Network.isClient) {
				GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("Viewer", RPCMode.Server, name, morado1.name);
			}
			else {
				scriptObject = GameObject.FindWithTag("General");
				script = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
				script.Viewer(name, morado1.name);
			}
		}
	}
	
	if (morado2.renderer.isVisible) { //make one for each box
		pos = morado2.transform.position;
		 
		if (Physics.Linecast(here, pos, hit) && hit.transform == morado2.transform) {
			
			if (Network.isClient) {
				GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("Viewer", RPCMode.Server, name, morado2.name);
			}
			else {
				scriptObject = GameObject.FindWithTag("General");
				script = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
				script.Viewer(name, morado2.name);
			}
		}
	}
	
	if (morado3.renderer.isVisible) { //make one for each box
		pos = morado3.transform.position;
		 
		if (Physics.Linecast(here, pos, hit) && hit.transform == morado3.transform) {
			
			if (Network.isClient) {
				GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("Viewer", RPCMode.Server, name, morado3.name);
			}
			else {
				scriptObject = GameObject.FindWithTag("General");
				script = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
				script.Viewer(name, morado3.name);
			}
		}
	}
	
	if (morado4.renderer.isVisible) { //make one for each box
		pos = morado4.transform.position;
		 
		if (Physics.Linecast(here, pos, hit) && hit.transform == morado4.transform) {
			
			if (Network.isClient) {
				GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("Viewer", RPCMode.Server, name, morado4.name);
			}
			else {
				scriptObject = GameObject.FindWithTag("General");
				script = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
				script.Viewer(name, morado4.name);
			}
		}
	}
	
	if (rosa1.renderer.isVisible) { //make one for each box
		pos = rosa1.transform.position;
		 
		if (Physics.Linecast(here, pos, hit) && hit.transform == rosa1.transform) {
			
			if (Network.isClient) {
				GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("Viewer", RPCMode.Server, name, rosa1.name);
			}
			else {
				scriptObject = GameObject.FindWithTag("General");
				script = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
				script.Viewer(name, rosa1.name);
			}
		}
	}
	
	if (rosa2.renderer.isVisible) { //make one for each box
		pos = rosa2.transform.position;
		 
		if (Physics.Linecast(here, pos, hit) && hit.transform == rosa2.transform) {
			
			if (Network.isClient) {
				GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("Viewer", RPCMode.Server, name, rosa2.name);
			}
			else {
				scriptObject = GameObject.FindWithTag("General");
				script = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
				script.Viewer(name, rosa2.name);
			}
		}
	}
	
	if (rosa3.renderer.isVisible) { //make one for each box
		pos = rosa3.transform.position;
		 
		if (Physics.Linecast(here, pos, hit) && hit.transform == rosa3.transform) {
			
			if (Network.isClient) {
				GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("Viewer", RPCMode.Server, name, rosa3.name);
			}
			else {
				scriptObject = GameObject.FindWithTag("General");
				script = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
				script.Viewer(name, rosa3.name);
			}
		}
	}
	
	if (rosa4.renderer.isVisible) { //make one for each box
		pos = rosa1.transform.position;
		 
		if (Physics.Linecast(here, pos, hit) && hit.transform == rosa4.transform) {
			
			if (Network.isClient) {
				GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("Viewer", RPCMode.Server, name, rosa4.name);
			}
			else {
				scriptObject = GameObject.FindWithTag("General");
				script = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
				script.Viewer(name, rosa4.name);
			}
		}
	}
	
	if (rosa5.renderer.isVisible) { //make one for each box
		pos = rosa5.transform.position;
		 
		if (Physics.Linecast(here, pos, hit) && hit.transform == rosa5.transform) {
			
			if (Network.isClient) {
				GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("Viewer", RPCMode.Server, name, rosa5.name);
			}
			else {
				scriptObject = GameObject.FindWithTag("General");
				script = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
				script.Viewer(name, rosa5.name);
			}
		}
	}
	
	if (rosa6.renderer.isVisible) { //make one for each box
		pos = rosa6.transform.position;
		 
		if (Physics.Linecast(here, pos, hit) && hit.transform == rosa6.transform) {
			
			if (Network.isClient) {
				GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("Viewer", RPCMode.Server, name, rosa6.name);
			}
			else {
				scriptObject = GameObject.FindWithTag("General");
				script = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
				script.Viewer(name, rosa6.name);
			}
		}
	}
	
	if (verde1.renderer.isVisible) { //make one for each box
		pos = verde1.transform.position;
		 
		if (Physics.Linecast(here, pos, hit) && hit.transform == verde1.transform) {
			
			if (Network.isClient) {
				GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("Viewer", RPCMode.Server, name, verde1.name);
			}
			else {
				scriptObject = GameObject.FindWithTag("General");
				script = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
				script.Viewer(name, verde1.name);
			}
		}
	}
	
	if (verde2.renderer.isVisible) { //make one for each box
		pos = verde2.transform.position;
		 
		if (Physics.Linecast(here, pos, hit) && hit.transform == verde2.transform) {
			
			if (Network.isClient) {
				GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("Viewer", RPCMode.Server, name, verde2.name);
			}
			else {
				scriptObject = GameObject.FindWithTag("General");
				script = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
				script.Viewer(name, verde2.name);
			}
		}
	}
	
	if (verde3.renderer.isVisible) { //make one for each box
		pos = verde3.transform.position;
		 
		if (Physics.Linecast(here, pos, hit) && hit.transform == verde3.transform) {
			
			if (Network.isClient) {
				GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("Viewer", RPCMode.Server, name, verde3.name);
			}
			else {
				scriptObject = GameObject.FindWithTag("General");
				script = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
				script.Viewer(name, verde3.name);
			}
		}
	}
	
	if (verde4.renderer.isVisible) { //make one for each box
		pos = verde4.transform.position;
		 
		if (Physics.Linecast(here, pos, hit) && hit.transform == verde4.transform) {
			
			if (Network.isClient) {
				GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("Viewer", RPCMode.Server, name, verde4.name);
			}
			else {
				scriptObject = GameObject.FindWithTag("General");
				script = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
				script.Viewer(name, verde4.name);
			}
		}
	}
}
*/