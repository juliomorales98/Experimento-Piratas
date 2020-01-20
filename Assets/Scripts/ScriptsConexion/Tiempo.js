/*#pragma strict

var Tiempo : float = 0.0;
var Retardo : float = 1.0;  //(1 segundo)

var contador : int = 180;

function Update () {
     this.guiText.text = contador.ToString();
    
     if(Tiempo <= Time.realtimeSinceStartup){

         contador-- ;
         Tiempo = Time.realtimeSinceStartup + Retardo;

     }

    if (contador <= 0){
        contador = 180;
    }
}*/