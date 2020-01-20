/*
This camera smoothes out rotation around the y-axis and height.
Horizontal Distance to the target is always fixed.

There are many different ways to smooth the rotation but doing it this way gives you a lot of control over how the camera behaves.

For every of those smoothed values we calculate the wanted value and the current value.
Then we smooth it using the Lerp function.
Then we apply the smoothed values to the transform's position.
*/

// The target we are following
var target : Transform;
// The distance in the x-z plane to the target
var distance = 10.0;
// the height we want the camera to be above the target
var height = 5.0;
// How much we 
var heightDamping = 2.0;
var rotationDamping = 3.0;
var player : GameObject;
var rotationX : float = 0F;
var rotationY : float = 0F;

var  minimumY:float = -60F;
var  maximumY:float = 60F;


// Place the script in the Camera-Control group in the component menu
@script AddComponentMenu("Camera-Control/camara")
function Start()
{
	player = GameObject.FindGameObjectWithTag("Player");
	target = player.transform;
	transform.position = target.position;
	transform.localEulerAngles = target.localEulerAngles;

	
	
		
	
}

function Update()
{

	 if(Input.GetAxis("Mouse X"))
	{
		transform.Rotate(0, Input.GetAxis("Mouse X") * 2, 0);
		target.Rotate(0, Input.GetAxis("Mouse X") * 2, 0);
		rotationY=0;
	//	Debug.Log("Input Mouse X"+Input.GetAxis("Mouse X"));
	}
	else if(Input.GetAxis("Mouse Y") && !Input.GetAxis("Horizontal"))
	{
	//	rotationY += Input.GetAxis("Mouse Y") * 5;
	//	rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
						
	//	transform.localEulerAngles = new Vector3(-rotationY, transform.localEulerAngles.y, 0);
		
	//	Debug.Log("Input Mouse Y"+Input.GetAxis("Mouse Y"));
	}
}
function LateUpdate () {
	// Early out if we don't have a target
	if (!target)
		return;
	
	
	if(Input.GetAxis("Vertical"))
	{
		//rotationX = transform.localEulerAngles.y + Input.GetAxis("Mouse X") * 10;
		transform.position = target.position;
		transform.position.y = target.position.y +1;
	
	//	transform.Rotate(0, Input.GetAxis("Mouse X") * 10, 0);
	//	transform.position.z = target.transform.z;
		
	//	Debug.Log("Se presiono");
	}
	if(Input.GetAxis("Horizontal"))
	{

		transform.localEulerAngles.y = target.localEulerAngles.y;
//			head.Rotate(Input.GetAxis("Mouse Y") *-5,0,0);
	}
	//transform.LookAt(Input.mousePosition);

/*
	// Calculate the current rotation angles
	var wantedRotationAngle = target.eulerAngles.y;
	var wantedHeight = target.position.y + height;
		
	var currentRotationAngle = transform.eulerAngles.y;
	var currentHeight = transform.position.y;
	
	// Damp the rotation around the y-axis
	currentRotationAngle = Mathf.LerpAngle (currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);

	// Damp the height
	currentHeight = Mathf.Lerp (currentHeight, wantedHeight, heightDamping * Time.deltaTime);

	// Convert the angle into a rotation
	var currentRotation = Quaternion.Euler (0, currentRotationAngle, 0);
	
	// Set the position of the camera on the x-z plane to:
	// distance meters behind the target
	transform.position = target.position;
	transform.position -= currentRotation * Vector3.forward * distance;

	// Set the height of the camera
	transform.position.y = currentHeight;
	
	
	// Always look at the target
	transform.LookAt(target);*/
	

}