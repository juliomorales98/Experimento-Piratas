var camara:Camera;
private var lockCamera = true;//variable para controlar el lock de la camara

function Start(){
	Cursor.visible=false;
}
function Update () {
		var screenX=Screen.width;
		var screenY=Screen.height;
		var posX=Input.mousePosition.x/screenX;
		var posY=Input.mousePosition.y/screenY;
		transform.position.x=posX;
		transform.position.y=posY;

		//Si presiona tab cambia la variable para lockear mouse a false/true
		if (Input.GetKeyUp(KeyCode.Tab)){
		//Debug.Log("TAB");
			if(lockCamera)
				lockCamera = false;
			else
				lockCamera = true;
		}

		if(lockCamera)
			Cursor.lockState = CursorLockMode.Locked; //Para que el cursor quede al centro de la pantalla
		else
			Cursor.lockState = CursorLockMode.None; //Modo libre


	
}
