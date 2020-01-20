if (preserveLights==undefined) then
(
 fileIn("C:/Users/HELIX/Documents/OficinaCluster/Assets/LightmappingTools/maxscriptEngine.ms")
)
global SaveDir="C:/Users/HELIX/Documents/OficinaCluster/Assets/Oficina/"
global presetDir="C:/Users/HELIX/Documents/OficinaCluster/MaxFiles/"
global sceneName="Oficina"
global fileFormat=".tif"
if (not fileExists(presetDir + sceneName + ".max")) then (
 saveMaxFile (presetDir + sceneName + ".max") clearNeedSaveFlag:false useNewFile:true quiet:true rIndex=-1
 for i=1 to RendererClass.classes.count while (rIndex==-1) do (if ((findString (RendererClass.classes[i] as string) "mental")!=undefined) then rIndex=i)
 if(rIndex!=-1) then(
     renderers.current=RendererClass.classes[rIndex]()
     messagebox("Mental Ray renderer assigned!")
 )
 else(
     messagebox("Mental Ray was not found in your system.")
 )
)
if ((maxFileName == undefined) or (maxFileName == "")) then (loadMaxFile (presetDir + sceneName + ".max"))
global conversorPath="C:/Users/HELIX/Documents/OficinaCluster/Assets/LightmappingTools/conversor.mse"
global resArray=#( 4096,4096,4096,8192,8192,2048,2048,2048,2048,2048)
toRemove =#()
for i in currentMaterialLibrary do (append toRemove i.name)
for i in toRemove do (deleteItem currentMaterialLibrary(i))
toRemove =#()
for i in Geometry do
(
    if ((findString i.name "ImportedObj")!=undefined) then
    (
	    try
	    (
		    append currentMaterialLibrary i.material
		    print (i.material.name + " Material added to Material Library")
	    )
	    catch()
		append toRemove i
    )
)
for i in toRemove do (delete i)
try
(
    FbxImporterSetParam "Mode" "merge"
)
catch(
    print "There was a problem with setting 'merge' option in the FBX importer. Try downloading a newer version."
)
try
(
    FbxImporterSetParam "SmoothingGroups" false
)
catch(
    print "There was a problem with setting of re-evalute normals option off"
)
try
(
 FbxImporterSetParam "Lights" true
)
catch(
    print "There was a problem with setting 'Lights' option in the FBX importer. Try downloading a newer version."
)
importFile (presetDir + sceneName + ".fbx") #noPrompt using:FBXIMP
assignMaterials()
for i in Lights where ((findString i.name "ImportedLight")!=undefined) do(
 try(
  i.shadowGenerator = shadowMap()
  i.shadowGenerator.mapbias = 0.0
 )
 catch()
)
