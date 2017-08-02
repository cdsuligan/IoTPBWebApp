/* SUBMIT LOGIN DETAILS */
function submitLogin(){
    var username = document.getElementById("inputerUsername").value;
    var password = document.getElementById("inputPassword").value;

    alert("Reached submitLogin");

    postUser(username, password);
}

/* POST REQUEST */
/* POST USERS(USERNAME, PASSWORD) */
function postUser(username, password){
    /*var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Users/"
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            alert(xhr.responseText);
        }
    }
    xhr.open('GET', uri, true);
    xhr.send(null);*/
    
    /*var xhr = new XMLHttpRequest();
    var uri = "http://iotpbwebsite.azurewebsites.net/api/Users"
    //xhr.open('GET', uri, true);
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        // do something to response
        alert(this.responseText);
        console.log(this.responseText);
    };
    //xhr.send('user=username&pwd=password');
    xhr.send(null);*/
}