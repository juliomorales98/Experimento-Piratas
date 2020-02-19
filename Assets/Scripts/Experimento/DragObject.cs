using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;

public class DragObject : MonoBehaviour {

	private Vector3 mOffset;

    private float mZCoord;

	private Vector3 myRotation;

    private Text pirateName;
    
    private bool ValidarMovimiento(){
        //Validamos la condición de si es Pirata 2 y está tratando de modificar una pieza grande.

        GameObject[] infoPlayer = GameObject.FindGameObjectsWithTag("Player_Info");

        foreach(GameObject g in infoPlayer){
            if(g.name == "Pirate Name"){
                if(g.GetComponent<Text>().text == "Pirata 2" && (gameObject.name == "Popa_Prefab" || gameObject.name == "Proa_Prefab")){
                    //Debug.Log("No puede cargar esta pieza.");
                    return false;
                }
            }else if(g.name == "PlayerPosition"){
                //Distancia entre 2 puntos en el espacio

                float playerX = float.Parse(g.transform.GetChild(0).GetComponent<Text>().text);
                float playerY = float.Parse(g.transform.GetChild(1).GetComponent<Text>().text);
                float playerZ = float.Parse(g.transform.GetChild(2).GetComponent<Text>().text);
                
                float distance = Vector3.Distance(new Vector3(playerX,playerY,playerZ),transform.position);
                Debug.Log("Distance= " + distance);

                if(distance >= 16)
                    return false;
                
                
            }
        }

        return true;
    }
    public void MovePiece(){
       
        if(!ValidarMovimiento())
            return;

        mZCoord = Camera.main.WorldToScreenPoint(gameObject.transform.position).z;
        
        mOffset = gameObject.transform.position - GetMouseAsWorldPoint();        
    }

    public void RotatePiece(int op){
        if(!ValidarMovimiento())
            return;

        if(op == 1){
            gameObject.GetComponent<Rigidbody>().transform.rotation *= Quaternion.AngleAxis(4, new Vector3(1, 0, 0));
        }else if (op == 2){
            gameObject.GetComponent<Rigidbody>().transform.rotation *= Quaternion.AngleAxis(4, new Vector3(0, 1, 0));
        }
        
        
    }

    public void SetKinematic(bool var){

        if(!ValidarMovimiento())
            return;

        gameObject.GetComponent<Rigidbody>().isKinematic = var;
        gameObject.GetComponent<Rigidbody>().useGravity = !var;
        
        
    }

    private Vector3 GetMouseAsWorldPoint(){

        Vector3 mousePoint = Input.mousePosition;

        
        mousePoint.z = mZCoord;

        // Convertimos coordenadas a posiciones en el world.
        return Camera.main.ScreenToWorldPoint(mousePoint);
    }

    void OnMouseDrag(){
        if(!ValidarMovimiento())
            return;

        transform.position = GetMouseAsWorldPoint() + mOffset;
    }
}
