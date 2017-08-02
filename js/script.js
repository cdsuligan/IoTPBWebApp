/* SUBMIT LOGIN DETAILS */
function submitLogin(){
    var username = document.getElementById("inputerUsername").value;
    var password = document.getElementById("inputPassword").value;

    alert("Reached submitLogin");

    if (username.length < 1){
        alert("Username is too short.");
    }

    else{
        postUser(username, password);
    }
}

/* POST REQUEST */
/* POST USERS(USERNAME, PASSWORD) */
function postUser(username, password){
    var xhr = new XMLHttpRequest();
    var uri = "http://iotpbwebportal.azurewebsites.net/api/Users"
    xhr.open('POST', uri, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        // do something to response
        alert(this.responseText);
        console.log(this.responseText);
    };
    xhr.send('user=person&pwd=password&organization=place&requiredkey=key');
}