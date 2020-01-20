
#pragma strict
#pragma implicit
#pragma downcast

import UnityEngine.UI;

var playerPref  : Transform;
var playerPref1 : Transform;
var playerPref2 : Transform;
var playerPref3 : Transform;
var playerPref4 : Transform;

var gameName : String = "Conexion1";
var chatScript : FPSChat;
var playerName : String = "";
var savedPlayer :int ;
static var Player : GameObject;

var pirateText : Text;
var playerText : Text;
//diferentes avatares
//var player01Prefab : GameObject;
//var player02Prefab : GameObject;
//var player03Prefab : GameObject;


//Solo-Servidor playerlist
public var playerList = new ArrayList();


class FPSPlayerNode {
	var playerName : String;
	var networkPlayer : NetworkPlayer;
	var kills : int =0;
	var deaths : int =0;	
}


function Awake() 
{
			
		savedPlayer = CharacterSelector.getSelected();
		Debug.Log("saved player = "+savedPlayer);
		var nombrePirata : String;
		switch(savedPlayer)
		{
			case 0:; case 1:
				playerPref = playerPref1;
				nombrePirata = "Pirata 1";
				break;
			case 2:
				playerPref = playerPref2;
				nombrePirata = "Pirata 2";
				break;
			case 3:
				playerPref = playerPref3;
				nombrePirata = "Pirata 3";
				break;				
			case 4:
				playerPref = playerPref4;
				nombrePirata = "Pirata 4";
				break;				
				
		}
		
	playerName = PlayerPrefs.GetString("playerName");
	//playerName = "olis" + nombrePirata;
	pirateText.text = nombrePirata;
	playerText.text = playerName;
	
	chatScript = GetComponent(FPSChat);
	Network.isMessageQueueRunning = true;
	Screen.lockCursor=false;	
	
	if(Network.isServer){
		
		GetComponent.<NetworkView>().RPC ("TellOurName", RPCMode.AllBuffered, playerName);
		chatScript.ShowChatWindow();
		
		for (var go : GameObject in FindObjectsOfType(GameObject)){
			go.SendMessage("OnNetworkLoadedLevel", SendMessageOptions.DontRequireReceiver);	
		}		
		MasterServer.RegisterHost(gameName, PlayerPrefs.GetString("playerName")+"'s game");
			
	}else if(Network.isClient){
		
		GetComponent.<NetworkView>().RPC ("TellOurName", RPCMode.AllBuffered, playerName);
		chatScript.ShowChatWindow();
		
		for (var go : GameObject in FindObjectsOfType(GameObject)){
			go.SendMessage("OnNetworkLoadedLevel", SendMessageOptions.DontRequireReceiver);	
		}	
		
		
		
	}else{
		//Como entramos aqui sin una conexion?
		Screen.lockCursor=false;	
		Application.LoadLevel((Application.loadedLevel-2));		
	}
}


//Funcion del Servidor
function OnPlayerDisconnected(player: NetworkPlayer) {
	Network.RemoveRPCs(player, 0);
	Network.DestroyPlayerObjects(player);

	//Remover jugador de la lista del servidor
	for(var entry : FPSPlayerNode in  playerList){
		if(entry.networkPlayer==player){
			chatScript.addGameChatMessage(entry.playerName+" desconectado de: " + player.ipAddress+":" + player.port);
			playerList.Remove(entry);
			break;
		}
	}
}

//Funcion del Servidor
function OnPlayerConnected(player: NetworkPlayer) {
	chatScript.addGameChatMessage("Jugador conectado de: " + player.ipAddress + ":" + player.port);
}

@RPC
//Enviado por los nuevos clientes conectados, recibido por el servidor
function TellOurName(Ourname : String, info : NetworkMessageInfo){
	var netPlayer : NetworkPlayer = info.sender;
	if(netPlayer + "" == "-1" ) {
		//Este hack es requerido para arreglar el networkplayer de los jugadores locales cuando el RPC es enviado a el mismo.
		netPlayer = Network.player;
	}
	
	//Lo comentado abajo tiene un error que no deja que el juego inicie una vez seleccionado el avatar
	/*Player.name = Ourname;
	var newEntry : FPSPlayerNode = new FPSPlayerNode();
	newEntry.playerName = name;
	newEntry.networkPlayer = netPlayer;
	playerList.Add( newEntry );*/
	
	if(Network.isServer){
		chatScript.addGameChatMessage( name + " unido al juego" );
	}
}

//Llamado via Awake()
function OnNetworkLoadedLevel()
{
	
	// Inicia aleatoriamente la posicion de los jugadores en los Spawnpoints
	var spawnpoints : GameObject[] = GameObject.FindGameObjectsWithTag ("Spawnpoint");
	var spawnpoint : Transform;
	var newTrans : Transform;

	//Debug.Log("spawns: "+spawnpoints.length);
	
	if(Network.isServer){
		spawnpoint = spawnpoints[0].transform;
		newTrans = Network.Instantiate(playerPref,spawnpoint.position, spawnpoint.rotation, 0);
	
	}
	if(Network.isClient){

		spawnpoint = spawnpoints[Random.Range(1, spawnpoints.length)].transform;
		newTrans = Network.Instantiate(playerPref,spawnpoint.position, spawnpoint.rotation, 0);
	}
	
	//var spawnpoint : Transform = spawnpoints[Random.Range(0, spawnpoints.length)].transform;
	//var newTrans : Transform = Network.Instantiate(playerPref,spawnpoint.position, spawnpoint.rotation, 0);
	Player = playerPref.gameObject;
}


function OnDisconnectedFromServer () {
	//Cargar el menu principal
	Screen.lockCursor=false;
	Application.LoadLevel("Main_Menu");
}