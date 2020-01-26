using Barebones.MasterServer;
using UnityEngine;
using System.Collections.Generic;
//using System.Diagnostics;
using System.Threading;

namespace Barebones.MasterServer
{
    public class QuickAuthUi : MonoBehaviour
    {
        public GameObject LoginWindow;
        public GameObject RegisterWindow;

        public bool DeactivateOnLogIn = true;

        //public List<GameObject> DisableObjectsOnLogIn;

        void Awake()
        {
            LoginWindow = LoginWindow ?? FindObjectOfType<LoginUi>().gameObject;
            RegisterWindow = RegisterWindow ?? FindObjectOfType<RegisterUi>().gameObject;
            Msf.Client.Auth.LoggedIn += OnLoggedIn;

            // In case we're already logged in 
            if (Msf.Client.Auth.IsLoggedIn)
                OnLoggedIn();
        }

        private void OnLoggedIn()
        {
            if (DeactivateOnLogIn)
                gameObject.SetActive(false);
        }

        public void OnLoginClick()
        {
            if (!Msf.Client.Auth.IsLoggedIn)
                LoginWindow.gameObject.SetActive(true);
        }

        public void ConnectToServer(){
            var ConnectionToMaster = FindObjectOfType<ConnectionToMaster>();
            //ConnectionToMaster.Awake();
            ConnectionToMaster.StartMio();
            Debug.Log("Terminó Script");
        }
        public void OnGuestAccessClick()
        {
            /*var ConnectionToMaster = FindObjectOfType<ConnectionToMaster>();
            //ConnectionToMaster.Awake();
            ConnectionToMaster.StartMio();
            Debug.Log("Terminó Script");*/

            
            
            var promise = Msf.Events.FireWithPromise(Msf.EventNames.ShowLoading, "Logging in");
            
            Msf.Client.Auth.LogInAsGuest((accInfo, error) =>
            {
                promise.Finish();

                if (accInfo == null)
                {

                    Msf.Events.Fire(Msf.EventNames.ShowDialogBox, DialogBoxData.CreateError(error));
                    Logs.Error(error);
                }/*else{
                    //Si entramos a la conexión ponemos en null los objetos para poner ip
                    foreach (var obj in DisableObjectsOnLogIn)
                    {
                        if (obj != null)
                            obj.SetActive(false);
                    }
                }*/
            });
        }

        public void OnRegisterClick()
        {
            if (!Msf.Client.Auth.IsLoggedIn)
                RegisterWindow.SetActive(true);
        }
    }
}
