using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Barebones.Networking;
using UnityEngine;
using UnityEngine.UI;

namespace Barebones.MasterServer{
	public class CreateLobby : MonoBehaviour {

		//Interfaz que el lobby tendrá, el cuál activaremos despues
		public LobbyUi LobbyUi;

		/*public virtual void OnHostClick()
        {
            var properties = new Dictionary<string, string>()
            {
                {MsfDictKeys.LobbyName, Name.text },
                {MsfDictKeys.SceneName, GetSelectedMap() },
                {MsfDictKeys.MapName, MapDropdown.captionText.text}
            };

            var loadingPromise = Msf.Events.FireWithPromise(Msf.EventNames.ShowLoading, "Sending request");

            var factory = GetSelectedFactory();

            Msf.Client.Lobbies.CreateAndJoin(factory, properties, (lobby, error) =>
            {
                loadingPromise.Finish();

                if (lobby == null)
                {
                    Msf.Events.Fire(Msf.EventNames.ShowDialogBox, DialogBoxData.CreateError(error));
                    Logs.Error(error + " (Factory: " + factory + ")");
                    return;
                }

                // Hide this window
                gameObject.SetActive(false);

                if (LobbyUi != null)
                {
                    // Show the UI
                    LobbyUi.gameObject.SetActive(true);

                    // Set the lobby Ui as current listener
                    lobby.SetListener(LobbyUi);
                }
                else
                {
                    Logs.Error("Please set LobbyUi property in the inspector");
                }
            });
        }*/
	
	}
}
