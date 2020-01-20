
var style : GUIStyle;
private var playerName : String;
playerName = PlayerPrefs.GetString("playerName", "");
//playerName = "oli";
private var startTime : float;



//var nombreText : Text;
function Start(){
	style.normal.textColor = Color.black;
	style.border.left = 4;
	style.fontSize = 20;
}

function Awake() {
startTime = Time.time;
}

function OnGUI () {	
var guiTime = Time.time - startTime;
var minutes : int = guiTime / 60;
var seconds : int = guiTime % 60;
var fraction : int = (guiTime * 100) % 100;
  	/*if(GUI.Button(Rect(Screen.width-198,10,188,20), "Recargar")){
			Application.LoadLevel(1);
	}*/
	if(GUI.Button(Rect(Screen.width-198,10,188,50), "Regresar al menu principal")){
			if(Network.isClient){
			GUI.Box(Rect(Screen.width/4+0,Screen.height/2-30,450,50), "");
			GUI.Label(Rect(Screen.width/4+10,Screen.height/2-25,285,150), "Abandono la aprtida...");
			Network.Disconnect();
			Application.LoadLevel(0);
			print("Se desconecto el cliente");
			}else{
				Network.Disconnect();
				Application.LoadLevel(0);
				print("Se desconecto el servidor");
			}
	}
	if(GUI.Button(Rect(Screen.width-198,70,188,50), "Salir")){
			Application.Quit();
			if(Network.isClient){
			GUI.Box(Rect(Screen.width/4+0,Screen.height/2-30,450,50), "");
			GUI.Label(Rect(Screen.width/4+10,Screen.height/2-25,285,150), "Abandono la aprtida...");
			Network.Disconnect();
			Application.LoadLevel(0);
			print("Se desconecto el cliente");
			}else{
				Network.Disconnect();
				Application.LoadLevel(0);
				print("Se desconecto el servidor");
			}
	}
   	//GUI.Label (Rect (10,10,40,40), playerName, style);
	//nombreText.text = playerName;

   	if(Network.isServer || Network.isClient){
   	text = String.Format ("Tiempo: {0:00}:{1:00}:{2:000}", minutes, seconds, fraction); //codifica el formato tiempo
	//GUI.Label (Rect (400, 10, 100, 30), text, style); 
	//mostrarnos el tiempo en consola
	//print(text);
	if(minutes == 1 && seconds == 0){
		GUI.Box(Rect(Screen.width/4+0,Screen.height/2-30,450,50), "");
		GUI.Label(Rect(Screen.width/4+10,Screen.height/2-25,285,150), "¡1 Minuto!");
		}
		if(minutes == 1 && seconds == 10){
		}
	}
}





