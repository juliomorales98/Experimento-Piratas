﻿using Photon.Pun;
using UnityEngine;
using System.Collections;
using UnityEngine.UI;
public class ControlBasico : MonoBehaviour
{
    public Animator anim;
    public Text pirateName;
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
    private PhotonView PV;
    private Camera miCamara;
    void Start()
    {
        //Inicializacion de valores de la animacion
        anim.SetBool("camina", false);
        anim.SetBool("vuelta", false);
        anim.SetBool("abajo", false);
        anim.SetBool("arriba", false);
        anim.SetBool("izq", false);
        anim.SetBool("der", false);
        anim.SetFloat("direccion", 0);
        anim.SetBool("atras", false);
        PV = GetComponent<PhotonView>();
        miCamara = transform.GetChild(0).GetComponent<Camera>();        
    }
    // Update is called once per frame
    void Update()
    {
        if(PV.IsMine){
			miCamara.enabled = false;
			miCamara.enabled = true;
            adelante = Input.GetAxis("Vertical");        
            //de-commenting
            lado = Input.GetAxis("Horizontal");
            ratonx = Input.mousePosition.x;
            ratony = Input.mousePosition.y;
            if (lado != 0)
            {
                anim.SetBool("vuelta", true);
                anim.SetFloat("direccion", lado);
            }
            else
            {
                float temp = 0;
                anim.SetBool("vuelta", false);
                anim.SetFloat("direccion", temp);
            }
            //si presionan adelante puede caminar
            if (adelante > 0)
            {
                anim.SetBool("vuelta", false);
                anim.SetBool("atras", false);
                anim.SetBool("camina", true);
                if (lado > 0.1 || lado < 0.1)
                {
                    anim.SetFloat("direccion", lado);
                }
            }
            else if (adelante == 0)
            {
                anim.SetBool("camina", false); // cositas pasan aqui, cositas buenas.
                anim.SetBool("atras", false);
            }
            else
            {
                //	Debug.Log ("Caminar hacia atras");
                anim.SetBool("atras", true);
            }
            if (axes == RotationAxes.MouseXAndY)
            {
                float rotationX = transform.localEulerAngles.y + Input.GetAxis("Mouse X") * sensitivityX;
                rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
                rotationY = Mathf.Clamp(rotationY, minimumY, maximumY);
                transform.localEulerAngles = new Vector3(-rotationY, rotationX, 0);
                transform.localEulerAngles = new Vector3(0, rotationX, 0);
                transform.LookAt(Input.mousePosition);
                transform.LookAt(Input.mousePosition);
            }
            else if (axes == RotationAxes.MouseX)
            {
                transform.Rotate(0, Input.GetAxis("Mouse X") * sensitivityX, 0);
            }
            if (ratony > (Screen.height - 100))
            {
                anim.SetBool("arriba", true);
                anim.SetBool("abajo", false);
                anim.SetBool("izq", false);
                anim.SetBool("der", false);
            }
            else if (ratony < 100)
            {
                anim.SetBool("abajo", true);
                anim.SetBool("arriba", false);
                anim.SetBool("izq", false);
                anim.SetBool("der", false);
            }
            else if (ratonx < 250)
            {
                anim.SetBool("abajo", false);
                anim.SetBool("arriba", false);
                anim.SetBool("izq", true);
                anim.SetBool("der", false);
            }
            else if (ratonx > Screen.width - 250)
            {
                anim.SetBool("abajo", false);
                anim.SetBool("arriba", false);
                anim.SetBool("izq", false);
                anim.SetBool("der", true);
            }
            else
            {
                anim.SetBool("abajo", false);
                anim.SetBool("arriba", false);
                anim.SetBool("izq", false);
                anim.SetBool("der", false);
            }
		}
        
    }
}