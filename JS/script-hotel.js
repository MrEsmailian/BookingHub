let array = [];
var xhr = new XMLHttpRequest();
const access = localStorage.getItem("access");
xhr.open('GET', 'http://127.0.0.1:8000/api/Hotel/', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onreadystatechange = function (){
    if (xhr.readyState == 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.response);
        var list = document.getElementsByTagName("section")[0];
        for (let i = 0; i < response.length; i++) {
            let newData = response[i];
            list.innerHTML =
                `${list.innerHTML} <div id="${newData.id}" className="reserve col-12 col-sm-6 col-md-4 col-lg-3 px-4">
                    <a href="Reserve.html?${newData.id}">
                        <div className="image-star">
                        <div className="progressing-bar"></div>
                        <img src="..\\..\\newProject\\OnlineReservation\\${newData.img}" alt="hotel pic">
                        <video className="myVideo" preload="auto">
                            <source src="../SRC/tem.mp4" type="video/mp4">
                        </video>
                        <div className="star-rating F-small">&#9733;<span className="star C-Black">&#9733;</span><span
                            className="rating C-White">${newData.rating}</span></div>
                        </div>
                        <div className="description">
                            <h5 className="C-White F-small">${newData.name}-${newData.city}</h5>
                            <h5 className="F-small" style="color: gold">000$</h5>
                        </div>
                    </a>
                </div>`
        }
    } else {
        toastFunction("Couldn't load your profile");
    }
}
xhr.send();