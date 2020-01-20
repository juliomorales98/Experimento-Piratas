using UnityEngine;

public class Manipulador : MonoBehaviour {
   
   //Update
   void Update () {
		
        //Creamos el rayo y obtenemos su punto de salida
        Ray Rayo = Camera.main.ScreenPointToRay(Input.mousePosition);
        //Con esto comprobaremos la colisión del rayo
        RaycastHit RayoColision;
        //Mover el objeto:
        //"Rayo" es la posición inicial del rayo, "RayoColision" la dirección en
        //la que va el rayo y con lo que obtendremos contra qué estamos colisionando,
        //y el 100 es la longitud que tendrá el rayo
        if (Physics.Raycast(Rayo, out RayoColision, 100))
        {
            //Comprobamos si nuestro rayo colisiona contra un objeto manipulable:
            if (RayoColision.collider.gameObject.tag == "Manipulador")
            {
                //Si hacemos clic izquierdo, podremos mover el objeto:
                if (Input.GetMouseButton(0))
                {
                    //Si colisiona contra un objeto manipulable, movemos el objeto en la
                    //posición del ratón.
                    //Primero, guardamos el objeto contra el que hemos colisionado
                    GameObject Manipulador = RayoColision.collider.gameObject;
					System.String nombre= Manipulador.name;
					Debug.Log("NOMBRE DE OBJETO " + nombre);
                    //Ahora, lo moveremos a la posición del ratón
                    //Primero, guardaremos la posición Z del objeto para poder utilizarla más fácilmente:
                    float ObjetoZ = Manipulador.transform.position.z; //Posición Z del objeto
                    //Ahora aplicamos el movimiento en el objeto, es sencillo:
                    //Le decimos que la posición del objeto manipulado, sea la del punto en el que
                    //impacta el rayo:
                    //Manipulador.transform.position = new Vector3(RayoColision.point.x, RayoColision.point.y, ObjetoZ);
                    Manipulador.transform.position = new Vector3(RayoColision.point.x, RayoColision.point.y, ObjetoZ);
                    //Como ves, la coordenada Z de la posición no la tocamos, esto es para
                    //que el objeto solo pueda moverse en horizontal y vertical
            		GetComponent<NetworkView>().RPC ("PrintText", RPCMode.AllBuffered, "Moviendo Aldo");
					GetComponent<NetworkView>().RPC ("mover", RPCMode.AllBuffered, Manipulador.transform.position, nombre);
                }
            }
        }
   }
	[RPC]
	void PrintText (System.String text)
	{
   	 Debug.Log(text);
	}
	[RPC]
	void mover(Vector3 Transformado, System.String nombre){
		Debug.Log("OBJETO RECIBIDO " + nombre);
		GameObject.Find(nombre).transform.position= Transformado;
	}
}
  