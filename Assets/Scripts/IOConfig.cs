/*
juliocesar.mr@protonmail.com

Guarda la configuración que se realizó en el lobby y la sala a un archivo de text, así tambien guarda
los jugadores conectados y el plan de elaboración realizado.
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.IO;
using Photon.Pun;

public class IOConfig : MonoBehaviour {

	[SerializeField] private Transform playerList;
	[SerializeField] private Transform messageList;
	[SerializeField] private Text roomName;
	private string path = "LogChat.txt";
	
	public void GuardarLogChat()
	{

		if (File.Exists(path)){	//Si el archivo existe lo eliminamos.
			File.Delete(path);
		}

		StreamWriter writer = new StreamWriter(path, true);
		
		writer.WriteLine(roomName.text);
		writer.WriteLine("Servidor: " + PhotonNetwork.CloudRegion);


		//Duración
		SetExperimentDuration.SED.SetLength();
		writer.WriteLine("Duración: " + SetExperimentDuration.SED.getLength() + " minutos.");

		//Jugadores en la sala
		writer.WriteLine("Jugadores:");
		for (int i = 0; i < playerList.childCount; i++)
		{
			writer.WriteLine("\t" + playerList.GetChild(i).GetChild(0).gameObject.GetComponent<Text>().text);
		}

		//Escribimos mensajes
		writer.WriteLine("Plan de elaboración:");

		if(messageList.childCount == 0){	//Si no hay mensajes guardamos "Ninguno".
			writer.WriteLine("\tNinguno.");
		}else{
			for(int i = 0; i < messageList.childCount; i++){
				
				writer.WriteLine("\t" + messageList.GetChild(i).gameObject.GetComponent<Text>().text);
			}
		}	


		writer.Close();
	}
}
