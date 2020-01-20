
#pragma strict
#pragma implicit
#pragma downcast

var speed = 6.0;
var jumpSpeed = 8.0;
var gravity = 20.0;


private var moveDirection = Vector3.zero;
private var grounded : boolean = false;
private var caminando : boolean = false;
static var myPlayerName : String = "MyPlayerName";
function FixedUpdate() {
	if (grounded) {
		if(!FPSChat.usingChat){
			 
			// Estamos unidos a la tiera, entonces se recalcula la direccion de movimiento directamente de las axes
			moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
			moveDirection = transform.TransformDirection(moveDirection);
			moveDirection *= speed;
			myPlayerName="";
			myPlayerName = PlayerPrefs.GetString("playerName");	
			
			if(Input.GetAxis("Vertical")!= 0){
				caminando=true;
				Debug.Log(myPlayerName);
			  	GetComponent.<NetworkView>().RPC("Caminata", RPCMode.All, myPlayerName);
			}
   			else{
   				if(caminando==true){
   					caminando=false;
     				GetComponent.<NetworkView>().RPC("Detener", RPCMode.All, myPlayerName);
     			}
     		} 
			
			if (Input.GetButton ("Jump")) {
				moveDirection.y = jumpSpeed;
			}
		}
	}

	// Aplica gravedad
	moveDirection.y -= gravity * Time.deltaTime;
	
	// Movimiento del control
	var controller : CharacterController = GetComponent(CharacterController);
	var flags = controller.Move(moveDirection * Time.deltaTime);
	grounded = (flags & CollisionFlags.CollidedBelow) != 0;
}