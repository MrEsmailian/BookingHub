var xhr = new XMLHttpRequest();
const access = localStorage.getItem("access");
xhr.open('GET', 'http://127.0.0.1:8000/api/room/', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', `Bearer ${access}`);
xhr.onreadystatechange = function (){
    if (xhr.status === 200) {
        var response = JSON.parse(xhr.response)[0];
        var aside = document.getElementsByTagName("aside")[0];
        localStorage.setItem("id", response.id);
        aside.getElementsByTagName("h1")[0].innerHTML = response.hotel.name;
        aside.querySelector("#room-price").innerHTML = (Number(response.price) / 50000) + "$";
        aside.querySelector("#hotel-rating").innerHTML = response.hotel.rating + "&#9733;";
        aside.querySelector("#addr").innerHTML = response.hotel.address;
        aside.querySelector("#desc").innerHTML = response.hotel.description;
    } else {
        toastFunction("Couldn't load your profile");
    }
}
xhr.send();
document.getElementById("reserve").addEventListener('submit', async function (event) {
    event.preventDefault();
    var room_id = localStorage.getItem("id");
    var check_in = document.getElementById("checkIn").value;
    var check_out = document.getElementById("checkOut").value;
    var data = {
        room_id,
        check_in,
        check_out
    };
    var entry = JSON.stringify(data);
    var xhr1 = new XMLHttpRequest();
    xhr1.open('POST', 'http://127.0.0.1:8000/api/reservations/room/', true);
    xhr1.setRequestHeader('Content-Type', 'application/json');
    xhr1.setRequestHeader('Authorization', `Bearer ${localStorage.getItem("access")}`);
    xhr1.onreadystatechange = function (){
        if (xhr1.readyState === 4 && xhr1.status === 200) {
            toastFunction("Done...");
        } else {
            toastFunction("something went wrong");
        }
    }
    xhr1.send(entry);
});
function toastFunction(msg) {
    var x = document.getElementById("toast");
    x.innerHTML = msg;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}