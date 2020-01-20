var entID: String;
var OneTime = 0;
var renderize : boolean  = false;  
var windowRect : Rect = Rect (20, 20, 320, 270); // if you chage this, verify in the Inspector
var hidedWindow= true;
var addTextureBodyI="www.dmu.com/textuDMU2.jpg";
var addTextureHeadI="www.dmu.com/textuDMU1.jpg";
var addTextureHairI="www.dmu.com/textuDMU0.jpg";
var addTextureBody=" ";
var addTextureHead =" ";
var addTextureHair =" ";
var titBut="Avatar-Open/Change";
  
function Start(){
  entID = gameObject.GetComponent.<NetworkView>().viewID.ToString().Remove(0,13);
}

function showWindow(){
 renderize = true;
}

function  hideWindow(){
 renderize = false;
}

function OnGUI() {
 GUI.depth = 1; //layer under 0
 if(OneTime==0 && GetComponent.<NetworkView>().isMine){ 
  if (GUI.Button(new Rect(10, Screen.height-30, 135, 20), titBut)){
   if (hidedWindow == true){
     showWindow();
     hidedWindow = false;
   }
  else{
    hideWindow();
    hidedWindow = true;
    Load();
    OneTime=1;
   }
  }
 }

 if(renderize) {
  windowRect = GUI.Window (1, windowRect, window1, "Redefine and close the window");
 }
}

function window1 (windowID : int){
 GUI.DragWindow (Rect (0,0, 120, 20)); // drag area
 GUI.Label(new Rect(10,40,400,20),"Body: texture address");
 addTextureBodyI = GUI.TextField(new Rect(10,80,300,20),addTextureBodyI);
 GUI.Label(new Rect(10,120,400,20),"Head: texture address");
 addTextureHeadI = GUI.TextField(new Rect(10,160,300,20),addTextureHeadI);
 GUI.Label(new Rect(10,190,400,20),"Hair: texture address");
 addTextureHairI = GUI.TextField(new Rect(10,220,300,20),addTextureHairI );
}

function Load(){
 addTextureBody  =addTextureBodyI ;
 addTextureHead  =addTextureHeadI ;
 addTextureHair =addTextureHairI;
  if(GetComponent.<NetworkView>().isMine)GetComponent.<NetworkView>().RPC("LoadCL", RPCMode.AllBuffered,entID,addTextureBody,addTextureHead,addTextureHair);
}

@RPC
function LoadCL(ent : String, tT : String, tC : String , tCl : String ){
 if(gameObject.GetComponent.<NetworkView>().viewID.ToString().Remove(0,13) == ent){
 
  //texture body
  var GOH =GameObject.Find("Hips" +ent);
  var urlTT = tT; 
  var downloadTT = WWW(urlTT);
  yield downloadTT; 
  GOH.GetComponent.<Renderer>().materials[2].mainTexture = downloadTT.texture;
   
  //texture head
  var urlTC = tC; 
  var downloadTC = WWW(urlTC);
  yield downloadTC; 
  GOH.GetComponent.<Renderer>().materials[1].mainTexture = downloadTC.texture;
     
  //textura hair
  var urlTCl = tCl; 
  var downloadTCl = WWW(urlTCl);
  yield downloadTCl; 
  GOH.GetComponent.<Renderer>().materials[0].mainTexture = downloadTCl.texture;
    
 }
}