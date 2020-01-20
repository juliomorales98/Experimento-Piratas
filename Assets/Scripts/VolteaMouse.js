var lookTarget : Vector3;
 
function LateUpdate() {
    var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
    var hit : RaycastHit;
    if (Physics.Raycast (ray, hit)) {
        lookTarget = hit.point;
    }
 
    transform.LookAt(lookTarget);
 
}