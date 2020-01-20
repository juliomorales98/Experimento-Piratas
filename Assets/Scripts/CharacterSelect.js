//this is the currently selected Player. Also the one that will be saved to PlayerPrefs

static var selectedPlayer : int = 0;
var camara : Camera;
function OnStart()
{
	//gameObject.Find("Player").GetComponent(ThirdPersonCamera).enabled=false;
	//gameObject.Find("Player2").GetComponent(ThirdPersonCamera).enabled=false;
	gameObject.Find("Player3").GetComponent(ThirdPersonCamera).enabled=false;
}



function Update() 
{ 
if (Input.GetMouseButtonUp (0)) {
	var ray = camara.ScreenPointToRay (Input.mousePosition);
	var hit : RaycastHit;
	
	
	if (Physics.Raycast (ray, hit, 100))
		{
				// The pink text is where you would put the name of the object you want to click on (has attached collider).
				
	            if(hit.collider.name == "Player") 
	            {
	            	Debug.Log ("Character 1 SELECTED");
					selectedPlayer = 1; //Sends this click down to a function called "SelectedCharacter1(). Which is where all of our stuff happens.
				}
				if(hit.collider.name == "Player2")
				{
					Debug.Log ("Character 2 SELECTED");
					selectedPlayer=2;
				}	
				if(hit.collider.name == "Player3")
				{
					Debug.Log ("Character 3 SELECTED");
					selectedPlayer=3;
				}
		} 
		else
		{
			return;               
		}
	}
	 
}
public static function getSelected()
{
	Debug.Log("selectedPlayer = "+selectedPlayer);
	return selectedPlayer;
}