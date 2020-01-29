using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.IO;

public class IOConfig : MonoBehaviour {

	private string path = "conf.txt";

	public InputField time; 
	public InputField name;
	public InputField remoteIP;
	public Text localIP;

	

	public List<string> parametres = new List<string>();
	public void WriteConf(int op){

		//Primero validamos si existe y lo eliminamos si es cierto
		if(File.Exists(path)){
			File.Delete(path);			
		}			

		//Escribimos la configuración
		StreamWriter writer = new StreamWriter(path, true);

		writer.WriteLine(name.text);

		if(op == 0){
			//Escribimos parametros de host 			
			writer.WriteLine("127.0.0.1");
			writer.WriteLine(time.text);

		}else if(op == 1){
			//Escribimos para client			
			writer.WriteLine(remoteIP.text);
			
		}

		
		writer.Close();

		
	}

	public void ReadConf(){

		//Validamos que el archivo de configuración existe
		if(!File.Exists(path)){
			Debug.Log("No se pudo leer el archivo de configuración");
			return;
		}

		//Leemos el archivo
		StreamReader reader = new StreamReader(path, true);
		string cadena;
		

		while( (cadena = reader.ReadLine()) != null){
			parametres.Add(cadena);
		}

		reader.Close();

		//Si falta algún parámetro
		if(parametres.Count < 1){
			Debug.Log("Archivo dañado, no se reconocen los parámetros");
			return;
		}

		//Primer parámetro es la duración del experimento, por lo que debería de tratarse de un int
		Debug.Log(parametres[0]);

	}
}
