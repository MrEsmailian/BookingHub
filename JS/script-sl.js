document.getElementById("SPassword").addEventListener('input', passStrength());
document.getElementById("signForm").addEventListener('submit', async function (event){
    event.preventDefault();
    let username = document.getElementById("SUsername").value;
    let first_name = "NoFirstName";
    let last_name = "NoLastName";
    let address = "NoAddress";
    let phone_number = document.getElementById("SPhone").value;
    let email = document.getElementById("SEmail").value;
    let password = document.getElementById("SPassword").value;
    let confirm = document.getElementById("SConfirm").value;
    if (username.value === "" || phone_number.value === "" || email.value === "" || password.value === "") {
        toastFunction("Ensure you input a value in all fields!");
    } else if (password.value !== confirm.value) {
        toastFunction("Ensure you have entered same password and confirmation")
    } else {
        var data = {
            username,
            first_name,
            last_name,
            address,
            phone_number,
            email,
            password
        };
        var entry = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8000/api/account/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function (){
            if (xhr.readyState === 4 && xhr.status === 201) {
                toastFunction("Sign up is Done.")
            }
        }
        xhr.send(entry);
    }
});

document.getElementById("loginForm").addEventListener('submit', async function (event) {
    event.preventDefault();
    let username = document.getElementById("LUsername").value;
    let password = document.getElementById("LPassword").value;
    if (username.value === "" || password.value === "") {
        alert("Ensure you input a value in both fields!");
    } else {
        var data = {
            username,
            password
        };
        var entry = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8000/api/token/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function (){
            if (xhr.readyState === 4 && xhr.status === 200) {
                localStorage.setItem("access", JSON.parse(xhr.response).access);
                window.location.href = '../HTML/Profile.html';
            }
        }
        xhr.send(entry);
    }
});
function passStrength(){
    const password = document.getElementById("SPassword");
    const strength= document.getElementById("strength");

    password.addEventListener('input', () => {
        const passwordValue = password.value;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (regex.test(passwordValue)) {
            strength.style.width = "100%";
            strength.className = "bg-success";
        } else {
            let value = (passwordValue.length > 8)?75:(50 * passwordValue.length / 8) + 1;
            strength.className = (value === 75)?"bg-warning":"bg-danger";
            strength.style.width = value + "%";
        }
    });
}
function toastFunction(msg) {
    var x = document.getElementById("toast");
    x.innerHTML = msg;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}