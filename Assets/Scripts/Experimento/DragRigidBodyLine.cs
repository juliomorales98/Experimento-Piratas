using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;

public class DragRigidBodyLine : MonoBehaviour {

	private float spring;
	private float damper;
	private float drag;
	private float angularDrag;
	private float distance;
	private float pushForce;
	private bool attachToCenterOfMass;

	[SerializeField] private Transform hand;
	[SerializeField] private Material mat;
	[SerializeField] private LineRenderer line;
	[SerializeField] private Material highlightMaterial;
	[SerializeField] private Text pirateName;

	private GameObject highlightObject;
	private SpringJoint springJoint;

	private PhotonView PV;

	private bool setPiece;

	void Start(){
		spring = 0.0f;
		damper = 5.0f;
		drag = 10.0f;
		angularDrag = 5.0f;
		distance = 0.2f;
		pushForce = 0.2f;
		attachToCenterOfMass = false;

		line.enabled = false;
		line.material = mat;

		line.SetWidth(0.05f, 0.05f);

		pirateName = GameObject.Find("Pirate Name").GetComponent<Text>();

		PV = GetComponent<PhotonView>();
	}

	void Update(){
		Camera mainCamera = FindCamera();

		if(pirateName == null){
			pirateName = GameObject.Find("Pirate Name").GetComponent<Text>();
		}

		highlightObject = null;
		if (springJoint != null && springJoint.connectedBody != null) {
			highlightObject = springJoint.connectedBody.gameObject;
		}else{
			// We need to actually hit an object
			RaycastHit hitt;

			if (Physics.Raycast(mainCamera.ScreenPointToRay(Input.mousePosition), out hitt, 100)) {

				if (hitt.rigidbody && !hitt.rigidbody.isKinematic) {
					highlightObject = hitt.rigidbody.gameObject;

				}
			}
		}

		// Make sure the user pressed the mouse down
		if (!Input.GetMouseButtonDown(0)) {
			//line.enabled = false;
			return;
		}


		// We need to actually hit an object
		RaycastHit hit;
		if (!Physics.Raycast(mainCamera.ScreenPointToRay(Input.mousePosition), out hit, 100)) {
			//	line.enabled = false;
			return;
		}

		if(pirateName.text == "Pirata 2"){
			Debug.Log(hit.rigidbody);
			if(hit.rigidbody != null && (hit.rigidbody.name == "Proa_Prefab" || hit.rigidbody.name == "Popa_Prefab"
			|| hit.rigidbody.name == "CubiertaDesdePopa_Prefab" || hit.rigidbody.name == "CubiertaDesdeProa_Prefab")) {
				Debug.Log("No se pueden cargar piezas grandes con este pirata");
				return;
			}
			
		}

		// We need to hit a rigidbody that is not kinematic
		if (!hit.rigidbody) {
			return;
		}
		if (hit.rigidbody.isKinematic) {
			//si el cubo es Kinematic se le quita eso para poderlo mover con el mouse
			hit.rigidbody.isKinematic = false;
			//	networkView.RPC("sendFisica", RPCMode.Others , hit.rigidbody, 0);
		}

		if (!springJoint) {

			var go = new GameObject("Rigidbody dragger");


			Rigidbody body = go.AddComponent(typeof(Rigidbody)) as Rigidbody;
			springJoint = go.AddComponent(typeof(SpringJoint)) as SpringJoint;
			body.isKinematic = true;
			//	networkView.RPC("sendFisica", RPCMode.Others , body,1);
			//PV.RPC("sendFisica", RpcTarget.AllBuffered , body,1);
			//Debug.Log("se creo la variable go" + body.transform.position);
		}

		springJoint.transform.position = hit.point;
		if (attachToCenterOfMass) {
			var anchor = transform.TransformDirection(hit.rigidbody.centerOfMass) + hit.rigidbody.transform.position;
			anchor = springJoint.transform.InverseTransformPoint(anchor);
			springJoint.anchor = anchor;
		}
		else {
			springJoint.anchor = Vector3.zero;
		}

		springJoint.spring = spring;
		springJoint.damper = damper;
		springJoint.maxDistance = distance;
		springJoint.connectedBody = hit.rigidbody;

		
		//Validamos que el objeto esté dentro de un rango determinado
		if(hit.distance >= 16){
			Debug.Log("Objeto demasiado lejos");
			return;
		}
		
		DragObject(hit.distance, hit.point, mainCamera.ScreenPointToRay(Input.mousePosition).direction);


	}

	//function getCamera();
	private Camera FindCamera(){
		return transform.GetChild(0).GetComponent<Camera>();
	}

	private void DragObject(float distance, Vector3 hitpoint, Vector3 dir){
		var startTime = Time.time;
		var mousePos = Input.mousePosition;
		var oldDrag = springJoint.connectedBody.drag;
		var oldAngularDrag = springJoint.connectedBody.angularDrag;

		springJoint.connectedBody.drag = drag;
		springJoint.connectedBody.angularDrag = angularDrag;
		var mainCamera = FindCamera();
		springJoint.connectedBody.freezeRotation = true;

		while (Input.GetMouseButton(0)) {
			//se habilita la linea para que sea visible
			line.enabled = true;
			//	var line : LineRenderer;

			var ray = mainCamera.ScreenPointToRay(Input.mousePosition);
			Debug.DrawRay(ray.origin, ray.direction * 15, Color.yellow);
			springJoint.transform.position = ray.GetPoint(distance);

			if(PV.IsMine){
				if (Input.GetKey(KeyCode.Z)) {
					//llamar a la funcion rotacion
					Rotacion(1, springJoint.connectedBody);
				}
				if (Input.GetKey(KeyCode.X)) {
					//llamar a la funcion rotacion
					Rotacion(2, springJoint.connectedBody);
				}

				springJoint.connectedBody.isKinematic = false;
            	//		networkView.RPC("sendFisica", RPCMode.Others , springJoint.connectedBody,0);
            	//PV.RPC("sendFisica", RpcTarget.AllBuffered , springJoint.connectedBody,0);
            	springJoint.connectedBody.useGravity = true;
            	if(Input.GetKey(KeyCode.C))
                {
                    //llamar a la funcion rotacion
                    springJoint.connectedBody.isKinematic = true;;
                }

				//Inicio hand.position fin objeto que esta agarrando
				line.SetPosition(0, hand.position);
				//line.SetPosition(1, springJoint.transform.position);
				line.SetPosition(1, springJoint.connectedBody.position);
				//se envia RPC para que los demas vean la linea
				//GetComponent.<NetworkView>().RPC("sendLine", RPCMode.Others, 1, hand.position, springJoint.connectedBody.position);
				PV.RPC("sendLine", RpcTarget.AllBuffered, 1, hand.position, springJoint.connectedBody.position);
				sendLine(1, hand.position, springJoint.connectedBody.position);
			}else {
				//se envia RPC con 0 para deshabilitar la linea
				//GetComponent.<NetworkView>().RPC(" ", RPCMode.Others, 0, new Vector3(0, 0, 0), new Vector3(0, 0, 0));
				PV.RPC("sendLine", RpcTarget.AllBuffered, 0, new Vector3(0, 0, 0), new Vector3(0, 0, 0));
				
            }

			//rigidbody.constraints = RigidbodyConstraints.FreezeRotation;//This is new and junk! God damn it, it dont work!!
			//yield;

			//Agregamos línea para poner como kinematic la pieza y salimos del while
			setPiece = false;
			if(Input.GetMouseButton(1)){
				springJoint.connectedBody.isKinematic = true;
				setPiece = true;
				break;
			}
		}

		//Al dejar de presionar el mouse se deshabilita la linea
    	line.enabled = false;

		//Se envia RPC para deshabilitar la linea
		//GetComponent.<NetworkView>().RPC("sendLine", RPCMode.Others, 0, new Vector3(0, 0, 0), new Vector3(0, 0, 0));
		PV.RPC("sendLine", RpcTarget.AllBuffered, 0, new Vector3(0, 0, 0), new Vector3(0, 0, 0));
		sendLine(0, new Vector3(0, 0, 0), new Vector3(0, 0, 0));
		if (Network.isClient) {
			//GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("DraggingBox", RPCMode.Others, name, springJoint.connectedBody.name);
		}
		else {
			//Comentamos esta parte ya que si se hace click con el mouse lo truena
			/*var scriptObject: GameObject = GameObject.FindWithTag("General");
			var script: Logger = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
			script.DraggingBox(name, springJoint.connectedBody.name);*/
		}

		//Si se acomodó la pieza no se le ponen valores de caída.
		if(setPiece)
			return;

		

		springJoint.connectedBody.freezeRotation = false;
		Rigidbody cubo;
		if (springJoint.connectedBody) {
			//the cube fall speed
			/*springJoint.connectedBody.drag = oldDrag;
			springJoint.connectedBody.angularDrag = oldAngularDrag;*/
			cubo = springJoint.connectedBody;
			springJoint.connectedBody.drag = 0;
			springJoint.connectedBody = null;
		}
	}

	private void Rotacion(int numero, Rigidbody body){
		body.isKinematic = true;
		//networkView.RPC("sendFisica", RPCMode.Others , body,1);
		//PV.RPC("sendFisica", RpcTarget.AllBuffered , body,1);
		if (numero == 1)
			body.transform.rotation *= Quaternion.AngleAxis(4, new Vector3(0, 1, 0));
		else
			body.transform.rotation *= Quaternion.AngleAxis(4, new Vector3(1, 0, 0));
	}

	private static void ToggleLight(GameObject go){
		//var theLight: Light = go.GetComponentInChildren(Light);
		Light theLight = go.GetComponentInChildren<Light>();

		if (!theLight)
			return;

		theLight.enabled = !theLight.enabled;
		var illumOn = theLight.enabled;

		MeshRenderer[] renderers = go.GetComponentsInChildren<MeshRenderer>();

		foreach (MeshRenderer r in renderers) {
			if (r.gameObject.layer == 1) {
				r.material.shader = Shader.Find(illumOn ? "Self-Illumin/Diffuse" : "Diffuse");
			}
		}
	}

	void OnPostRender(){
		if (highlightObject == null)
        return;

		var go = highlightObject;
		highlightMaterial.SetPass(0);
		MeshFilter[] meshes = go.GetComponentsInChildren<MeshFilter>();
		
		foreach(MeshFilter m  in meshes) {
			Graphics.DrawMeshNow(m.sharedMesh, m.transform.position, m.transform.rotation);
		}
	}

	[PunRPC]
	private void sendLine(int habilitado, Vector3 inicio, Vector3 fin){
		if (habilitado == 1)
			line.enabled = true;
		else
			line.enabled = false;

		line.SetPosition(0, inicio);
		line.SetPosition(1, fin);
	}

}
