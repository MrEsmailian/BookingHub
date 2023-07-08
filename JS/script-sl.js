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
async function signUp() {
    let username = document.getElementById("SUsername").value;
    let first_name = "Mammad";
    let last_name = "kachal";
    let address = "mashhad";
    let phone_number = document.getElementById("SPhone").value;
    let email = document.getElementById("SEmail").value;
    let password = document.getElementById("SPassword").value;
    let confirm = document.getElementById("SConfirm").value;
    if (username.value === "" || phone_number.value === "" || email.value === "" || password.value === "") {
        alert("Ensure you input a value in all fields!");
    } else if (password.value !== confirm.value) {
        alert("Ensure you have entered same password and confirmation")
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
        sign(username, first_name, last_name, address, phone_number, email, password);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8000/api/account', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function (){
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert(JSON.parse(xhr.responseText));
            } else {
                alert(xhr);
            }
        }
        xhr.send(entry);
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

function sign(username, first_name, last_name, address, phone_number, email, password) {
    // return new Promise((resolve, reject) => {
    //     try {
    //         $.ajax({
    //             url: 'http:localhost:8000'/api/account,
    //             type: 'POST',
    //             data: JSON.stringify({ username, first_name, last_name, address, phone_number, email, password }),
    //             contentType: 'application/json',
    //         }).done((response) => {
    //             if (response['authenticated']){
    //                 resolve({state: 'done', content: response});
    //                 alert(2);
    //             }else{
    //                 resolve({state: 'error', content: 'Email or password is incorrect'});
    //                 alert(3);
    //             }
    //         }).fail((errorThrown) => {
    //             reject({state: 'fail', content: errorThrown});
    //             alert(4);
    //         });
    //     }catch(error) {
    //         reject({state: 'catch', content: error});
    //         alert(5);
    //     }
    // });
}

function toastFunction(msg) {
    var x = document.getElementById("snackbar");
    x.innerHTML = msg;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}