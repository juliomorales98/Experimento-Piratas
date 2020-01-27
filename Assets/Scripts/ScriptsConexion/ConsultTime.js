#pragma strict
#pragma implicit
#pragma downcast

import UnityEngine.UI;

var timeText : Text;

var skin : GUISkin;						//Skin
var showTime : boolean= false;			//Muesta/Esconde el tiempo


private var timer : String= "";
private var scrollPosition : Vector2;
private var width : int= 200;
private var height : int= 100;

private var window : Rect;
private var muestra : boolean= true;

var minutes;
var seconds;
private var startTime : float;
var textTime : String;

var finalizado : boolean = false;

function Awake(){	
	showTime=false;	
	window = Rect(Screen.width-98, Screen.height-310, width, height);
	startTime = Time.time;
}
//Comprobamos si se presiono la tecla T
function Update () {
	/*if (Input.GetKeyDown(KeyCode.T)){		
		if(!showTime){
			showTime=true;
		}
		else{
			
			showTime = false;
		}
	}*/

	var guiTime = Time.time - startTime;
	
	var minutes : int = guiTime / 60;
	var seconds : int = guiTime % 60;
	textTime = String.Format("{0:00}:{1:00}",minutes,seconds);

	timeText.text = "Tiempo(minutos):"+textTime;

	if(minutes >= 1){
		finalizado = true;
	}
	
}
//Mostramos en tiempo o no el tiempo
function OnGUI ()
{
	//Calculamos el tiempo
	var guiTime = Time.time - startTime;
	
	var minutes : int = guiTime / 60;
	var seconds : int = guiTime % 60;
	textTime = String.Format("{0:00}:{1:00}",minutes,seconds);
	/*if(!showTime){
		if(GUI.Button(Rect(Screen.width-198,Screen.height-500,188,20), "Mostrar Tiempo [T]"))
		{
			showTime = true;
		}	
	}
	else {*/
	//Mostramos el tiempo:
	var style : GUIStyle = new GUIStyle();
	style.fontSize = 20;
	//GUI.Label(Rect (Screen.width * 0.4,0,188,20),"Tiempo (minutos): "+ textTime, style);
	//timeText.text = "Tiempo (minutos): " + textTime;

	GUI.skin = skin;		
	/*if(GUI.Button(Rect(Screen.width-198,Screen.height-500,188,20), "Ocultar Tiempo [T]")){
			showTime=false;			
	}*/		
	//}

	if(finalizado){
		/*GUI.Label(Rect (Screen.width * 0.4,0,188,20),"Tiempo Terminado, será regresado al menú principal...");	
		Network.Disconnect();
		Application.LoadLevel(0);*/
	}
}



