var xhr = new XMLHttpRequest();
const access = localStorage.getItem("access");
xhr.open('GET', 'http://127.0.0.1:8000/api/account/', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', `Bearer ${access}`);
xhr.onreadystatechange = function (){
    if (xhr.status === 200) {
        var data = JSON.parse(xhr.response);
        document.getElementById("usernameP").innerHTML = data.username;
        document.getElementById("firstnameP").innerHTML = data.first_name;
        document.getElementById("lastnameP").innerHTML = data.last_name;
        document.getElementById("phoneP").innerHTML = data.phone_number;
        document.getElementById("emailP").innerHTML = data.email;
        document.getElementById("addrP").innerHTML = data.address;
        document.getElementById("username").value = data.username;
        document.getElementById("firstname").value = data.first_name;
        document.getElementById("lastname").value = data.last_name;
        document.getElementById("phone").value = data.phone_number;
        document.getElementById("email").value = data.email;
        document.getElementById("addr").value = data.address;
    } else {
        toastFunction("Couldn't load your profile");
    }
}
xhr.send();
document.getElementById("profForm").addEventListener('submit', async function (event){
    event.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://127.0.0.1:8000/api/account/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${access}`);
    let username = document.getElementById("username").value;
    let first_name = document.getElementById("firstname").value;
    let last_name = document.getElementById("lastname").value;
    let phone_number = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("addr").value;
    let data =
        { username, first_name, last_name, phone_number, email, address };
    let entry = JSON.stringify(data);
    xhr.onreadystatechange = function (){
        if (xhr.readyState === 4 && xhr.status === 200) {
            toastFunction("Edit is Done.");
        } else {
            toastFunction("Couldn't edit yor Profile");
        }
    }
    xhr.send(entry);
});
function toastFunction(msg) {
    var x = document.getElementById("toast");
    x.innerHTML = msg;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}