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

