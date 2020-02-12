var position1 : Vector3;
var rotation1 : Quaternion;
var move : boolean;
//var usaGravedad : boolean = true;
function Start()
{
	GetComponent.<Rigidbody>().isKinematic = false;
	GetComponent.<Rigidbody>().useGravity = true;
	
	yield WaitForSeconds(2);
	GetComponent.<Rigidbody>().isKinematic = true;
	
}

function Update ()
{
	
	position1 = gameObject.transform.position;
	rotation1 = gameObject.transform.rotation;
	//networkView.RPC("SendMovement", RPCMode.Others, position1, rotation1, usaGravedad, esKin);
	
}

function OnMouseDown()
{
	//rigidbody.useGravity = false;
	//GetComponent.<NetworkView>().RPC("SendMovement", RPCMode.Others, position1, rotation1, false, true);
	SendMovement(position1, rotation1, false, true);
	//	Debug.Log("Se oprimio Mouse");
}

function OnMouseUp()
{
	GetComponent.<Rigidbody>().useGravity = true;
	//GetComponent.<NetworkView>().RPC("SendMovement", RPCMode.Others, position1, rotation1, true, false);
	SendMovement(position1, rotation1, true, false);
	yield WaitForSeconds(2);
//	networkView.RPC("sendFisica", RPCMode.Others , cubo,1);
	
	SendMovement(position1, rotation1, true, false);
	//	Debug.Log("Se dejo de Oprimir Mouse");
    GetComponent.<Rigidbody>().isKinematic = false;
	
}

function OnMouseDrag () 
{
    //GetComponent.<NetworkView>().RPC("SendMovement", RPCMode.Others, position1, rotation1, false, true);
	SendMovement(position1, rotation1, false, true);
}



/*@RPC
function SendMovement(position1 : Vector3, rotation1 : Quaternion, usaGravedad : boolean, esKin : boolean)
{
    gameObject.transform.position = position1;
    gameObject.transform.rotation = rotation1;
    gameObject.GetComponent.<Rigidbody>().useGravity = usaGravedad;
    gameObject.GetComponent.<Rigidbody>().isKinematic = esKin;
}*/
function SendMovement(position1 : Vector3, rotation1 : Quaternion, usaGravedad : boolean, esKin : boolean)
{
    gameObject.transform.position = position1;
    gameObject.transform.rotation = rotation1;
    gameObject.GetComponent.<Rigidbody>().useGravity = usaGravedad;
    gameObject.GetComponent.<Rigidbody>().isKinematic = esKin;
}