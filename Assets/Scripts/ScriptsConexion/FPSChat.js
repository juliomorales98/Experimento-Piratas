
#pragma strict
#pragma implicit
#pragma downcast

import UnityEngine.UI;

var pirateName : Text;

public static var usingChat : boolean = false;	//puede ser usado para detener el movimiento del jugador durante el chat
var skin : GUISkin;						//Skin
var showChat : boolean= false;			//Muesta/Esconde el chat


private var inputField : String= "";
private var scrollPosition : Vector2;
private var width : int= 188;
private var height : int= 400;
private var playerName : String;
private var lastUnfocus : float =0;
private var window : Rect;
private var muestra : boolean= true;
	
private var chatEntries = new ArrayList();

class FPSChatEntry
{
	var name : String= "";
	var text : String= "";	
}


function Awake(){	
	usingChat=false;
	showChat=true;	
	window = Rect(Screen.width-198, Screen.height-410, width, height);

	
}

function Update () {
	if (Input.GetKeyDown("y")){		
		if(!showChat){
			showChat=true;
			usingChat=true;
	//		GUI.FocusWindow(5);
	//		GUI.FocusControl("Area de Chat");
		}
		else{
			
			showChat = false;
			inputField = "";
		}
	}

	
}

function CloseChatWindow ()
{
	showChat = false;
	inputField = "";
	chatEntries = new ArrayList();
}

function ShowChatWindow ()
{
	playerName = PlayerPrefs.GetString("playerName", "");
	if(!playerName || playerName==""){
		playerName = "RandomName"+Random.Range(1,999);
	}	
	showChat = true;
	inputField = "";
	chatEntries = new ArrayList();
}

function OnGUI ()
{
	if(!showChat){
		if(GUI.Button(Rect(Screen.width-198,Screen.height-30,188,20), "Mostrar Chat [Y]")){
			if(lastUnfocus+0.25<Time.time){
			showChat=true;
			usingChat=true;
			GUI.FocusWindow(5);
			//GUI.FocusControl("Area de Chat");			
			}
		}	
		return;
	}
	
	GUI.skin = skin;		
	if(GUI.Button(Rect(Screen.width-198,Screen.height-450,188,20), "Ocultar Chat [Y]")){
			showChat=false;
			inputField = "";			
	}		
	

	
	if ((Event.current.type == EventType.KeyDown && Event.current.character == "\n" && inputField.Length <= 0) && !showChat)
	{
		if(lastUnfocus+0.25<Time.time){
			showChat=true;
			usingChat=true;
			GUI.FocusWindow(5);
			GUI.FocusControl("Area de Chat");
			
		}
	}
	
	window = GUI.Window (5, window, GlobalChatWindow, "");
}


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
	
	
	
	
	
	if(Input.GetKeyDown("mouse 0")){
		if(usingChat){
			usingChat=false;
			GUI.UnfocusWindow ();//Salir del chat
			lastUnfocus=Time.time;
			inputField = "";
			//showChat=false;
		}
	}
}

function HitEnter(msg : String){
	msg = msg.Replace("\n", "");
	if(pirateName.text != "Pirata 4")
		GetComponent.<NetworkView>().RPC("ApplyGlobalChatText", RPCMode.All, playerName, msg);
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

//Añadir mensajes de juego
function addGameChatMessage(str : String){
	ApplyGlobalChatText("", str);
	if(Network.connections.length>0){
		GetComponent.<NetworkView>().RPC("ApplyGlobalChatText", RPCMode.Others, "", str);	
	}	
}