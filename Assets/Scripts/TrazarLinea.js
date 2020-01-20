#pragma strict

var mat : Material;

//var c1 : Color;// = Color.white;
//var c2 : Color;// = Color(1,1,1,0);
var line : LineRenderer; //= gameObject.AddComponent(LineRenderer);

function Start () {
	
	line.enabled = false;
	line.material = mat;
//	line.SetColors(c1,c2);
	line.SetWidth(0.05,0.05);

}

function Update () {
	var mainCamera = FindCamera();
var hitt : RaycastHit;
	if(Input.GetMouseButton(0) && GetComponent.<NetworkView>().isMine)
	{
	//var ray = mainCamera.ScreenPointToRay (Input.mousePosition);
		if( Physics.Raycast(mainCamera.ScreenPointToRay(Input.mousePosition),  hitt, 3 ) )
		{
			if( hitt.rigidbody && !hitt.rigidbody.isKinematic ) {
//				Debug.Log("Hay un objeto adelante");
				line.enabled=true;
				//line.SetPosition(0,new Vector3(transform.position.x, transform.position.y +1, transform.position.z));
				line.SetPosition(0,transform.position);
				line.SetPosition(1, hitt.point);
				GetComponent.<NetworkView>().RPC("sendLine", RPCMode.Others , 1, transform.position, hitt.point);			
			}
			
		}
	//	hitt.
	//	Debug.Log("se presiono dentro de trazar linea");
	}
	else
	{
		line.enabled = false;
	}
}
function FindCamera ()
{
	if (GetComponent.<Camera>())
		return GetComponent.<Camera>();
	else
		return Camera.main;
}

@RPC
//Enviado por los nuevos clientes conectados, recibido por el servidor
function sendLine(habilitado : int, inicio : Vector3, fin : Vector3){
	//if(habilitado == 1)
		line.enabled = true;
//	else
//		line.enabled = false;
	line.SetPosition(0,inicio);
	line.SetPosition(1, fin);
}