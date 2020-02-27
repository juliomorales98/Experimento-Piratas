/*
Entornos virtuales
Creador: Julio Morales: juliocesar.mr@protonmail.com
*/


using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
using Photon.Pun;

public class DragObject : MonoBehaviour {

	private Vector3 mOffset;

    private float mZCoord;

	private Vector3 myRotation;

    private Text pirateName;

    PhotonView myPV;

    private bool beingTransformed;

    private bool pieceSetted;

    private Camera myCamera;

    void Start(){
        myPV = gameObject.GetComponent<PhotonView>();
        beingTransformed = false;
        pieceSetted = false;
        mOffset = new Vector3(0,0,0);
        myPV.OwnershipTransfer = OwnershipOption.Takeover;
        //myCamera = Camera.main;
    }

    void Update(){
        if(!beingTransformed){
            gameObject.GetComponent<Rigidbody>().isKinematic = false;
            gameObject.GetComponent<Rigidbody>().useGravity = true;
        }else{
            gameObject.GetComponent<Rigidbody>().isKinematic = true;
            gameObject.GetComponent<Rigidbody>().useGravity = false;
        }

        //myPV.RPC("RPC_MandarPosicion",RpcTarget.All);
    }

    [PunRPC]
    private void RPC_MandarPosicion(){
        gameObject.GetComponent<Rigidbody>().transform.position = transform.position;
    }
    
    public bool ValidarMovimiento(){
        //Validamos la condición de si es Pirata 2 y está tratando de modificar una pieza grande.

        GameObject[] infoPlayer = GameObject.FindGameObjectsWithTag("Player_Info");

        foreach(GameObject g in infoPlayer){
            if(g.name == "Pirate Name"){
                if(g.GetComponent<Text>().text == "Pirata 2" && (gameObject.name == "Popa_Prefab" || gameObject.name == "Proa_Prefab")){
                    //Debug.Log("No puede cargar esta pieza.");
                    NotificationManager.Instance.SetNewNotification("Pirata 2 no puede cargar esta pieza.");
                    return false;
                }
            }else if(g.name == "PlayerPosition"){
                //Distancia entre 2 puntos en el espacio

                float playerX = float.Parse(g.transform.GetChild(0).GetComponent<Text>().text);
                float playerY = float.Parse(g.transform.GetChild(1).GetComponent<Text>().text);
                float playerZ = float.Parse(g.transform.GetChild(2).GetComponent<Text>().text);
                
                float distance = Vector3.Distance(new Vector3(playerX,playerY,playerZ),transform.position);
                //Debug.Log("Distance= " + distance);

                if(distance >= 16){
                    NotificationManager.Instance.SetNewNotification("Pieza demasiado lejos.");
                    return false;
                }
                    
                
                
            }
        }

        return true;
    }

    void OnMouseDown(){
        if(!ValidarMovimiento()){
            return;
        }

        beingTransformed = true;
        pieceSetted = false;
    }
    void OnMouseUp(){
        if(!ValidarMovimiento()){
            return;
        }

        if(!pieceSetted)
            beingTransformed = false;

        //myPV.RPC("RPC_MovePiece", RpcTarget.AllBuffered);
    }

    void OnMouseDrag(){
        if(!ValidarMovimiento())
            return;

        //myPV.RPC("RPC_DragPiece", RpcTarget.AllBuffered);
        gameObject.GetComponent<Rigidbody>().transform.position = GetMouseAsWorldPoint() + mOffset;
    }   

    [PunRPC]
    private void RPC_DragPiece(){
        //transform.position = GetMouseAsWorldPoint() + mOffset;
        gameObject.GetComponent<Rigidbody>().transform.position = GetMouseAsWorldPoint() + mOffset;
    }
    public void MovePiece(Camera _myCamera){
       
        if(!ValidarMovimiento())
            return;
        myCamera = _myCamera;
        //myPV.RPC("RPC_MovePiece", RpcTarget.AllBuffered);
        //myPV.RPC("RPC_DragPiece", RpcTarget.AllBuffered);
         mZCoord = myCamera.WorldToScreenPoint(gameObject.transform.position).z;
        
        mOffset = gameObject.transform.position - GetMouseAsWorldPoint(); 
    }

    [PunRPC]
    private void RPC_MovePiece(){
        
        mZCoord = myCamera.WorldToScreenPoint(gameObject.transform.position).z;
        
        mOffset = gameObject.transform.position - GetMouseAsWorldPoint(); 

    }
    
    private Vector3 GetMouseAsWorldPoint(){

        Vector3 mousePoint = Input.mousePosition;

        
        mousePoint.z = mZCoord;
        
        // Convertimos coordenadas a posiciones en el world.
        return myCamera.ScreenToWorldPoint(mousePoint);
    }

    public void RotatePiece(int op){
        if(!ValidarMovimiento())
            return;

        //myPV.RPC("RPC_RotatePiece", RpcTarget.AllBuffered, op);
        if(op == 1){
            gameObject.GetComponent<Rigidbody>().transform.rotation *= Quaternion.AngleAxis(4, new Vector3(1, 0, 0));
        }else if (op == 2){
            gameObject.GetComponent<Rigidbody>().transform.rotation *= Quaternion.AngleAxis(4, new Vector3(0, 1, 0));
        }else if(op == 3){
            gameObject.GetComponent<Rigidbody>().transform.rotation *= Quaternion.AngleAxis(4, new Vector3(0, 0, 1));
        }
        
        
    }
    [PunRPC]
    private void RPC_RotatePiece(int op){
        if(op == 1){
            gameObject.GetComponent<Rigidbody>().transform.rotation *= Quaternion.AngleAxis(4, new Vector3(1, 0, 0));
        }else if (op == 2){
            gameObject.GetComponent<Rigidbody>().transform.rotation *= Quaternion.AngleAxis(4, new Vector3(0, 1, 0));
        }else if(op == 3){
            gameObject.GetComponent<Rigidbody>().transform.rotation *= Quaternion.AngleAxis(4, new Vector3(0, 0, 1));
        }
    }

    
    

    public void SetKinematic(bool var){

        if(!ValidarMovimiento())
            return;

        
        //myPV.RPC("RPC_SetKinematic", RpcTarget.AllBuffered, var);
        pieceSetted = true;
        gameObject.GetComponent<Rigidbody>().isKinematic = var;
        gameObject.GetComponent<Rigidbody>().useGravity = !var;
        
    }

    [PunRPC]
    private void RPC_SetKinematic(bool var){
        pieceSetted = true;
        gameObject.GetComponent<Rigidbody>().isKinematic = var;
        gameObject.GetComponent<Rigidbody>().useGravity = !var;
    }    

    
}
