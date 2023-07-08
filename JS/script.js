var isSure = false;
function delete_reserve(x) {
    if(isSure) {
        document.getElementById(""+x).style.visibility = "hidden"
    } else {
        alert("after removing the reservation you won't be able to undo it.");
        isSure = true;
    }
}