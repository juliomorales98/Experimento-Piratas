//Variables de animacion
static var myPlayerName : String = "MyPlayerName";
private var caminando : boolean = false;


function Update(){

	myPlayerName="";
	myPlayerName = PlayerPrefs.GetString("playerName");
	if(Input.GetAxis("Vertical")!= 0  || Input.GetAxis("Horizontal")!= 0 ){
			caminando=true;
//			networkView.RPC("Animaciones", RPCMode.All, myPlayerName, ThirdPersonController.velocity);
		}
   		else{
   			if(caminando==true){
   				caminando=false;
    			GetComponent.<NetworkView>().RPC("Detener", RPCMode.All, myPlayerName);
    		}
    	}


	if(Input.GetKeyDown("k")){
		var Avatar = GameObject.Find("fer");
  		//Avatar.animation[walkAnimation.name].speed = Mathf.Clamp(controller.velocity.magnitude, 0.0, runMaxAnimationSpeed);
  		Avatar.GetComponent.<Animation>().CrossFade("walk");
	}
}


//@RPC
/*function Animaciones (playername : String, velocidad : int){
	controller = GetComponent(CharacterController);
	Debug.Log("DESDE EL RPC Animaciones  "+playername+ "  VARIABLE RECIBIDA   "+ velocidad);
  	var Avatar = GameObject.Find(playername);
  	if(velocidad == 1){
  		Debug.Log("CORRER  "+playername);
  		//Avatar.animation["walk"].speed = Mathf.Clamp(controller.velocity.magnitude, 0.0, runMaxAnimationSpeed);
  		Avatar.animation.CrossFade("walk");
  		
  	}
  	else if(velocidad == 2){
  		Debug.Log("TROTAR  "+playername);
  		//Avatar.animation[runAnimation.name].speed = Mathf.Clamp(controller.velocity.magnitude, 0.0, runMaxAnimationSpeed);
  		Avatar.animation.Play("walk");
  		
  	}
  	else if(velocidad == 3){
  		Debug.Log("CAMINAR  "+playername);
  		Avatar.animation.wrapMode = WrapMode.Loop;
  		//Avatar.animation["walk"].speed = Mathf.Clamp(controller.velocity.magnitude, 0.0, runMaxAnimationSpeed);
  		Avatar.animation.Play("walk");
  	}
}*/

/*
@RPC
function correr (playername : String){
	controller = GetComponent(CharacterController);
	Debug.Log("DESDE EL RPC CORRER  "+playername);
  	var Player = GameObject.Find(playername);
  	Player.animation[runAnimation.name].speed = Mathf.Clamp(controller.velocity.magnitude, 0.0, runMaxAnimationSpeed);
  	Player.animation.CrossFade(runAnimation.name);
}

@RPC
function trotar (playername : String){
	controller = GetComponent(CharacterController);
	Debug.Log("DESDE EL RPC TROTAR"+playername);
  	var Player = GameObject.Find(playername);
  	Player.animation[walkAnimation.name].speed = Mathf.Clamp(controller.velocity.magnitude, 0.0, runMaxAnimationSpeed);
  	Player.animation.CrossFade(walkAnimation.name);
}

@RPC
function caminar(playername : String){
	controller = GetComponent(CharacterController);
	Debug.Log("DESDE EL RPC CAMINAR"+playername);
  	var Player = GameObject.Find(playername);
  	Player.animation[walkAnimation.name].speed = Mathf.Clamp(controller.velocity.magnitude, 0.0, runMaxAnimationSpeed);
  	Player.animation.CrossFade(walkAnimation.name);
}
*/
@RPC
function Detener (playername : String){
	controller = GetComponent(CharacterController);
	Debug.Log("DESDE EL RPC DETENER  "+playername);
  	var Avatar = GameObject.Find(playername);
  	Avatar.GetComponent.<Animation>().CrossFade("idle");
}