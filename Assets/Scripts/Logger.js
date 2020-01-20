#pragma strict
import System.IO;
import System.Security.Permissions;

//Todos las posiciones de los cubos en la escena TODO: print to file only if characer clicks or moves, their names times and final position of the cube he moved.
public var Rojo1 : Transform;
public var Rojo2 : Transform;
public var Rojo3 : Transform;
public var Rojo4 : Transform;
public var Rojo5 : Transform;
public var Rojo6 : Transform;
public var Rojo7 : Transform;
public var Rojo8 : Transform;
public var Rojo9 : Transform;

public var Verde1 : Transform;
public var Verde2 : Transform;
public var Verde3 : Transform;
public var Verde4 : Transform;
public var Verde5 : Transform;
public var Verde6 : Transform;
public var Verde7 : Transform;
public var Verde8 : Transform;
public var Verde9 : Transform;

public var fileName : String = "C:\\LogJuego.txt";
var fs : StreamWriter;
var stream : FileStream;
var filePermissions : FileIOPermission;

public static var band : float = 0;

private var x : String;
private var y : String;
private var z : String;

private var time : System.DateTime;
var players : GameObject[];
private var tmp : String;

var boxClicked : boolean = false;
var boxDragged : boolean = false;

var boxClickedText : String = "";
var boxDraggedText : String = "";

var displayedTime : boolean = false;

var playersInSight : boolean = false;
var playersInSightText : String = "";

// Use this for initialization
function Start ()
{
	if (!Network.isServer){ //you are not the server, quit
		this.enabled = false;
	}
	//else { //you are the server, congrats now do your job
		
		/*
		var swr : StreamWriter = new StreamWriter(fileName, true);
	    var time : System.DateTime = System.DateTime.Now;
	    swr.Write(time.ToShortTimeString());
	    swr.Flush();
	    swr.Close();
	    swr.Dispose();
	    */
    //}	
}



// Update is called once per frame
function Update ()
{
	filePermissions = new FileIOPermission( FileIOPermissionAccess.AllAccess, fileName);
	stream  = new FileStream(fileName, FileMode.Append, FileAccess.Write, FileShare.ReadWrite);
	fs = new StreamWriter(stream);
	
	
	//var numOfConnectedPlayers = Network.connections.Length;//use to check how many players are there
	
	players = GameObject.FindGameObjectsWithTag("Player");
	for( var i : int = 0; i <= /*numOfConnectedPlayers*/players.Length - 1; i++) {//changed 1 to 0
		if (players[i].GetComponent(MovementChecker).isMoving) {
			
			time = System.DateTime.Now;
			fs.WriteLine("Moviendose a las: " + time.ToShortTimeString());
			filePermissions.Demand();
			fs.Flush();
			displayedTime = true;
			
			x =	players[i].transform.position.x.ToString();
			y = players[i].transform.position.y.ToString();
			z =	players[i].transform.position.z.ToString();
			
			x = x.Substring(0, x.IndexOf('.') + 2);
			y = y.Substring(0, y.IndexOf('.') + 2);
			z = z.Substring(0, z.IndexOf('.') + 2);
			
			tmp = tmp + " " + players[i].name + " P.A.;" + " Eje X: " + x + "; Eje Y: " + y + "; Eje Z: " + z + "; ";
			fs.WriteLine(tmp);
			filePermissions.Demand();
			fs.Flush();
			tmp = "";
		}
	}
	
	if( boxClicked) {
		if(!displayedTime) {
			time = System.DateTime.Now;
			fs.WriteLine("Se selecciono a las: " + time.ToShortTimeString());
			filePermissions.Demand();
			fs.Flush();
			
			displayedTime = true;
		}
		fs.WriteLine(boxClickedText);
		filePermissions.Demand();
		fs.Flush();
	}
	boxClicked = false;
	
	if( boxDragged) {
		if(!displayedTime) {
			time = System.DateTime.Now;
			fs.WriteLine("Se movio a las: " + time.ToShortTimeString());
			filePermissions.Demand();
			fs.Flush();
			
			displayedTime = true;
		}
		fs.WriteLine(boxDraggedText);
		filePermissions.Demand();
		fs.Flush();
	}
	boxDragged = false;
	
	if(playersInSight) {
		if(!displayedTime) {
			time = System.DateTime.Now;
			fs.WriteLine("TIEMPO: " + time.ToShortTimeString());
			filePermissions.Demand();
			fs.Flush();
			
			displayedTime = true;
		}
		fs.WriteLine(playersInSightText);
		filePermissions.Demand();
		fs.Flush();
	}
	playersInSight = false;
	
	fs.Close();
	fs.Dispose();
	
	stream.Close();
	stream.Dispose();
	displayedTime = false;
}

@RPC
function ClickedBox (player : String, boxName : String) {
	boxClicked = true;
	boxClickedText = (player + " selecciono " + boxName);
}

/*
function ClickedBox4Server (player : String, boxName : String) {
	boxClicked = true;
	boxClickedText = (player + " clicked on " + boxName);
}
*/

@RPC
function DraggingBox (player : String, boxName : String) {
	var boxTransform : String;
	var boxPosition : Transform;
	boxPosition = boxCompare(boxName);
	
	//Debug.Log("Box compare is " + boxPosition);//changed 
	
	boxTransform = ("X: " + boxPosition.transform.position.x + ", Y: " + boxPosition.transform.position.y + ", Z: " + boxPosition.transform.position.z);
	boxDragged = true;
	
	boxDraggedText = (player + ": Movio " + boxName + " a: " + boxTransform);
}

/*
function DraggingBox4Server (player : String, boxName : String) {
	var boxTransform : String;
	var boxPosition : Transform;
	boxPosition = boxCompare(boxName);
	
	//Debug.Log("Box position is " + boxPosition.position);
	
	boxTransform = ( "(" + boxPosition.transform.position.x + "," + boxPosition.transform.position.y + "," + boxPosition.transform.position.z + ")" );
	boxDragged = true;
	
	boxDraggedText = (player + " is dragging box " + boxName + " to " + boxTransform);
}
*/

function boxCompare( boxName : String) : Transform {
	//Debug.Log("Im inside boxCompare!");
	switch(boxName) {
		case "Rojo1" :
			return Rojo1.transform;
			break;
			
		case "Rojo2" :
			return Rojo2.transform;
			break;
			
		case "Rojo3" :
			return Rojo3.transform;
			break;
			
		case "Rojo4" :
			return Rojo4.transform;
			break;
			
		case "Rojo5" :
			return Rojo5.transform;
			break;	
			
		case "Rojo6" :
			return Rojo6.transform;
			break;
			
		case "Rojo7" :
			return Rojo7.transform;
			break;
			
		case "Rojo8" :
			return Rojo8.transform;
			break;
		
		case "Rojo9" :
			return Rojo9.transform;
			break;
			
		case "Verde1" :
			return Verde1.transform;
			break;
			
		case "Verde2" :
			return Verde2.transform;
			break;
			
		case "Verde3":
			return Verde3.transform;
			break;
			
		case "Verde4" :
			return Verde4.transform;
			break;
	
		case "Verde5" :
			return Verde5.transform;
			break;
			
		case "Verde6" :
			return Verde6.transform;
			break;
		
		case "Verde7" :
			return Verde7.transform;
			break;
			
		case "Verde8" :
			return Verde8.transform;
			break;
			
		case "Verde9" :
			return Verde9.transform;
			break;
			
		default:
			Debug.Log("Error: Box not recognized!");
			break;
	}
}


@RPC
function Viewer(playerName : String, targetPlayer : String) {
	Debug.Log(playerName + " can see " + targetPlayer + "!!!");
	playersInSight = true;
	playersInSightText = ( playerName + " can see " + targetPlayer );
	//need some way to interact with update so it can get itself printed in the file.
}
