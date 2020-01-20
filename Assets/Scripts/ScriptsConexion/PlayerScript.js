
#pragma strict
#pragma implicit
#pragma downcast

var thisName : String = "Bugged name";
var rigidBodyView : NetworkView;
var localPlayer : boolean = false;



var metalMaterial : Material;
private var orgMaterial : Material;


private var coloredUntill : float;
private var invincible : boolean;


function Awake(){
	orgMaterial = GetComponent.<Renderer>().material;
}

function OnNetworkInstantiate (msg : NetworkMessageInfo) {
	// Este es nuestro propio jugador
	name=thisName=PlayerPrefs.GetString("playerName");
	if (GetComponent.<NetworkView>().isMine)
	{
		
		//camera.main.enabled=false;
		
		localPlayer=true;
		//thisName=PlayerPrefs.GetString("playerName");
		
		GetComponent.<NetworkView>().RPC("setName", RPCMode.Others, thisName);
		
		//Destroy(GameObject.Find("LevelCamera"));
		//var gun = transform.Find("CrateCamera");
		//gun.localPlayer=true;
		//transform.Find("CrateCamera").gameObject.active=false;

		
	}
	// Este es solo un jugador controlado remotamente, no ejecute directamente
	// las entradas de usuario aqui. Habilita el control multijugador
	else
	{
		//thisName="Remote"+Random.Range(1,10);
		
		//thisName=
		name=GameSetup.Player.name;
		GameSetup.Player.name="";
		Debug.Log("SET NAME"+ thisName);
		//GameObject.Find("CrateCamera").gameObject.active=false;

		var tmp2 : ThirdPersonController = GetComponent(ThirdPersonController);
		tmp2.enabled = false;
		var tmp5 : ThirdPersonCamera = GetComponent(ThirdPersonCamera);
		tmp5.enabled = false;
		
		GetComponent.<NetworkView>().RPC("askName", GetComponent.<NetworkView>().viewID.owner, Network.player);
	}
}

@RPC
function Respawn(){
	if (GetComponent.<NetworkView>().isMine)
	{	
		// Aleatoriza la posicion inicial en los spawnpoints
		var spawnpoints : GameObject[] = GameObject.FindGameObjectsWithTag ("Spawnpoint");
		var spawnpoint : Transform = spawnpoints[Random.Range(0, spawnpoints.length)].transform;
	
		transform.position=spawnpoint.position;
		transform.rotation=spawnpoint.rotation;	
	}
}



@RPC
function setName(name : String){
	thisName=name;
	Debug.Log("SET NAME"+ thisName);
}

@RPC
function askName(asker : NetworkPlayer){
	GetComponent.<NetworkView>().RPC("setName", asker, thisName);
	Debug.Log("ASK NAME"+ thisName);
}