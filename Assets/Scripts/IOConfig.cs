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
	
	public void GuardarLogChat()
	{
		//Guardamos los mensajes
		string path = "LogChat.txt";
		if (File.Exists(path))
		{
			File.Delete(path);
		}

		StreamWriter writer = new StreamWriter(path, true);
		
		writer.WriteLine(roomName.text);
		writer.WriteLine("Servidor: " + PhotonNetwork.CloudRegion);


		//Duración
		SetExperimentDuration.SED.SetLength();
		writer.WriteLine("Duración: " + SetExperimentDuration.SED.getLength());

		//Jugadores en la sala
		writer.WriteLine("Jugadores:");
		for (int i = 0; i < playerList.childCount; i++)
		{
			writer.WriteLine("\t" + playerList.GetChild(i).GetChild(0).gameObject.GetComponent<Text>().text);
		}


		writer.WriteLine("Plan de elaboración:");
		//Escribimos mensajes
		//for (int i = messageList.childCount - 1; i >= 0; i--)
		for(int i = 0; i < messageList.childCount; i++){
			//Destroy(playersContainer.GetChild(i).gameObject);
			writer.WriteLine("\t" + messageList.GetChild(i).gameObject.GetComponent<Text>().text);
		}


		writer.Close();
	}
}
