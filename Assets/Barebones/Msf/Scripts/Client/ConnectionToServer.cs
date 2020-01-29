using System.Collections;
using System.Threading;
using Barebones.Logging;
using Barebones.Networking;
using UnityEngine;
using UnityEngine.UI;


namespace Barebones.MasterServer{

public class ConnectionToServer : MonoBehaviour {

	[Tooltip("Log level of this script")]
        public LogLevel LogLevel = LogLevel.Info;

        [Tooltip("If true, ip and port will be read from cmd args")]
        public bool ReadMasterServerAddressFromCmd = true;

        [Tooltip("Address to the server")]
        public string ServerIp = "127.0.0.1";
        public InputField ServerIpText;
        //public string ServerIp;

        [Tooltip("Port of the server")]
        public int ServerPort = 5000;

        [Header("Automation")]
        [Tooltip("If true, will try to connect on the Start()")]
        public bool ConnectOnStart = false;

        public BmLogger Logger = Msf.Create.Logger(typeof(ConnectionToServer).Name);

        private static ConnectionToServer _instance;

        [Header("Advanced ")]
        public float MinTimeToConnect = 0.5f;
        public float MaxTimeToConnect = 4f;
        public float TimeToConnect = 0.5f;

        private IClientSocket _connection;

		public void Awake()
        {
            if (_instance != null)
            {
                Destroy(gameObject);
                return;
            }
                
            _instance = this;

            Logger.LogLevel = LogLevel;

            // In case this object is not at the root level of hierarchy
            // move it there, so that it won't be destroyed
            if (transform.parent != null)
                transform.SetParent(null, false);

            DontDestroyOnLoad(gameObject);

            if (ReadMasterServerAddressFromCmd)
            {
                // If master IP is provided via cmd arguments
                if (Msf.Args.IsProvided(Msf.Args.Names.MasterIp))
                    ServerIp = Msf.Args.MasterIp;

                // If master port is provided via cmd arguments
                if (Msf.Args.IsProvided(Msf.Args.Names.MasterPort))
                    ServerPort = Msf.Args.MasterPort;
            }
        }


        public void DebugConnection(){
            var connection = GetConnection();

            if(connection.IsConnected){
                Debug.Log("Estamos conectados");
            }else{
                Debug.Log("No estamos conectados");
            }
        }
        public void ConnectToServer(int op){
            //Si op es 0 es que será el host
            if(op == 1){
                //Nos vamos a conectar a un servidor en otra compu
                //por lo que cambiamos la ip
                ServerIp = ServerIpText.text;

            }

            StartCoroutine(StartConnection());
        }

        public virtual IClientSocket GetConnection()
        {
            return Msf.Connection;
        }

        private IEnumerator StartConnection()
        {
            // Wait a fraction of a second, in case we're also starting a master server
            yield return new WaitForSeconds(0.2f);

            var connection = GetConnection();

            connection.Connected += Connected;
            connection.Disconnected += Disconnected;

            while (true)
            {
                // Skip one frame
                yield return null;

                if (connection.IsConnected)
                {
                    // If connected, wait a second before checking the status
                    //yield return new WaitForSeconds(1);
                    //continue;
                    yield break;
                }

                // If we got here, we're not connected 
                if (connection.IsConnecting)
                {
                    Logger.Debug("Retrying to connect to server at: " + ServerIp + ":" + ServerPort);
                }
                else
                {
                    Logger.Debug("Connecting to server at: " + ServerIp +":" + ServerPort);
                }

                connection.Connect(ServerIp, ServerPort);

                // Give a few seconds to try and connect
                yield return new WaitForSeconds(TimeToConnect);

                // If we're still not connected
                if (!connection.IsConnected)
                {
                    TimeToConnect = Mathf.Min(TimeToConnect*2, MaxTimeToConnect);
                }
            }
        }

        private void Disconnected()
        {
            TimeToConnect = MinTimeToConnect;
        }

        private void Connected()
        {
            TimeToConnect = MinTimeToConnect;
            Logger.Info("Connected to: " + ServerIp+":" + ServerPort);
        }

        void OnApplicationQuit()
        {
            var connection = GetConnection();

            if (connection != null)
                connection.Disconnect();
        }
    
}

}
