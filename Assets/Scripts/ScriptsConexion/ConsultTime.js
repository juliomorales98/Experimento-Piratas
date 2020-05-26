#pragma strict
#pragma implicit
#pragma downcast
import UnityEngine.UI;
var timeText : Text;
var skin : GUISkin;						//Skin
var showTime : boolean= false;		//Muesta/Esconde el tiempo
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
	//Mostramos el tiempo:
	var style : GUIStyle = new GUIStyle();
	style.fontSize = 20;
	GUI.skin = skin;
}