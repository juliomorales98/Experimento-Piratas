using UnityEngine;
using System.Collections;

[AddComponentMenu("Camera-Control/Mouse Look")]
public class camara : MonoBehaviour {

	public enum RotationAxes { MouseXAndY = 0, MouseX = 1, MouseY = 2 }
	public RotationAxes axes = RotationAxes.MouseXAndY;
	public float sensitivityX = 15F;
	public float sensitivityY = 15F;

	public float minimumX = -360F;
	public float maximumX = 360F;

	public float minimumY = -60F;
	public float maximumY = 60F;

	float rotationY = 0F;
	
	public Transform target;
	public GameObject player;
	
	void Update ()
	{
		if (axes == RotationAxes.MouseXAndY)
		{
			float rotationX = transform.localEulerAngles.y + Input.GetAxis("Mouse X") * sensitivityX;
			
			rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
			rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
			
			transform.localEulerAngles = new Vector3(-rotationY, rotationX, 0);
			target.localEulerAngles = new Vector3(0, rotationX, 0);
			
			
		}
		else if (axes == RotationAxes.MouseX )
		{
			transform.Rotate(0, Input.GetAxis("Mouse X") * sensitivityX, 0);
			target.Rotate(0, Input.GetAxis("Mouse X") * sensitivityX, 0);
		
		}
		else
		{
			rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
			rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
			
			transform.localEulerAngles = new Vector3(-rotationY, transform.localEulerAngles.y, 0);
		
		}
		if(Input.GetMouseButtonDown(0))
		{
			sensitivityX = 0;
			sensitivityY = 2;
			
		//	Debug.Log ("se presiono");
		}
		if(Input.GetMouseButtonUp(0))
		{
			sensitivityX = 15F;
			sensitivityY = 15F;
		}
	}
	
	void LateUpdate()
	{
		float temp =0;
		if(Input.GetAxis("Vertical")!=0)
		{
			temp = target.position.y;
			transform.position =new Vector3(target.position.x,temp +1,target.position.z);

	
		}
	/*	if(Input.GetAxis("Horizontal")!=0)
		{
		//	transform.Rotate(0, target.localEulerAngles.y, 0);
	//		transform.localEulerAngles = new Vector3(target.localEulerAngles.x,target.localEulerAngles.y,target.localEulerAngles.z);
			temp = target.localEulerAngles.y - transform.localEulerAngles.y;
			Debug.Log ("los angulos son "+temp);
			transform.Rotate(0, temp, 0);
			//temp = target.localEulerAngles.y;
			
		}*/
	}
	
	void Start ()
	{
	//Make the rigid body not change rotation
		if (GetComponent<Rigidbody>())
			GetComponent<Rigidbody>().freezeRotation = true;
		
		player = GameObject.FindGameObjectWithTag("Player");
		target = player.transform;
		transform.position = target.position;
		transform.localEulerAngles = target.localEulerAngles;
		
		name = player.name;
	}
}
