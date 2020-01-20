
#pragma strict
#pragma implicit
#pragma downcast

private var windowRect1;
private var windowRect2;
private var windowRect3;

static var playNowMode : boolean = false;
static var advancedMode : boolean = false;
static var playNowModeStarted  : float = 0.0;

static var myPlayerName : String = "MyPlayerName";

//GUI vars
private var hostPlayers : int = 3;
private var hostPort : int;
private var connectPort : int;
private var connectIP : String = "";

private var multiplayerScript : Menu_multiplayerCode;
private var currentMenu : String = "";



//Para el chat
private var window : Rect;
var textAreaString : String = "";
private var chatEntries = new ArrayList();
private var inputField : String= "";
var imagenMapa : Texture2D;
var imagenBarco : Texture2D;

function Awake ()
{	
	//GameObject.Destroy();
	Screen.lockCursor=false;	
	myPlayerName = PlayerPrefs.GetString("playerName");
	multiplayerScript = GetComponent(Menu_multiplayerCode);

	connectPort = hostPort = multiplayerScript.serverPort;
	connectIP = "192.168.1.1";
	
	windowRect1 = Rect (Screen.width/2-310,210,365,260);
	windowRect2 = Rect (Screen.width/2+85,210,220,100);
	windowRect3 = Rect (Screen.width/2+85,355,220,100);
	
	playNowMode=false;
	advancedMode=false;
	currentMenu="";
	Cursor.visible=true;

	//chat
	
}



function OnGUI ()
{		
	//Si nos hemos conectado;  Carga el juego cuando este listo para cargar
	if(Network.isClient || Network.isServer){
		//Desde que estamos conectados, Carga el juego
		
		if(Application.CanStreamedLevelBeLoaded ((Application.loadedLevel+1))){
					
			 //-----------------------------------------------------------------------------------------------------------------\\
			//----------------------------------------Menu del chat previo a seleccionar personaje-------------------------------\\
		   //---------------------------------------------------------------------------------------------------------------------\\

			GUI.BeginGroup (Rect (0,0,Screen.width,Screen.height));//Contenedor de todos los cuadros
			GUI.Box (Rect (0,0,Screen.width,Screen.height),"");//Cuadro f�sico de todos los recuadros

			//------------------------------------------------------T�tulo------------------------------------------------------------------\\
			var style : GUIStyle = new GUIStyle();
			style.fontSize = 20;
			GUI.Label(Rect(Screen.width * .5 - 75,Screen.height * 0.01,150,30), "Plan de Construccion", style);

			//------------------------------------------------------Chat------------------------------------------------------------------\\
			window = Rect(Screen.height * .01, Screen.height * .1, Screen.width * .20, Screen.height * .9);//Damos tama�o a la ventana del chat
			window = GUI.Window (5, window, GlobalChatWindow, "");
			
			//------------------------------------------------------Instrucciones------------------------------------------------------------------\\
			var textoInstrucciones : String = "Instrucciones:"+
			"\nSe tienen que juntar las piezas del barco utilizando diferentes tecnicas, ya que cada pirata cuenta con diferentes capacidades."+
			"\nLas diferentes piezas del barco (izquierda) estan repartidas en las diferentes islas dentro del juego (derecha).";
			GUI.Box (Rect (Screen.width * .22,Screen.height * .1,Screen.width*.76,Screen.width*.1), GUIContent(textoInstrucciones));//Cuadro donde se muestran las Instrucciones

			/*imagenBarco.width = Screen.width*.4;
			imagenBarco.height = Screen.width*.3;*/
			/*imagenBarco.Resize(100,100);
			imagenBarco.Apply();*/
			GUI.DrawTexture(Rect (Screen.width * .22,Screen.height * .3,Screen.width*.40,Screen.width*.3), imagenBarco);//Cuadro donde se muestra el barco

			/*imagenMapa.width = Screen.width*.35;
			imagenMapa.height = Screen.width*.3;*/
			GUI.DrawTexture (Rect (Screen.width * .63,Screen.height * .3,Screen.width*.35,Screen.width*.3), imagenMapa);//Cuadro donde se muestra el mapa


			if(GUI.Button(Rect(Screen.width * .62 - 100,Screen.height * .9,200,40), "Comenzar experimento")){//Vamos a la ventana de selecci�n de caract�r para inciar el juego
				
				GUI.Label(Rect(Screen.width/4+10,Screen.height/2-25,285,150), "Iniciando juego!");
				Application.LoadLevel((Application.loadedLevel+1));
				}

			GUI.EndGroup();
		}else{
			GUI.Label(Rect(Screen.width/4+10,Screen.height/2-25,285,150), "Cargando el juego: "+Mathf.Floor(Application.GetStreamProgressForLevel((Application.loadedLevel+1))*100)+" %");
		}	
		return;
	}
	
	
	//Error Sucio mensaje popup
	if(multiplayerScript.errorMessage && multiplayerScript.errorMessage!=""){	
		GUI.Box(Rect(Screen.width/2-100,Screen.height/2-60,200,60), "Error");
		GUI.Label(Rect(Screen.width/2-90,Screen.height/2-50,180,50), multiplayerScript.errorMessage);
		if(GUI.Button(Rect(Screen.width/2+40,Screen.height/2-30,50,20), "Cerrar")){
			multiplayerScript.errorMessage="";
		}
	}	
	
	if(playNowMode){
		playNowFunction();
	}/*else if(advancedMode){
		
		if(!multiplayerScript.errorMessage || multiplayerScript.errorMessage==""){ //Esconder ventana en error
			if(GUI.Button(Rect(Screen.width/2-70,20,140,30), "Regresar")){
				currentMenu="";
				advancedMode=false;
			}
			windowRect1 = GUILayout.Window (0, windowRect1, listGUI, "Unete a un juego via lista de servidor");	
			windowRect2 = GUILayout.Window (1, windowRect2, directConnectGUIWindow, "Conectar via IP");	
			windowRect3 = GUILayout.Window (2, windowRect3, hostGUI, "Crea un Servidor");
			
		}	
		
	}*/else{	
		
		if(GUI.Button(Rect(Screen.width-100,Screen.height-30,90,20), "Salir")){			
			Application.Quit();
		}
		
		GUI.Box (Rect (Screen.width/2-200, 30, 400, 160), "Nombre del Jugador");
		GUI.Label (Rect (Screen.width/2-180, 60, 360, 50), "Ingresa un Nombre:");
		
		myPlayerName = GUI.TextField (Rect (Screen.width/2-180, 85, 360, 27), myPlayerName);	
		if(GUI.changed){
			//Guardar los cambios
			PlayerPrefs.SetString("playerName", myPlayerName);
		}
		
		if(myPlayerName==""){
			GUI.Label (Rect (Screen.width/2-180, 115, 360, 100), "Despues de teclear tu nombre puedes empezar a jugar!");
			return;
		}
		
		GUI.Label (Rect (Screen.width/2-180, 115, 360, 100), "Click en juego rapido para empezar a jugar ahora!");
				
	/*	if(GUI.Button(Rect(Screen.width/2-180,150,150,30), "Juego Rapido") ){
			currentMenu="playnow";
			playNowMode=true;
			playNowModeStarted=Time.time;		
		}*/
		if(GUI.Button(Rect(Screen.width/2+30,150,150,30), "Avanzado") ){
			currentMenu="advanced";
			advancedMode=true;
		}
		
		if(advancedMode){		
			if(!multiplayerScript.errorMessage || multiplayerScript.errorMessage==""){ //Esconder ventana en error
				if(GUI.Button(Rect(Screen.width/2-70,480,140,30), "Cancelar")){
					currentMenu="";
					advancedMode=false;
				}
				windowRect1 = GUILayout.Window (0, windowRect1, listGUI, "Unete a un juego via lista de servidor");	
				windowRect2 = GUILayout.Window (1, windowRect2, directConnectGUIWindow, "Conectar via IP");	
				windowRect3 = GUILayout.Window (2, windowRect3, hostGUI, "Crea un Servidor");
			
			}
		}	
	}
}


function playNowFunction(){
		if(GUI.Button(Rect(490,185,75,20), "Cancelar")){
			Network.Disconnect();
			currentMenu="";
			playNowMode=false;
		}
		
		GUI.Box(Rect(Screen.width/4+0,Screen.height/2-50,420,50), "");

		if(multiplayerScript.tryingToConnectPlayNowNumber>=10){
			//Si los jugadores se hartan de esperar pueden escoger empezar un host ahora mismo
			if(GUI.Button(Rect(400,185,75,20), "Solo hostear")){
				multiplayerScript.StartHost(hostPlayers, multiplayerScript.serverPort);
			}
		}
		
		var connectStatus = multiplayerScript.PlayNow(playNowModeStarted);
		
		if(connectStatus=="Fail"){
			//No se puede encontrar un host apropiado, se hostea uno mismo
			Debug.Log("Juega Ahora: Ningun juego Hosteado, entonces hosteamos uno nosotros mismos");	
			multiplayerScript.StartHost(7, multiplayerScript.serverPort);				
		}else{
			//Aun tratando de conectar en el primero
			GUI.Label(Rect(Screen.width/4+10,Screen.height/2-45,385,50), connectStatus);
		}
}


function hostGUI(id : int){
	//avanzado
	GUILayout.BeginVertical();
	GUILayout.Space(10);
	GUILayout.EndVertical();
	
	GUILayout.BeginHorizontal();
	GUILayout.Space(10);
		GUILayout.Label("Usar puerto: ");
		hostPort = parseInt(GUILayout.TextField(hostPort.ToString(), GUILayout.MaxWidth(75)));
	GUILayout.Space(10);
	GUILayout.EndHorizontal();	
	
	GUILayout.BeginHorizontal();
	GUILayout.Space(10);
		GUILayout.Label("Jugadores: ");
		hostPlayers = parseInt(GUILayout.TextField(hostPlayers.ToString(), GUILayout.MaxWidth(75)));
	GUILayout.Space(10);
	GUILayout.EndHorizontal();
	
	
	GUILayout.BeginHorizontal();
	GUILayout.FlexibleSpace();
		// Empezar un servidor nuevo
		if (GUILayout.Button ("Levantar Servidor")){
			multiplayerScript.StartHost(hostPlayers, hostPort);
		}			
	GUILayout.FlexibleSpace();
	GUILayout.EndHorizontal();
}


function directConnectGUIWindow(id : int){

	GUILayout.BeginVertical();
	GUILayout.Space(5);
	GUILayout.EndVertical();
	GUILayout.Label(multiplayerScript.connectionInfo);
		
	if(multiplayerScript.nowConnecting){
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("Tratando de conectar a "+connectIP+":"+connectPort);
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
		
	} else {		

		GUILayout.BeginHorizontal();
		GUILayout.Space(10);
			connectIP = GUILayout.TextField(connectIP, GUILayout.MinWidth(70));
			connectPort = parseInt(GUILayout.TextField(connectPort+""));
		GUILayout.Space(10);
		GUILayout.EndHorizontal();		
		
		GUILayout.BeginHorizontal();
		GUILayout.Space(10);
		GUILayout.FlexibleSpace();
			
		if (GUILayout.Button ("Conectar"))
		{
			multiplayerScript.Connect(connectIP, connectPort);
		}	
		
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	
	}
	
}

private var scrollPosition : Vector2;

function listGUI (id : int) {
	
		GUILayout.BeginVertical();
		GUILayout.Space(6);
		GUILayout.EndVertical();
	
		
		GUILayout.BeginHorizontal();
		GUILayout.Space(200);

		// Recargar host
		if (GUILayout.Button ("Recargar lista"))
		{
			multiplayerScript.FetchHostList(true);
		}
		multiplayerScript.FetchHostList(false);
		
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();

		//scrollPosition = GUI.BeginScrollView (Rect (0,60,385,200),	scrollPosition, Rect (0, 100, 350, 3000));
		scrollPosition = GUILayout.BeginScrollView (scrollPosition);

		var aHost : int = 0;
		
		if(multiplayerScript.sortedHostList && multiplayerScript.sortedHostList.length>=1){
			for (var myElement in multiplayerScript.sortedHostList)
			{
				var element=multiplayerScript.hostData[myElement];
				GUILayout.BeginHorizontal();

				// No mostrar juegos NAT disponibles si no podemos hacer la irrupcion NAT 
				if ( !(multiplayerScript.filterNATHosts && element.useNat) )
				{				
					aHost=1;
					var name = element.gameName + " ";
					GUILayout.Label(name);	
					GUILayout.FlexibleSpace();
					GUILayout.Label(element.connectedPlayers + "/" + element.playerLimit);
					
					if(element.useNat){
						GUILayout.Label(".");
					}
					GUILayout.FlexibleSpace();
					GUILayout.Label("[" + element.ip[0] + ":" + element.port + "]");	
					GUILayout.FlexibleSpace();
					if(!multiplayerScript.nowConnecting){
					if (GUILayout.Button("Conectar"))
						{
							multiplayerScript.Connect(element.ip, element.port);
						}
					}else{
						GUILayout.Button("Conectando");
					}
					GUILayout.Space(15);
				}
				GUILayout.EndHorizontal();	
			}
		}		
		GUILayout.EndScrollView ();
		if(aHost==0){
			GUILayout.Label("Ningun juego hosteado al momento..");
		}
}

/*
-------------------------------------------------CHAT------------------------------------------------------------
*/

function GlobalChatWindow (id : int) {
	
	GUILayout.BeginVertical();
	GUILayout.Space(10);
	GUILayout.EndVertical();
	
	//Scroll de chat
	scrollPosition = GUILayout.BeginScrollView (scrollPosition);

	for (var entry : FPSChatEntry in chatEntries)
	{
		GUILayout.BeginHorizontal();
		//Mensaje de juego
		if(entry.name==""){
			GUILayout.Label (entry.text);
		}else{
			GUILayout.Label (entry.name + ": " + entry.text);
		}
		GUILayout.EndHorizontal();
		GUILayout.Space(3);
		
	}
	// Fin del Scroll.
	
    GUILayout.EndScrollView ();
	
	if (Event.current.type == EventType.KeyDown && Event.current.character == "\n" && inputField.Length > 0)
	{
		HitEnter(inputField);
	}
	GUI.SetNextControlName("Area de Chat");
	inputField = GUILayout.TextField(inputField);
	
	
	
	
	
	/*if(Input.GetKeyDown("mouse 0")){
		if(usingChat){
			usingChat=false;
			GUI.UnfocusWindow ();//Salir del chat
			lastUnfocus=Time.time;
			inputField = "";
			//showChat=false;
		}
	}*/
}

function HitEnter(msg : String){
	msg = msg.Replace("\n", "");
	GetComponent.<NetworkView>().RPC("ApplyGlobalChatText", RPCMode.All, myPlayerName, msg);
	inputField = ""; //Limpiar linea
	//GUI.UnfocusWindow ();//Salir del chat
	//lastUnfocus=Time.time;
	//usingChat=false;
	//showChat= true;
}


@RPC
function ApplyGlobalChatText (name : String, msg : String)
{
	var entry : FPSChatEntry = new FPSChatEntry();
	entry.name = name;
	entry.text = msg;

	chatEntries.Add(entry);
	
	//Remover entradas viejas
	/*if (chatEntries.Count > 4){
		chatEntries.RemoveAt(0);
	}*/

	scrollPosition.y = 1000000;	
}

//A�adir mensajes de juego
function addGameChatMessage(str : String){
	ApplyGlobalChatText("", str);
	if(Network.connections.length>0){
		GetComponent.<NetworkView>().RPC("ApplyGlobalChatText", RPCMode.Others, "", str);	
	}	
}
