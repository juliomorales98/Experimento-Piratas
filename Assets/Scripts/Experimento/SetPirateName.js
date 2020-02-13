#pragma strict

import UnityEngine.UI;

var pirateText : Text;

function Start () {
   
    var nombrePirata : String;

    switch(CharacterSelector.getSelected())
		{
            case 1:				
				nombrePirata = "Pirata 1";
				break;
			case 2:				
				nombrePirata = "Pirata 2";
				break;
			case 3:				
				nombrePirata = "Pirata 3";
				break;				
			case 4:				
				nombrePirata = "Pirata 4";
                break;	
            default:
                Debug.Log("No se seleccionó ningún pirata");
                return;
				
        }
        
    pirateText.text = nombrePirata;
    Debug.Log("Puso nombre de pirata");
}


