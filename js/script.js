/* SUBMIT LOGIN DETAILS */
function submitLogin(){
    var username = document.getElementById("usernameLogin").value;
    var password = document.getElementById("passwordLogin").value;

    //alert("Reached submitLogin");
    loginUser(username, password);
}

/* POST REQUEST */
/* Logs in a user if the credentials are correct. */
function loginUser(username, password){
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Users/" + username
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
        result = xhr.responseText;
        result = result.replace(/['"]+/g, '');
        resultList = result.split("_");
        console.log(this.responseText);
        if (xhr.status == "200") { //Username exists
            if (String(password) == String(resultList[1])){ //Correct password
                window.location.href = "home.html";
                document.getElementById("usernameLogin").innerHTML = "";
                document.getElementById("passwordLogin").innerHTML = "";

           }
           else{
                alert("Login failed.");
           }
        } 
        else {
            alert("Unknown username.");
        }
        // if (xhr.readyState == XMLHttpRequest.DONE) {
        //     //alert(xhr.responseText);
        //     window.location.href = "home.html";
        //     //window.location.replace("http://stackoverflow.com");
        // }
    }
    xhr.send(null);
}


/******************/
/***** USERS ******/
/******************/

/* INITIALISE THE USERS WEBPAGE */
function usersInit(){
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Users"
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
        {
            result = xhr.responseText;
            resultList = result.split(" ");
            resultListLen = resultList.length;
            content = "";

            console.log(this.responseText);

            for (i=0; i<resultListLen-1; i++){
                content += "<tr><td class='TableDataUsername'>" + resultList[i] + "</td>" //username
                i++;
                //pass = "*".repeat(resultList[i].length)
                //alert(pass);
                content += "<td class='TableDataPassword'>" + resultList[i] + "</td>" //password
                content += "<td><a href='#' class='deleteBtn'><span class='glyphicon glyphicon-trash' style='color:white'></span></a></td></tr>";
            }
            version_d = document.getElementById("users-table-body");
            version_d.innerHTML = content;

            //CLICKED DELETE BUTTON
            $(".deleteBtn").click(function() {
                var $username = $(this).closest("tr")   // Finds the closest row <tr> 
                                .find(".TableDataUsername") // Gets a descendent with class="nr"
                                .text();    // Retrieves the text within <td>

                $("#resultas").append($username);       // Outputs the answer

                var $password = $(this).closest("tr")   // Finds the closest row <tr> 
                                .find(".TableDataPassword") // Gets a descendent with class="nr"
                                .text();    // Retrieves the text within <td>

                $("#resultas").append($password);       // Outputs the answer
                deleteUser($username, $password);
            });
        }
    };
    xhr.send(null);
}

/* DELETE A USER */
/* WORKS!*/
function deleteUser(username, password){
    //alert("deleteUser: " + username + " " + password);

    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Users/"+username
    xhr.open('DELETE', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
        //alert(xhr.responseText);
        console.log(this.responseText);        
        if (xhr.readyState == 4 && xhr.status == "200") {
            alert("Deleted " + username + " successfully.");
        } else {
            alert("Failed to delete " + username + ".");
        }
        version_d = document.getElementById("users-table-body");
        version_d.innerHTML = "";
        usersInit();
    }
    xhr.send(null);

    
}

/* ADD A USER */
function addUser () {
    username = document.getElementById("usernameInput").value;
    password = document.getElementById("passwordInput").value;
    //alert(username + " " + password);

    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Users/"
    xhr.open('POST', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    message = {"Username":username, "Password":password};
    xhr.send(JSON.stringify(message));
    
    message = "";


    xhr.onload = function() {
        //alert(xhr.responseText);
        console.log(this.responseText);
        if (xhr.readyState == 4 && xhr.status == "201") {
            alert("Added " + username + " successfully.");
        } else {
            alert("Failed to add " + username + ".");
        }
        username = "";
        password = "";
        usersInit();
    }
    
}