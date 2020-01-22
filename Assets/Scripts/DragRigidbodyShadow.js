//TODO: Stop rotation of the rigidbody on click, so cam and model stay in rotational-sync

import UnityEngine;
import UnityEngine.UI;




var spring = 0.0; //50 5
var damper = 5.0;
var drag = 10.0;
var angularDrag = 5.0;
var distance = 0.2;
var pushForce = 0.2;
var attachToCenterOfMass = false;

var hand: Transform;
var mat: Material;
var line: LineRenderer;

var highlightMaterial: Material;

var pirateName : Text;

private var highlightObject: GameObject;
private var springJoint: SpringJoint;

function Start() {

    line.enabled = false;
    line.material = mat;
    //	line.SetColors(c1,c2);
    line.SetWidth(0.05, 0.05);

    pirateName = GameObject.Find("Pirate Name").GetComponent(Text);
}

function Update() {
    var mainCamera = FindCamera();

    if(pirateName == null){
        pirateName = GameObject.Find("Pirate Name").GetComponent(Text);
    }

    highlightObject = null;
    if (springJoint != null && springJoint.connectedBody != null) {
        highlightObject = springJoint.connectedBody.gameObject;
    }
    else {
        // We need to actually hit an object
        var hitt: RaycastHit;
        if (Physics.Raycast(mainCamera.ScreenPointToRay(Input.mousePosition), hitt, 100)) {
            if (hitt.rigidbody && !hitt.rigidbody.isKinematic) {
                highlightObject = hitt.rigidbody.gameObject;

                //		Debug.Log("encontro un objeto");
            }
        }
    }

    // Make sure the user pressed the mouse down
    if (!Input.GetMouseButtonDown(0)) {
        //line.enabled = false;
        return;
    }

    // We need to actually hit an object
    var hit: RaycastHit;
    if (!Physics.Raycast(mainCamera.ScreenPointToRay(Input.mousePosition), hit, 100)) {
        //	line.enabled = false;
        return;
    }

    //If we are pirate 2 and we hit Rojo 3 or Verde7
    if(pirateName.text == "Pirata 2"){
       Debug.Log(hit.rigidbody);
       if(hit !=null && (hit.rigidbody.name == "Rojo3" || hit.rigidbody.name == "Verde7")) {
        Debug.Log("Verde7 o Rojo 3, no se puede cargar");
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

    if (Network.isClient) {
        GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("ClickedBox", RPCMode.Others, name, hitt.rigidbody.gameObject.name);
    }
    else {
        var scriptObject: GameObject = GameObject.FindWithTag("General");
        var script: Logger = scriptObject.gameObject.GetComponent("Logger").scriptObject; //THIS IS THE PROBLEM LINE! Reference is null

    }

    if (!springJoint) {

        var go = new GameObject("Rigidbody dragger");


        body = go.AddComponent.<Rigidbody>();
        springJoint = go.AddComponent.<SpringJoint>();
        body.isKinematic = true;
        //	networkView.RPC("sendFisica", RPCMode.Others , body,1);
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

function DragObject(distance: float, hitpoint: Vector3, dir: Vector3) {
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
        if (GetComponent.<NetworkView>().isMine) {
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
            springJoint.connectedBody.useGravity = true;
            /*			if(Input.GetKey(KeyCode.C))
                        {
                            //llamar a la funcion rotacion
                            springJoint.connectedBody.isKinematic = true;;
                        }*/



            //Inicio hand.position fin objeto que esta agarrando
            line.SetPosition(0, hand.position);
            //line.SetPosition(1, springJoint.transform.position);
            line.SetPosition(1, springJoint.connectedBody.position);
            //se envia RPC para que los demas vean la linea
            GetComponent.<NetworkView>().RPC("sendLine", RPCMode.Others, 1, hand.position, springJoint.connectedBody.position);
        }
        else {
            //se envia RPC con 0 para deshabilitar la linea
            GetComponent.<NetworkView>().RPC("sendLine", RPCMode.Others, 0, new Vector3(0, 0, 0), new Vector3(0, 0, 0));
        }

        //rigidbody.constraints = RigidbodyConstraints.FreezeRotation;//This is new and junk! God damn it, it dont work!!
        yield;
    }

    //Al dejar de presionar el mouse se deshabilita la linea
    line.enabled = false;
    //Se envia RPC para deshabilitar la linea
    GetComponent.<NetworkView>().RPC("sendLine", RPCMode.Others, 0, new Vector3(0, 0, 0), new Vector3(0, 0, 0));
    if (Network.isClient) {
        GameObject.FindGameObjectWithTag("General").GetComponent(NetworkView).RPC("DraggingBox", RPCMode.Others, name, springJoint.connectedBody.name);
    }
    else {
		//Comentamos esta parte ya que si se hace click con el mouse lo truena
        /*var scriptObject: GameObject = GameObject.FindWithTag("General");
        var script: Logger = scriptObject.gameObject.GetComponent(Logger); //THIS IS THE PROBLEM LINE! Reference is null
        script.DraggingBox(name, springJoint.connectedBody.name);*/
    }

    //rigidbody.constraints = RigidbodyConstraints.Nones;//This is also new and junk!



    //works fine whitout this
    /*	if (Mathf.Abs(mousePos.x - Input.mousePosition.x) <= 2 && Mathf.Abs(mousePos.y - Input.mousePosition.y) <= 2 && Time.time - startTime < .2 && springJoint.connectedBody)
        {
            dir.y = 0;
            dir.Normalize();
            springJoint.connectedBody.AddForceAtPosition(dir * pushForce, hitpoint, ForceMode.VelocityChange);
            ToggleLight( springJoint.connectedBody.gameObject );
        }	*/

    springJoint.connectedBody.freezeRotation = false;
    var cubo: Rigidbody;
    if (springJoint.connectedBody) {
        //the cube fall speed
		/*springJoint.connectedBody.drag = oldDrag;
		springJoint.connectedBody.angularDrag = oldAngularDrag;*/
        cubo = springJoint.connectedBody;
        springJoint.connectedBody.drag = 0;
        springJoint.connectedBody = null;
    }
    //esperar 2 segundos y despues se vuelve Kinematic el cubo para que no se mueva por los golpes de otros objetos
    yield WaitForSeconds(2);
    //	networkView.RPC("sendFisica", RPCMode.Others , cubo,1);

    //Quitamos esta línea para que las físicas continuen funcionando despues de dos segundos.
    //cubo.isKinematic = true;

}



static function ToggleLight(go: GameObject) {
    var theLight: Light = go.GetComponentInChildren(Light);
    if (!theLight)
        return;

    theLight.enabled = !theLight.enabled;
    var illumOn = theLight.enabled;
    var renderers = go.GetComponentsInChildren(MeshRenderer);
    for (var r: MeshRenderer in renderers) {
        if (r.gameObject.layer == 1) {
            r.material.shader = Shader.Find(illumOn ? "Self-Illumin/Diffuse" : "Diffuse");
        }
    }
}

function FindCamera() {
    if (GetComponent.<Camera>())
        return GetComponent.<Camera>();
    else
        return Camera.main;
}

function OnPostRender() {
    if (highlightObject == null)
        return;

    var go = highlightObject;
    highlightMaterial.SetPass(0);
    var meshes = go.GetComponentsInChildren(MeshFilter);
    for (var m: MeshFilter in meshes) {
        Graphics.DrawMeshNow(m.sharedMesh, m.transform.position, m.transform.rotation);
    }
}

function Rotacion(numero: int, body: Rigidbody) {

    body.isKinematic = true;
    //networkView.RPC("sendFisica", RPCMode.Others , body,1);
    if (numero == 1)
        body.transform.rotation *= Quaternion.AngleAxis(4, new Vector3(0, 1, 0));
    else
        body.transform.rotation *= Quaternion.AngleAxis(4, new Vector3(1, 0, 0));


}

@RPC
function sendLine(habilitado: int, inicio: Vector3, fin: Vector3) {
    if (habilitado == 1)
        line.enabled = true;
    else
        line.enabled = false;

    line.SetPosition(0, inicio);
    line.SetPosition(1, fin);
}

