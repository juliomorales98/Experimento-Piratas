/*
juliocesar.mr@protonmail.com

Script para manejar el estar mandando notificaciones a través del juego.
Solamente se llama la función "SetNewNotification" con el mensaje de la notificación.
Este script tiene que estar añadido a un objeto de nombre "NotificationManager" dentro del juego, el cual puede ser un prefab.
	Aquí es donde se mostrará el mensaje, por lo que puede ser acomodado donde sea mejor.
*/
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class NotificationManager : MonoBehaviour {

	
	private static NotificationManager instance;

	[SerializeField] private Text notificationText;
	[SerializeField] private float fadeTime;
	private IEnumerator notificationCoroutine;

	public static NotificationManager Instance{
		get{
			if(instance != null){
				//Si la instancia existe
				return instance;
			}

			//Probamos si existe pero no la habíamos guardado
			instance = FindObjectOfType<NotificationManager>();

			if(instance != null){
				return instance;
			}

			//Si no existe
			CreateNewInstance();

			return instance;
		}
	}

	public static NotificationManager CreateNewInstance(){
		NotificationManager notificationManagerPrefab = Resources.Load<NotificationManager>("NotificationManager");
		instance = Instantiate(notificationManagerPrefab);

		return instance;
	}

	void Awake(){
		if(Instance != this){
			Destroy(gameObject);
		}
	}
	
	
	public void SetNewNotification(string message){
		if(notificationCoroutine != null){
			StopCoroutine(notificationCoroutine);
		}
		//Hacemos que vaya desapareciendo poco a poco
		notificationCoroutine = FadeOutNotification(message);
		StartCoroutine(notificationCoroutine);
	}

	private IEnumerator FadeOutNotification(string message){
		notificationText.text = message;
		float t = 0;

		while(t < fadeTime){
			t += Time.deltaTime;
			notificationText.color = new Color(notificationText.color.r,
			 notificationText.color.g,
			 notificationText.color.b,
			 Mathf.Lerp(1f,0f, t / fadeTime));
			 
			yield return null;
		}
	}
}
