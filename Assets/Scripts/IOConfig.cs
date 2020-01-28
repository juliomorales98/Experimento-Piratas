using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.IO;

public class IOConfig : MonoBehaviour {

	private string path = "conf.txt";

	public InputField tiempo; 

	public List<string> parametros = new List<string>();
	public void WriteConf(){

		//Primero validamos si existe y lo eliminamos si es cierto
		if(File.Exists(path)){
			File.Delete(path);			
		}			

		//Escribimos la configuración
		StreamWriter writer = new StreamWriter(path, true);

		writer.WriteLine(tiempo.text);
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
			parametros.Add(cadena);
		}

		reader.Close();

		//Si falta algún parámetro
		if(parametros.Count < 1){
			Debug.Log("Archivo dañado, no se reconocen los parámetros");
			return;
		}

		//Primer parámetro es la duración del experimento, por lo que debería de tratarse de un int
		Debug.Log(parametros[0]);

	}
}
