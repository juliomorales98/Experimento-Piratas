using UnityEngine;
using System.Collections;


public class ControlBasico2: MonoBehaviour {
	public Animator anim;
	
	private float adelante;
	private float lado;
	private float ratonx;
	private float ratony;
	
	public enum RotationAxes { MouseXAndY = 0, MouseX = 1, MouseY = 2 }
	public RotationAxes axes = RotationAxes.MouseXAndY;
	public float sensitivityX = 15F;
	public float sensitivityY = 15F;
	
	public float minimumX = -360F;
	public float maximumX = 360F;
	
	public float minimumY = -60F;
	public float maximumY = 60F;
	
	float rotationY = 0F;
	//	private ThirdPersonCamera camera;
	
	
	
	void start()
	{
		//Inicializacion de valores de la animacion
		anim.SetBool("Adelante",false);
		//anim.SetBool("vuelta",false);
		anim.SetBool("Abajo",false);
		anim.SetBool("Arriba",false);
		anim.SetBool("Izquierda",false);
		anim.SetBool("Derecha",false);
		anim.SetFloat("Direccion",0);
		anim.SetBool("Atras",false);
		
		
		if (GetComponent<Rigidbody>())
			GetComponent<Rigidbody>().freezeRotation = true;
	}
	// Update is called once per frame
	void Update () {

		if( !GetComponent<NetworkView>().isMine ) 
			this.enabled = false;
		
		// obtener si presionan adelante o a un lado
		adelante = Input.GetAxis("Vertical");
		lado = Input.GetAxis ("Horizontal");

		ratonx = Input.mousePosition.x;
		ratony = Input.mousePosition.y;
		
		if(lado !=0)
		{	
			//anim.SetBool("vuelta",true);
			anim.SetFloat ("Direccion", lado);
			
			//networkView.RPC ("animationBool", RPCMode.Others, "vuelta", true);
			//networkView.RPC ("animationFloat", RPCMode.All, "Direccion", lado);
			//networkView.RPC ("Vuelta", RPCMode.All, lado);

		}
		else 
		{
			float temp = 0;
			//anim.SetBool ("vuelta",false);
			anim.SetFloat ("Direccion",temp);
			
			//networkView.RPC ("animationBool", RPCMode.Others, "vuelta", false);
			GetComponent<NetworkView>().RPC ("animationFloat", RPCMode.All, "direccion", temp);
		}
		
		//si presionan adelante puede caminar
		if(adelante > 0)
		{
			//anim.SetBool("vuelta",false);
			anim.SetBool("Atras",false);
			anim.SetBool("Adelante",true); 
			
			//This is new and experimental
			//networkView.RPC ("animationBool", RPCMode.Others, "vuelta", false);//changed all the rpcs in this server to server instead of others
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Atras", false);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Adelante", true);

			if(lado > 0.1 || lado < 0.1)
			{
				anim.SetFloat ("Direccion", lado);
				GetComponent<NetworkView>().RPC ("animationFloat", RPCMode.All, "Direccion", lado);
			}
		}
		else if(adelante == 0)
		{
			anim.SetBool ("Adelante",false); // cositas pasan aqui, cositas buenas.
			anim.SetBool ("Atras",false);


			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Adelante", false);//also changed, see comment above
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Atras", false);
		}
		else
		{
			//	Debug.Log ("Caminar hacia atras");
			anim.SetBool("Atras", true);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Atras", true);

		}
		if (axes == RotationAxes.MouseXAndY)
		{
			float rotationX = transform.localEulerAngles.y + Input.GetAxis("Mouse X") * sensitivityX;
			
			rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
			rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
			
			transform.localEulerAngles = new Vector3(-rotationY, rotationX, 0);
			transform.localEulerAngles = new Vector3(0, rotationX, 0);
			
			//			head.Rotate(0, Input.GetAxis("Mouse X") * sensitivityX, 0);
			transform.LookAt(Input.mousePosition);
			transform.LookAt(Input.mousePosition);
		}
		else if (axes == RotationAxes.MouseX )
		{
			transform.Rotate(0, Input.GetAxis("Mouse X") * sensitivityX, 0);
			
			//			head.Rotate(0, Input.GetAxis("Mouse X") * sensitivityX, 0);
		}
		
		
		if(ratony > (Screen.height - 100))
		{
			anim.SetBool ("Arriba",true);
			anim.SetBool ("Abajo", false);
			anim.SetBool ("Izquierda",false);
			anim.SetBool ("Derecha",false);
			
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Arriba", true);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Abajo", false);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Izquierda", false);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Derecha", false);
		}
		else if(ratony < 100)
		{
			anim.SetBool ("Abajo",true);
			anim.SetBool ("Arriba",false);
			anim.SetBool ("Izquierda",false);
			anim.SetBool ("Derecha",false);
			
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Abajo", true);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Arriba", false);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Izquierda", false);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Derecha", false);
		}
		else if(ratonx < 250)
		{
			anim.SetBool ("Abajo",false);
			anim.SetBool ("Arriba",false);
			anim.SetBool ("Izquierda",true);
			anim.SetBool ("Derecha",false);
			
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Abajo", false);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Arriba", false);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Izquierda", true);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Derecha", false);
		}
		else if(ratonx > Screen.width -250)
		{
			anim.SetBool ("Abajo",false);
			anim.SetBool ("Arriba",false);
			anim.SetBool ("Izquierda",false);
			anim.SetBool ("Derecha",true);
			
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Abajo", false);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Arriba", false);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Izquierda", false);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Derecha", true);
		}
		else
		{
			anim.SetBool ("Abajo",false);
			anim.SetBool ("Arriba",false);
			anim.SetBool ("Izquierda",false);
			anim.SetBool ("Derecha",false);
			
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Abajo", false);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Arriba", false);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Izquierda", false);
			GetComponent<NetworkView>().RPC ("animationBool", RPCMode.All, "Derecha", false);
		}
	}
	
	[RPC]
	void animationBool ( string animationName, bool state) {
		anim.SetBool (animationName,state);
	}
	
	[RPC]
	void animationFloat ( string animationName, float direction) {
		anim.SetFloat (animationName,direction);
	}


}