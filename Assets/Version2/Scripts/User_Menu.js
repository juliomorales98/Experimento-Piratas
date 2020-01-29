#pragma strict
#pragma implicit
#pragma downcast
//Ventanas del menu
private var windowRect1;
private var windowRect2;
private var windowRect3;
private var windowRect4;
private var windowRect5;
private var windowRect6;
private var windowRect7;
private var windowRect8;
private var windowRect9;
private var windowRect10;
private var windowRect11;
private var windowRect12;
private var windowRect13;
private var windowRect14;
private var windowRect15;
private var windowRect16;

static var playNowMode : boolean = false;
static var advancedMode : boolean = false;
static var playNowModeStarted  : float = 0.0;

//Bandera para el estado del chat
static var instruction : boolean = false;

//Archivo donde se guardaran los datos registrados durante el juego
public var fileName : String = "C:\\PlanConstruccion.txt";
var fs : StreamWriter;
var stream : FileStream;
var filePermissions : FileIOPermission;

//Nombre del jugador
static var myPlayerName : String = "Nombre del jugador";

//Variables de informacion para las conexiones en LAN
private var hostPlayers : int = 3;
private var hostPort : int;
private var connectPort : int;
private var connectIP : String = "";

private var multiplayerScript : Game_Menu;
private var currentMenu : String = "";

//Variables poara el chat
var miTexto : String = "";
var texto : GUIText;
var textAreaString = "";
var textFieldString = "";

//Imagenes que se muestran en el menu
var barco : Texture2D;
var mapa : Texture2D;
var Captura : Texture;

/******************** CHAT ************************/
public static var usingChat : boolean = false;	//puede ser usado para detener el movimiento del jugador durante el chat
var skin : GUISkin;						//Skin
var showChat : boolean= false;			//Muesta/Esconde el chat


static var inputField : String= "";
private var scrollPosition : Vector2;
private var width : int= 188;
private var height : int= 400;
private var playerName : String;
private var lastUnfocus : float =0;
private var window : Rect;
private var muestra : boolean= true;
public var chatEntries = new ArrayList();	
/******************** CHATFPS ************************/
 class ChatEntry
{
	var name : String= "";
	var text : String= "";	
}
static var a : String = "";

function Awake ()
{	
	Screen.lockCursor=false;	
	myPlayerName = PlayerPrefs.GetString("playerName");
	multiplayerScript = GetComponent(Game_Menu);

	connectPort = hostPort = multiplayerScript.serverPort;
	connectIP = "192.168.1.1";
	
	windowRect1 = Rect (Screen.width/2-310,Screen.height/2-250,365,260);
	windowRect2 = Rect (Screen.width/2+85,Screen.height/2-250,220,100);
	windowRect3 = Rect (Screen.width/2+85,Screen.height/2-110,220,100);
	windowRect4 = Rect (Screen.width/2-330,Screen.height/2,650,400);
	
	windowRect5 = Rect (Screen.width/2-355,160,730,600);
	windowRect6 = Rect (/*Screen.width/2-330,Screen.height/2,*/Screen.width/2-335,200,350,250);
	windowRect7 = Rect (/*Screen.width/2-330,Screen.height/2,*/Screen.width/2+10,200,350,250);
	windowRect8 = Rect (/*Screen.width/2-330,Screen.height/2,*/Screen.width/2+50,720,150,30);
	windowRect9 = Rect (/*Screen.width/2-330,Screen.height/2,*/Screen.width/4+0,Screen.height/2-30,450,50);
	windowRect10 = Rect (/*Screen.width/2-330,Screen.height/2,*/Screen.width/4+10,Screen.height/2-25,285,150);
	windowRect11 = Rect (/*Screen.width/2-330,Screen.height/2,*/Screen.width/2-150,150,150,30);
	windowRect12 = Rect (/*Screen.width/2-330,Screen.height/2,*/Screen.width/2-310,210,650,350);
	windowRect13 = Rect (/*Screen.width/2-330,Screen.height/2,*/0,0,650,450);
	windowRect14 = Rect (/*Screen.width/2-330,Screen.height/2,*/250,300,150,30);
	windowRect15 = Rect (/*Screen.width/2-330,Screen.height/2,*/Screen.width/2-150,720,150,30);
	windowRect16 = Rect (Screen.width/2-335,460,690,250);
	
	playNowMode=false;
	advancedMode=false;
	currentMenu="Menu Principal";
	Cursor.visible=true;
	
		/******************** CHAT ************************/
	usingChat=false;
	showChat=false;
	window = Rect(332, 510, 710, 150);
	/******************** CHAT ************************/
	
}

//Funcion para inicializar el archivo de escritura
function Update () 
{
	/* ARCHIVOS */
	filePermissions = new FileIOPermission( FileIOPermissionAccess.AllAccess, fileName);// Inicializa el archivo, con el nombre y los accesos que tendra
	stream  = new FileStream(fileName, FileMode.Append, FileAccess.Write, FileShare.ReadWrite);// Selecciona el nombre del archivo y le aplica los permisos para abrir, escribir, leer y modificar, en caso de que no exista lo creeara
	fs = new StreamWriter(stream);
	/* FIN ARCHIVOS */
	if (Input.GetKeyDown(KeyCode.Tab)){		
		if(!showChat){
			showChat=true;
			usingChat=true;
		}
		else{
			
			showChat = false;
			inputField = "";
		}
	}
}
//Funcion para desabilitar el chat
function CloseChatWindow ()
{
	showChat = false;
	inputField = "";
	//chatEntries = new ArrayList();
}

//Funcion para habilitar el chat
function ShowChatWindow ()
{
	playerName = PlayerPrefs.GetString("playerName", "");
	showChat = true;
	inputField = "";
	//chatEntries = new ArrayList();
}
/******************** CHAT ************************/
//Funcion de la interfaz de usuario
function OnGUI ()
{		
	//Si nos hemos conectado;  Carga el juego cuando este listo para cargar
	if(Network.isClient || Network.isServer)
	{
		//Desde que estamos conectados, Carga el juego
		if(Application.CanStreamedLevelBeLoaded ((Application.loadedLevel+1)))
		{	
			
			//Generamos las ventanas del menu
			GUI.Box(windowRect5, "Area para establecer el plan de trabajo.");
			GUI.Box (windowRect6, GUIContent("", barco));
			GUI.Box (windowRect7, GUIContent("", Captura));
			window = GUI.Window (5, windowRect16, GlobalChatWindow, "Plan de Construccion");
			//Para comenzar el juego
			if(GUI.Button(windowRect8, "Comenzar"))
			{
				GUI.Box(windowRect9, "");
				GUI.Label(windowRect10, "Iniciando juego!");

				Debug.Log("Chat hasta hora: ");
				Debug.Log(chatEntries);
				
				for (var i : ChatEntry in chatEntries)
     			{
        			a = a + i.name.ToString() + ": ";
        			a = a + i.text.ToString() + "\n";
        			Debug.Log(a);
     			}
				Debug.Log("Se acabo el chat");
				
				Application.LoadLevel("CharacterSelection");
			}
			if(GUI.Button(windowRect15, "Instrucciones") )
			{
				if(!instruction)
				{
					currentMenu="Instrucciones";
					instruction=true;
					advancedMode=false;
					showChat=false;
					GUI.FocusWindow(windowRect12);
					GUI.FocusControl("Informacion");
				}
				else 
				{
					instruction = false;
					currentMenu="Avanzar";
				}
			}
		
			//Mostrar ventana de instrucciones si no exixten errores y si la bandera esta activada
			if(instruction)
			{
				if(!multiplayerScript.errorMessage || multiplayerScript.errorMessage=="")
				{
					GUI.BeginGroup (windowRect12);
					GUI.Box(windowRect13, "Informacion");		
					//Instrucciones del juego
					GUILayout.Label("\nNumero de jugadores maximo permitidos: 4");
					GUILayout.Label("El juego consiste en armar un navio, sus piezas se encuentran esparcidas por todo el mapa en las distintas islas que lo componen.");
					GUILayout.Label("Existen cuatro personajes, cada uno de ellos con cierta discapacidad para realizar determinadas tareas:");
					GUILayout.Label("1. No cuenta con una pierna\n2. No cuenta con una mano\n3. Es daltonico\n4. No puede hablar\n\nSe debera de seleccionar un personaje antes de iniciar el juego.");
					
					//Regresar a la ventana anterior
					if(GUI.Button(windowRect14, "Regresar"))
					{
						currentMenu="Avanzar";
						instruction=false;
						showChat=true;
					}
					
					GUI.EndGroup();
				}	
			}
		}
		//En caso de no poder cargar el juego
		else
		{
			GUI.Label(Rect(Screen.width/4+10,Screen.height/2-25,285,150), "Cargando el juego... "+Mathf.Floor(Application.GetStreamProgressForLevel((Application.loadedLevel+1))*100)+" %");
		}
		return;
	}		
	//Error Sucio mensaje popup
	if(multiplayerScript.errorMessage && multiplayerScript.errorMessage!="")
	{	
		GUI.Box(Rect(Screen.width/2-100,Screen.height/2-60,200,60), "Error");
		GUI.Label(Rect(Screen.width/2-90,Screen.height/2-50,180,50), multiplayerScript.errorMessage);
		if(GUI.Button(Rect(Screen.width/2+40,Screen.height/2-30,50,20), "Cerrar"))
		{
			multiplayerScript.errorMessage="";
		}
	}		
	//Para salir de la aplicacion		
	if(GUI.Button(Rect(Screen.width-100,Screen.height-30,90,20), "Salir"))
	{			
		Application.Quit();
	}
	//Solicitar datos al jugador
	GUI.Box (Rect (Screen.width/2-200, 30, 400, 160), "Nombre del Jugador");
	GUI.Label (Rect (Screen.width/2-180, 60, 360, 50), "Ingresa tu nombre:");
	myPlayerName = GUI.TextField (Rect (Screen.width/2-180, 85, 360, 27), myPlayerName);	
	//Guardar nombre de jugador
	if(GUI.changed)
	{
		PlayerPrefs.SetString("playerName", myPlayerName);
	}
	if(myPlayerName=="")
	{
		GUI.Label (Rect (Screen.width/2-180, 115, 360, 100), "Despues de teclear tu nombre puedes empezar a jugar");
		return;
	}
	//Continuar con el juego		
	if(GUI.Button(Rect(Screen.width/2+30,150,150,30), "Empezar") )
	{
		if(!advancedMode)
		{
			currentMenu="Avanzar";
			advancedMode=true;
			instruction = false;;
		}
		else 
		{
			advancedMode = false;
			currentMenu="Menu principal";
		}
	}
	//Mostrar las instrucciones
	if(GUI.Button(windowRect11, "Instrucciones") )
	{
		if(!instruction)
		{
		currentMenu="Instrucciones";
		instruction=true;
		advancedMode=false;
		
		}
		else 
		{
		instruction = false;
		currentMenu="Menu principal";
		}
	}
	if(advancedMode)
	{	
		//Mostrar ventanas de conexion si no hay errores	
		if(!multiplayerScript.errorMessage || multiplayerScript.errorMessage=="")
		{ 
			if(GUI.Button(Rect(Screen.width/2-70,480,140,30), "Regresar"))
			{
				currentMenu="Menu Principal";
				advancedMode=false;
			}
			windowRect1 = GUILayout.Window (0, windowRect1, listGUI, "Unete a un juego via lista de servidor");	
			windowRect2 = GUILayout.Window (1, windowRect2, directConnectGUIWindow, "Conectar via IP");	
			windowRect3 = GUILayout.Window (2, windowRect3, hostGUI, "Levantar Servidor");
		}
	}	
	//Ventana de instrucciones	
	if(instruction)
	{
		if(!multiplayerScript.errorMessage || multiplayerScript.errorMessage=="")
		{ 
			GUI.BeginGroup (windowRect12);
			GUI.Box(windowRect13, "Informacion");
			//Regresar al la ventana anterior
			if(GUI.Button(windowRect14, "Entendido"))
			{
				currentMenu="Menu Principal";
				instruction=false;
			}
			//Instrucciones del juego
			GUILayout.Label("\nNumero de jugadores maximo permitidos: 4");
			GUILayout.Label("El juego consiste en armar un navio, sus piezas se encuentran esparcidas por todo el mapa en las distintas islas que lo componen.");
			GUILayout.Label("Existen cuatro personajes, cada uno de ellos con cierta discapacidad para realizar determinadas tareas:");
			GUILayout.Label("1. No cuenta con una pierna\n2. No cuenta con una mano\n3. Es daltonico\n4. No puede hablar\n\nSe debera de seleccionar un personaje antes de iniciar el juego.");
			GUI.EndGroup();
		}	
	}
	if ((Event.current.type == EventType.KeyDown && Event.current.character == "\n" && inputField.Length <= 0) && !showChat)
	{
		if(lastUnfocus+0.25<Time.time)
		{
			showChat=true;
			usingChat=true;
			GUI.FocusWindow(5);
			GUI.FocusControl("Area de Chat");
		}
	}
}
/********************* CHAT *************************/
function GlobalChatWindow (id :int) 
{
	
	GUILayout.BeginVertical();
	GUILayout.Space(10);
	GUILayout.EndVertical();
	
	//Scroll de chat
	scrollPosition = GUILayout.BeginScrollView (scrollPosition);

	for (var entry : ChatEntry in chatEntries)
	{
		GUILayout.BeginHorizontal();
		//Mensaje del chat
		if(entry.name==""){
			GUILayout.Label (entry.text);
		}else{
			GUILayout.Label (entry.name+": "+entry.text);
		}
		
		GUILayout.EndHorizontal();
		GUILayout.Space(1);	
	}
	// Fin del Scroll.
    GUILayout.EndScrollView ();
	if (Event.current.type == EventType.KeyDown && Event.current.character == "\n" && inputField.Length > 0)
	{
		HitEnter(inputField);
		Debug.Log("Presionaste enter: ");
	}
	GUI.SetNextControlName("Area de Chat");
	inputField = GUILayout.TextField(inputField);
	if(Input.GetKeyDown("mouse 0")){
		if(usingChat){
			usingChat=false;
			lastUnfocus=Time.time;
			inputField = "";
		}
	}
}
function HitEnter(msg : String){
	
	//var chatScript2 : FPSChat;
	//chatScript2 = GetComponent(FPSChat);
	//chatScript2.addGameChatMessage(msg);
	msg = msg.Replace("\n", "");
	
	//chatScript2.chatEntries.Add(msg);
	//chatScript2.addGameChatMessage(msg);
	GetComponent.<NetworkView>().RPC("ApplyGlobalChatText", RPCMode.All, myPlayerName, msg);
	Debug.Log("Mensaje enviado por el chat: ");
	Debug.Log(msg);
	inputField = ""; //Limpiar linea
	usingChat=false;
	showChat= true;
}

@RPC
function ApplyGlobalChatText (name : String, msg : String)
{
	var entry : ChatEntry = new ChatEntry();
	entry.name = name;
	entry.text = msg;
	chatEntries.Add(entry);
	Debug.Log(chatEntries);
	scrollPosition.y = 1000000;	
	
	// Escribe en el archivo, concediendo permisos de escritura
	fs.WriteLine(name+": "+msg);// Manda los datos al archivo
	filePermissions.Demand();// Abrir, escribir y leer
	fs.Flush();// Limpia el buffer
	// Cierra el archivo
	fs.Close();
	fs.Dispose();
	stream.Close();
	stream.Dispose();
}
function hostGUI(id : int){

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
	// Levantar un servidor
	if (GUILayout.Button ("Levantar Servidor"))
	{
		if(!multiplayerScript.errorMessage)
		{
			multiplayerScript.StartHost(hostPlayers, hostPort);
			//Debug.Log("Host Started");
		}
		else
		{
			Debug.Log("El servidor no pudo ser iniciado");
		}
	}			
	GUILayout.FlexibleSpace();
	GUILayout.EndHorizontal();
}
function directConnectGUIWindow(id : int)
{
	GUILayout.BeginVertical();
	GUILayout.Space(5);
	GUILayout.EndVertical();
	GUILayout.Label(multiplayerScript.connectionInfo);
		
	if(multiplayerScript.nowConnecting)
	{
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label("Tratando de conectar a "+connectIP+":"+connectPort);
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
		
	} 
	else 
	{		
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

private var scrollPosition2 : Vector2;

function listGUI (id : int) 
{	
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

		scrollPosition2 = GUILayout.BeginScrollView (scrollPosition);

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
			GUILayout.Label("Ningun juego hosteado al momento, o no existe conexion a internet");
		}
}
public static function getInput()
{
	//Debug.Log(inputField);
	return inputField;
}
