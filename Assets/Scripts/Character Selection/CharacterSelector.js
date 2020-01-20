#pragma strict

static var currentObject : GameObject;
static var playerSelected : int = 0;

//these are simply pieces of geometry with an alpha texture on them. 
//You can create any kind of glow geometry to fit your character, vehicle, etc.
var character1Glow : GameObject;
var character2Glow : GameObject;
var character3Glow : GameObject;
var character4Glow : GameObject;

function Start()
{
character1Glow.GetComponent.<Renderer>().enabled = false;  // We're going to make sure all of the highlighted glows are OFF at scene start.
character2Glow.GetComponent.<Renderer>().enabled = false;
character3Glow.GetComponent.<Renderer>().enabled = false;
character4Glow.GetComponent.<Renderer>().enabled = false;
playerSelected = 0;
}

function Update() 
{ 
if (Input.GetMouseButtonUp (0)) {
	var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	var hit : RaycastHit;
	
	if (Physics.Raycast (ray, hit, 100))
		{
				// The pink text is where you would put the name of the object you want to click on (has attached collider).
				
	            if(hit.collider.name == "_Character1") 
				SelectedCharacter1(); //Sends this click down to a function called "SelectedCharacter1(). Which is where all of our stuff happens.
			
				if(hit.collider.name == "_Character2")
				SelectedCharacter2();
					
				if(hit.collider.name == "_Character3")
				SelectedCharacter3();
		
				if(hit.collider.name == "_Character4")
				SelectedCharacter4();
		} 
            
	} 
}

function SelectedCharacter1() {
				//Debug.Log ("Character 1 SELECTED"); //Print out in the Unity console which character was selected.
				playerSelected = 1;
				
				character1Glow.GetComponent.<Renderer>().enabled = true; //these lines turn on or off the appropriate character glow.
				character2Glow.GetComponent.<Renderer>().enabled = false;
				character3Glow.GetComponent.<Renderer>().enabled = false;
				character4Glow.GetComponent.<Renderer>().enabled = false; 
}

function SelectedCharacter2() {
				//Debug.Log ("Character 2 SELECTED");
				playerSelected = 2;
				character2Glow.GetComponent.<Renderer>().enabled = true;
				character1Glow.GetComponent.<Renderer>().enabled = false;
				character3Glow.GetComponent.<Renderer>().enabled = false;
				character4Glow.GetComponent.<Renderer>().enabled = false;
}

function SelectedCharacter3() {
				//Debug.Log ("Character 3 SELECTED");
				playerSelected = 3;
				character3Glow.GetComponent.<Renderer>().enabled = true;
				character1Glow.GetComponent.<Renderer>().enabled = false;
				character2Glow.GetComponent.<Renderer>().enabled = false;
				character4Glow.GetComponent.<Renderer>().enabled = false;
}

function SelectedCharacter4() {
				//Debug.Log ("Character 4 SELECTED");
				playerSelected = 4;
				character4Glow.GetComponent.<Renderer>().enabled = true;
				character3Glow.GetComponent.<Renderer>().enabled = false;
				character2Glow.GetComponent.<Renderer>().enabled = false;
				character1Glow.GetComponent.<Renderer>().enabled = false;
}

public static function getSelected()
{
	//Debug.Log("selectedPlayer = "+playerSelected);
	return playerSelected;
}