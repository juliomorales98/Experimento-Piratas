
function OnMouseDrag(){
	posicion = transform.position;
	objeto = tag;
	GetComponent.<NetworkView>().RPC("MoverObjeto", RPCMode.All, objeto , posicion );
	yield;
}


@RPC
function MoverObjeto (obj : String, pos : Vector3){
	Debug.Log("Moviendo  "+ obj);
	GameObject.FindGameObjectWithTag(obj).transform.position = pos;
}