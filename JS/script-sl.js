document.getElementById("log").addEventListener("submit", logIn());
document.getElementById("sign").addEventListener("submit", signUp());
document.getElementById("SPassword").addEventListener('input', passStrength());
function logIn(){
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
    }
}
function signUp(){
    let username = document.getElementById("SUsername").value;
    let phone = document.getElementById("SPhone").value;
    let email = document.getElementById("SEmail").value;
    let password = document.getElementById("SPassword").value;
    let confirm = document.getElementById("SConfirm").value;

    if (username.value === "" || phone.value === "" || email.value === "" || password.value === "") {
        alert("Ensure you input a value in all fields!");
    } else if (password.value !== confirm.value) {
        alert("Ensure you have entered same password and confirmation")
    } else {
        var data = {
            username,
            phone,
            email,
            password
        };
        var entry = JSON.stringify(data);
    }
}
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