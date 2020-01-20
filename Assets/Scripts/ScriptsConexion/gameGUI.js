#pragma strict
#pragma implicit
#pragma downcast

public var gameName = "Conexion1";

function Awake(){
	//Reactiva los mensajes de la red y carga el nivel correcto
	Network.isMessageQueueRunning = true;
	
	if(Network.isServer){
		Debug.Log("El servidor registro el juego en el servidor maestro.");
		MasterServer.RegisterHost(gameName, "myGameTypeName", "MyComment");
	}
}


function OnGUI ()
{

	if (Network.peerType == NetworkPeerType.Disconnected){
	//Estamos desconectados: Ningun cliente ni host
		GUILayout.Label("Status de conexion: Nos Hemos desconectado");
		if(GUILayout.Button("Volver al menu principal")){
			Application.LoadLevel("Main_Menu");
		}
		
	}else{
		//Tenemos una conexion (es)!
		

		if (Network.peerType == NetworkPeerType.Connecting){
		
			GUILayout.Label("Estado de la Conexion: Conectando");
			
		} else if (Network.peerType == NetworkPeerType.Client){
			
			GUILayout.Label("Estado de la Conexion: Cliente!");
			GUILayout.Label("Ping al servidor: "+Network.GetAveragePing(  Network.connections[0] ) );		
			
		} else if (Network.peerType == NetworkPeerType.Server){
			
			GUILayout.Label("Estado de la Conexion: Servidor!");
			GUILayout.Label("Conexiones: "+Network.connections.length);
			if(Network.connections.length>=1){
				GUILayout.Label("Ping al primer jugador: "+Network.GetAveragePing(  Network.connections[0] ) );
			}			
		}

		if (GUILayout.Button ("Desconectar"))
		{
			Network.Disconnect(200);
		}
	}
	

}

//CLient function
function OnDisconnectedFromServer(info : NetworkDisconnection) {
	Debug.Log("Este CLIENTE se ha desconectado del servidor");
}


//Server functions called by Unity
function OnPlayerConnected(player: NetworkPlayer) {
	Debug.Log("Jugador Conectado de: " + player.ipAddress +":" + player.port);
}

function OnPlayerDisconnected(player: NetworkPlayer) {
	Debug.Log("Jugador Desconectado de: " + player.ipAddress+":" + player.port);

}



