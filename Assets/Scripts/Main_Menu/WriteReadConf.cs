using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;

public class WriteReadConf : MonoBehaviour {

	private string path = "conf.txt";
	public void WriteConf(){
		StreamWriter writer = new StreamWriter(path, true);
		writer.WriteLine("Puebas");
		writer.Close();
	}

	void Start(){
		WriteConf();
	}
}
