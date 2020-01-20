// JavaScript
function OnGUI () {
	// Make a background box Rect(left,top, widith, height);
	GUI.Box (Rect (10,10,150,130), "Load Level");

	// Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
	if (GUI.Button (Rect (20,40,120,100), "cargar") && CharacterSelector.getSelected() != 0)
	{
		Application.LoadLevel ("Experimento");
	}
}