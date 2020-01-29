using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

using System.Net; //Para la ip
public class GetLocalIp : MonoBehaviour {

	public Text ipText;
	void Start () {
		getIp();
	}

	public void getIp(){
		IPHostEntry host;
		string localIP = "?";
		host = Dns.GetHostEntry(Dns.GetHostName());

		foreach (IPAddress ip in host.AddressList){
			if( ip.AddressFamily.ToString() == "InterNetwork"){
				localIP = ip.ToString();
				Debug.Log(localIP);
				ipText.text = localIP;
				break;
			}
		}
	}
	
	
}
