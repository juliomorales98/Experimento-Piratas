

#pragma strict
#pragma implicit
#pragma downcast

public var gameName = "Conexion1";
public var serverPort =  35001;

public var hostData : HostData[];

private var natCapable : ConnectionTesterStatus = ConnectionTesterStatus.Undetermined;
public var filterNATHosts = false;
private var probingPublicIP = false;
private var doneTestingNAT = false;
private var timer : float = 0.0;

private var hideTest = false;
private var testMessage = "Capacidades indeterminadas de NAT";

private var tryingToConnectPlayNow : boolean = false;
public var tryingToConnectPlayNowNumber : int = 0;

private var remotePort : int[] = new int[3];
private var remoteIP : String[] = new String[3];
public var connectionInfo : String = "";

public var lastMSConnectionAttemptForcedNat : boolean= false;
private var NAToptionWasSwitchedForTesting : boolean = false;
private var officialNATstatus : boolean = true;
public var errorMessage : String = "";
private var lastPlayNowConnectionTime : float;

public var nowConnecting : boolean = false;

function Awake ()
{
	sortedHostList = new Array ();
	
	// Empezar prueba de conexion
	natCapable = Network.TestConnection();
		
	// Que tipo de IP tiene esta maquina? La prueba de conexion indica esto en
	// los resultados
	if (Network.HavePublicAddress())
	{
		Debug.Log("Esta maquina tiene un IP publica");
	}
	else
	{
		Debug.Log("Esta maquina tiene un IP privada");
	}	
}

function Start()
{
	//Debe estar en el inicio por la corrutina	
	yield WaitForSeconds(0.5);
	var tries : int=0;
	while(tries<=10){		
		if(hostData && hostData.length>0){
			//esperando por el hostData
		}else{
			FetchHostList(true);
		}
		yield WaitForSeconds(0.5);
		tries++;
	}
}

function OnFailedToConnectToMasterServer(info: NetworkConnectionError)
{
	Debug.Log("Fallo la conexion con el servidor maestro");
}

function OnFailedToConnect(info: NetworkConnectionError)
{
	Debug.Log("Falla al conectar, direccion no encontrada: "+info);
	FailedConnRetry(info);		
}

function Connect(ip : String, port : int)
{
	// Habilitar funcionalidad NAT basada en que Host esta configurado para hacerlo
	//lastMSConnectionAttemptForcedNat = usenat;
	
	Debug.Log("Conectando a "+ip+":"+port+" NAT:");
	Network.Connect(ip, port);		
	nowConnecting=true;
	Network.isMessageQueueRunning = true;
	Debug.Log("ACTIVAR RED");
}

//Esta segunda definicion de coneccion puede manejar la ip string[]pasada por el servidor maestro
function Connect(ip : String[], port : int){
	// Habilitar funcionalidad NAT basada en que Host esta configurado para hacerlo
	
	//lastMSConnectionAttemptForcedNat = usenat;
	
	Debug.Log("Conectando a "+ip[0]+":"+port+" NAT:");
	Network.Connect(ip, port);		
	nowConnecting=true;	
	Network.isMessageQueueRunning = true;
	Debug.Log("ACTIVAR RED");
}

function StartHost(players : int, port : int)
	{
	if(players<=1){players=1;}
	//Network.InitializeSecurity();
	Network.InitializeServer(players, port,true);
	Network.isMessageQueueRunning = true;
	Debug.Log("ACTIVAR RED");
	Debug.Log("Conexion establecida");
	//Registrar nuestro servidor en el servidor maestro de unity
	MasterServer.RegisterHost("Conexion1", PlayerPrefs.GetString("playerName")+"'s game");
	}
function OnConnectedToServer(){
	//Deteniendo la comunicacion incluso en el juego
	Network.isMessageQueueRunning = false;

	//Guardando los detalles para poderlos usar en la siguiente escena
	PlayerPrefs.SetString("connectIP", Network.connections[0].ipAddress);
	PlayerPrefs.SetInt("connectPort", Network.connections[0].port);
}

function FailedConnRetry(info: NetworkConnectionError){
	if(info == NetworkConnectionError.InvalidPassword){
		mayRetry=false;
	}
	
	
	nowConnecting=false;
	
	//Juego Rapido
	if(tryingToConnectPlayNow){
		//Intentado de nuevo sin NAT si usamos NAT
		if(mayRetry  && lastMSConnectionAttemptForcedNat){
			Debug.Log("Falla al conectar 1A: intentando sin NAT");
		
			remotePort[0]=serverPort;//Regresal al puerto del servidor por default
			Connect(remoteIP, remotePort[0]);
			lastPlayNowConnectionTime=Time.time;
		}else{
			//No usamos NAT y fallo
			Debug.Log("Falla al conectar 1B: No reintentar");
		
			
						
			//conectar al siguiente playnow/quickplay host
			tryingToConnectPlayNowNumber++;
			tryingToConnectPlayNow=false;
		}
	}else{
		//Conectar directamente o via lista host manualmente
		connectionInfo="Falla al conectar!";
		
		if(mayRetry  && lastMSConnectionAttemptForcedNat){
			//Desde la ultima conexion forzada a usar NAT,
			// Tratemos de nuevo sin NAT.		
			
			Network.Connect(remoteIP, remotePort[0]);
			nowConnecting=true;
			lastPlayNowConnectionTime=Time.time;
			
		}else{
			Debug.Log("Falla 2b");
		
			if(info == NetworkConnectionError.InvalidPassword){
				errorMessage="Falla al conectar: Password incorrecto proporcionado";
			}else if(info == NetworkConnectionError.TooManyConnectedPlayers){
				errorMessage="Falla al conectar: Servidor lleno";
			}else{
				errorMessage="Falla al conectar";
			}
			
			//Reinicio al puerto default
			remotePort[0]=serverPort;
			
			
			
		}
	}	
}

public var CONNECT_TIMEOUT : float = 0.75;
public var CONNECT_NAT_TIMEOUT : float = 5.00;

//Nuesta funcion de juego rapido: Va a traves de la lista de juego y trata de conectar a todos los juegos
function PlayNow(timeStarted : float ){
	
		var i : int=0;
		
		for (var myElement in sortedHostList)
		{
			var element=hostData[myElement];
		
			// No tratar juegos NAT habilitados si no podesmos hacer la irrupcion NAT
			// No trata de conectarse a juegos protegidos con contraseña
			if ( !(filterNATHosts && element.useNat) && !element.passwordProtected  )
			{
				aHost=1;
								
				if(element.connectedPlayers<element.playerLimit)
				{					
					if(tryingToConnectPlayNow){
						var natText;
						
							natText=" Con opcion 2/2";
						
						if((lastPlayNowConnectionTime+CONNECT_TIMEOUT<=Time.time) || (lastPlayNowConnectionTime+CONNECT_NAT_TIMEOUT<=Time.time)){
							Debug.Log("Interrumpido por tiempo, NAT:");
							FailedConnRetry(NetworkConnectionError.ConnectionFailed);							
						}
						return "Tratando de conectar al host "+(tryingToConnectPlayNowNumber+1)+"/"+sortedHostList.length+" "+natText;	
					}		
					if(!tryingToConnectPlayNow && tryingToConnectPlayNowNumber<=i){
						Debug.Log("Tratando de conectar al juego NR "+i+" & "+tryingToConnectPlayNowNumber);
						tryingToConnectPlayNow=true;
						tryingToConnectPlayNowNumber=i;
						
						// Habilitando funcionalidad NAT basada en que host estan configurados para hacerlo
						lastMSConnectionAttemptForcedNat=element.useNat;
						
						var connectPort : int=element.port;
						
							//connectPort=serverPort; //Mala idea!
							print("Conectando directamente al host");
						
						Debug.Log("Conectando a "+element.gameName+" "+element.ip+":"+connectPort);
						Network.Connect(element.ip, connectPort);	
						lastPlayNowConnectionTime=Time.time;
					}
					i++;		
				}
			}			
		}
		
		//Si alcanzamos este punto entonces o bien se ha analizado toda la lista o la lista sigue vacia
		
		//No te des por vencido aun: da MS 7 segundos para alimentar la lista
		if(Time.time<timeStarted+7){
			FetchHostList(true);	
			return "Esperando al servidor maestro..."+Mathf.Ceil((timeStarted+7)-Time.time);	
		}
		
		if(!tryingToConnectPlayNow){
			return "failed";
		}
		
	
}


function Update() {
	// Si la prueba de red es indeterminada, sigue corriendo
	if (!doneTestingNAT) {
		TestConnection();
	}
}

function TestConnection() {
	// Empezar/encuesta pruebas de conexion, reporta los resultados en una etiqueta y reacciona de acuerdo a los resultados
	natCapable = Network.TestConnection();
	switch (natCapable) {
		case ConnectionTesterStatus.Error: 
			testMessage = "Problema determinando capacidades de NAT";
			doneTestingNAT = true;
			break;
			
		case ConnectionTesterStatus.Undetermined: 
			testMessage = "Capacidades indeterminadas de NAT";
			doneTestingNAT = false;
			break;
			
/*		case ConnectionTesterStatus.PrivateIPNoNATPunchthrough: 
			testMessage = "No se puede hacer irrupcion NAT, filtrando host habilitados NAT para las conexiones de cliente , juegos locales LAN solamente.";
			filterNATHosts = true;
			
			doneTestingNAT = true;
			break;
			
		case ConnectionTesterStatus.PrivateIPHasNATPunchThrough:
			if (probingPublicIP)
				testMessage = "Direccion IP publica no conectable (puerto "+ serverPort +" bloqueado), irrupcion NAT puede evitar el firewall.";
			else
				testMessage = "irrupcion NAT capaz. Habilitando la funcionalidad de irrupcion NAT.";
			// Funcionalidad NAT es habilitada en caso de que el servidor sea iniciado,
			// los clientes deberian habilitarla basados en si el host lo requiere
		
			doneTestingNAT = true;
			break;*/
			
		case ConnectionTesterStatus.PublicIPIsConnectable:
			testMessage = "IP publica directamente conectable.";
			
			doneTestingNAT = true;
			break;
			
		// Este caso es especial como se sabe necesita checar si se puede 
		// evitar el bloqueo usando la irrupcion NAT
		case ConnectionTesterStatus.PublicIPPortBlocked:
			testMessage = "IP publica no conectable (puerto " + serverPort +" bloqueado), es imposible corre un servidor.";
			
			//Si ninguna prueba de irrupcion NAT  ha sido realizada en esta IP publica, forzar una prueba
			if (!probingPublicIP)
			{
				Debug.Log("Probando si el firewall puede ser evitado");
				natCapable = Network.TestConnectionNAT();
				probingPublicIP = true;
				timer = Time.time + 10;
			}
			// Prueba de irrupcion NAT fue realizada pero seguimos bloqueados
			else if (Time.time > timer)
			{
				probingPublicIP = false; 		// Reiniciar
				
				doneTestingNAT = true;
			}
			break;
		case ConnectionTesterStatus.PublicIPNoServerStarted:
			testMessage = "IP publica pero servidor no iniciado, debe ser iniciado para checar accesibilidad. Reiniciar prueba de conexion cuando este listo.";
			break;
		default: 
			testMessage = "Error en rutina de prueba, obtenido " + natCapable;
	}
	officialNATstatus=true;
	if(doneTestingNAT){
		Debug.Log("TestConn:"+testMessage);
		Debug.Log("TestConn:"+natCapable + " " + probingPublicIP + " " + doneTestingNAT);
	}
}

private var lastHostListRequest : float = 0;

//Se pide el limite de host, pero limitamos esta peticion
//Automaticamente maximo una cada dos minutos, manualmente requerido maximo una cada cinco segundos
function FetchHostList(manual : boolean){
	var timeout : int = 120;
	if(manual){
		timeout=5;
	}
	if(lastHostListRequest==0 || Time.realtimeSinceStartup > lastHostListRequest + timeout){
			lastHostListRequest = Time.realtimeSinceStartup;
			MasterServer.ClearHostList();
			MasterServer.RequestHostList (gameName);			
			yield WaitForSeconds(1);//Obtuvimos un wait :/			
			hostData = MasterServer.PollHostList();
			yield WaitForSeconds(1);//Obtuvimos un wait :/	
			CreateSortedArray();
			Debug.Log("Solicitud de nueva lista de host, obtenido: "+hostData.length);
			//Debug.Log(lastHostListRequest);
	}		
}

//El codigo debajo es sobre la clasificacion de la lista de juego por playeramount

public var sortedHostList : Array;

function CreateSortedArray(){
	
	sortedHostList = new Array();	
	
	var i : int=0;
	var data : HostData[] = hostData;
	for (var element in data)
	{
		AddToArray(i);
		i++;		
	}			
}

function AddToArray(nr : int){
	sortedHostList.Add (nr);	
	SortLastItem();
}

function SortLastItem(){
	if(sortedHostList.length<=1){
		return;
	}
	for(var i=sortedHostList.length-1;i>0;i--){
	var value1 : int= hostData[sortedHostList[i-1]].connectedPlayers;
	var value2 : int = hostData[sortedHostList[i]].connectedPlayers;
		if(value1<value2){
			SwapArrayItem((i-1), i);
		}else{
			//Ordenado!
			return;
		}
	}
}

function SwapArrayItem(nr1, nr2){
	var tmp=sortedHostList[nr1];
	sortedHostList[nr1]=sortedHostList[nr2];
	sortedHostList[nr2]=tmp;
}