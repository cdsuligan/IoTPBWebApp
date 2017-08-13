/* SUBMIT LOGIN DETAILS */
function submitLogin(){
    var username = document.getElementById("usernameLogin").value;
    var password = document.getElementById("passwordLogin").value;
    //alert("username: " + username);
    //alert("Reached submitLogin");
    loginUser(username, password);
}

/* POST REQUEST */
/* Logs in a user if the credentials are correct. */
function loginUser(username, password){
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Users/" + username;
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
        result = xhr.responseText;
        result = result.replace(/['"]+/g, '');
        resultList = result.split("~");
        console.log(this.responseText);
        if (xhr.status == "200") { //Username exists
            console.log(resultList);
            if (String(password) == String(resultList[1])){ //Correct password
                window.location.href = "home.html";
                saveCredentials(username, password);
                //document.getElementById("usernameLogin").innerHTML = "";
                //document.getElementById("passwordLogin").innerHTML = "";
           }
           else{
                alert("Login failed.");
           }
        } 
        else {
            alert("Unknown username.");
        }
    }
    xhr.send(null);
}



/* GET VALUE OF AN ELEMENT IN A DIFFERENT HTML PAGE USING ID */
/* NOT WORKING */
/*function getValue(elementID, elementPage){
    $.get(elementPage, null, function(text){
        return($(text).find(elementID));
    });
}*/



/* CHECKS IF THE USER LOGGED IN IS AN ADMIN */
/*function isAdmin(){
    $(function(){
        $.get('index.html', function(result){
            var  = $(result).find('usernameLogin');
            //var page1X = $(result).find('div.myData').data('x');
            //var page1Y = $(result).find('div.myData').data('y');
        });
    });

    
    usernameLogin = document.getElementById("usernameLogin").value;
    alert("usernameLogin: " + usernameLogin);
    //usernameLogin = getValue ("usernameLogin", "index.html");
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Users/" + usernameLogin;
    
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
        alert(xhr.responseText);
        result = xhr.responseText;
        resultList = result.split("~");
        resultListLen = resultList.length;

        if (resultList[2] == "1"){
            return true;
        }
        else{
            return false;
        }
    }

}*/

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
            resultList = result.split("~");
            resultListLen = resultList.length;
            content = "";

            console.log(this.responseText);

            for (i=0; i<resultListLen-1; i++){
                content += "<tr><td class='TableDataUsername'>" + resultList[i] + "</td>" //username
                i++;
                content += "<td class='TableDataPassword'>" + resultList[i] + "</td>" //password
                i++;
                if (resultList[i] == 1){
                    content += "<td class='TableDataAdmin'>" + "Yes" + "</td>" //admin
                }

                else{
                    content += "<td class='TableDataAdmin'></td>" //admin
                }
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
                deleteUser($username);
            });
        }
    };
    xhr.send(null);
}

/* DELETE A USER */
/* WORKS!*/
function deleteUser(username){
    /*if (isAdmin() == false){ //Not an admin
        alert ("Sorry, you do not have the permission to delete a  user.");
    }
    else {*/
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
    /*if (isAdmin() == false){ //Not an admin
        alert ("Sorry, you do not have the permission to add a new user.");
    }
    else {*/
    username = document.getElementById("usernameInput").value;
    password = document.getElementById("passwordInput").value;
    adminCheck = document.getElementById("adminInput");
    admin = "";

    if (adminCheck.checked){
        admin = "1";
    }
    else{
        admin = "0";
    }

    //alert(username + " " + password);

    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Users/"
    xhr.open('POST', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    message = {"Username":username, "Password":password, "Admin":admin};
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

/**********************/
/***** LOCATIONS ******/
/**********************/
/* INITIALISE THE LOCATIONS WEBPAGE */
function locationsInit(){
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Locations"
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
        {
            result = xhr.responseText;
            result = result.replace(/['"]+/g, '');
            resultList = result.split("~");
            resultListLen = resultList.length;
            content = "";

            console.log(this.responseText);

            for (i=0; i<resultListLen-1; i++){
                content += "<tr><td style='display:none' class='TableDataLocationID'>" + resultList[i] + "</td>" //username
                i++;
                //pass = "*".repeat(resultList[i].length)
                //alert(pass);
                content += "<td class='TableDataLocationName'>" + resultList[i] + "</td>" //password
                i++;
                content += "<td class='TableDataLocationDesc'>" + resultList[i] + "</td>" //password
                content += "<td><a href='#' class='deleteBtn'><span class='glyphicon glyphicon-trash' style='color:white'></span></a></td></tr>";
            }
            version_d = document.getElementById("locations-table-body");
            version_d.innerHTML = content;

            //CLICKED DELETE BUTTON
            $(".deleteBtn").click(function() {
                var $locationID = $(this).closest("tr")   // Finds the closest row <tr> 
                                .find(".TableDataLocationID") // Gets a descendent with class="nr"
                                .text();    // Retrieves the text within <td>

                $("#resultas").append($locationID);       // Outputs the answer

                var $locationName = $(this).closest("tr")   // Finds the closest row <tr> 
                                .find(".TableDataLocationName") // Gets a descendent with class="nr"
                                .text();    // Retrieves the text within <td>

                $("#resultas").append($locationName);       // Outputs the answer

                var $locationDesc = $(this).closest("tr")   // Finds the closest row <tr> 
                                .find(".TableDataLocationDesc") // Gets a descendent with class="nr"
                                .text();    // Retrieves the text within <td>

                $("#resultas").append($locationDesc);       // Outputs the answer

                
                deleteLocation($locationID, $locationName, $locationDesc);
            });
        }
    };
    xhr.send(null);
}


/* ADD A LOCATION */
function addLocation () {
    locationName = document.getElementById("locationNameInput").value;
    locationDesc = document.getElementById("locationDescInput").value;
    alert(locationName + " " + locationDesc);

    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Locations/" 
    xhr.open('POST', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    message = {"LocationName":locationName, "LocationDesc":locationDesc};
    xhr.send(JSON.stringify(message));
    
    message = "";

    xhr.onload = function() {
        //alert(xhr.responseText);
        console.log(this.responseText);
        if (xhr.readyState == 4 && xhr.status == "201") {
            alert("Added new location '" + locationName + "' successfully.");
        } else {
            alert("Failed to add location'" + locationName + "'.");
        }
        locationsInit();
    }
    
}

function deleteLocation(locationID, locationName, locationDesc){
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Locations/" + locationID;
    xhr.open('DELETE', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    //message = {"LocationName":locationName, "LocationDesc":locationDesc};

    xhr.onload = function() {
        //alert(xhr.responseText);
        console.log(this.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            alert("Deleted location '" + locationName + "' successfully.");
        } else {
            alert("Failed to delete location'" + locationName + "'.");
        }
        locationsInit();
    }
    xhr.send(null);
}


/****************************/
/***** LOCATION ACCESS ******/
/****************************/
/* INITIALISE THE LOCATION ACCESS WEBPAGE */
/*function locationAccessInit(){
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/LocationAccesses"
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
        {
            result = xhr.responseText;
            result = result.replace(/['"]+/g, '');
            resultList = result.split("~");
            resultListLen = resultList.length;
            content = "";

            console.log(this.responseText);

            for (i=0; i<resultListLen-1; i++){
                content += "<tr><td style='display:none' class='TableDataLocationAccessID'>" + resultList[i] + "</td>" //username
                i++;
                //pass = "*".repeat(resultList[i].length)
                //alert(pass);
                content += "<td class='TableDataLocationNames'>" + resultList[i] + "</td>" //password
                i++;
                content += "<td class='TableDataUsers'>" + resultList[i] + "</td>" //password
                content += "<td><a href='#' class='deleteBtn'><span class='glyphicon glyphicon-trash' style='color:white'></span></a></td></tr>";
            }
            version_d = document.getElementById("locations-table-body");
            version_d.innerHTML = content;

            //CLICKED DELETE BUTTON
            $(".deleteBtn").click(function() {
                var $locationID = $(this).closest("tr")   // Finds the closest row <tr> 
                                .find(".TableDataLocationID") // Gets a descendent with class="nr"
                                .text();    // Retrieves the text within <td>

                $("#resultas").append($locationID);       // Outputs the answer

                var $locationName = $(this).closest("tr")   // Finds the closest row <tr> 
                                .find(".TableDataLocationName") // Gets a descendent with class="nr"
                                .text();    // Retrieves the text within <td>

                $("#resultas").append($locationName);       // Outputs the answer

                var $locationDesc = $(this).closest("tr")   // Finds the closest row <tr> 
                                .find(".TableDataLocationDesc") // Gets a descendent with class="nr"
                                .text();    // Retrieves the text within <td>

                $("#resultas").append($locationDesc);       // Outputs the answer

                
                deleteLocation($locationID, $locationName, $locationDesc);
            });
        }
    };
    xhr.send(null);
}*/

/********************/
/***** DEVICES ******/
/********************/
/* INITIALISE THE DEVICES WEBPAGE */
function devicesInit(){
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Devices"
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
        {
            result = xhr.responseText;
            result = result.replace(/['"]+/g, '');
            resultList = result.split("~");
            resultListLen = resultList.length;
            content = "";

            console.log(this.responseText);

            for (i=0; i<resultListLen-1; i++){
                content += "<tr><td style='display:none' class='TableDataDeviceID'>" + resultList[i] + "</td>" //username
                i++;
                content += "<td class='TableDataDeviceName'>" + resultList[i] + "</td>" //DeviceName
                i++;
                content += "<td class='TableDataDeviceLocation'>" + resultList[i] + "</td>" //DeviceLocation
                i++;
                content += "<td class='TableDataDeviceType'>" + resultList[i] + "</td>" //DeviceType
                i++;
                content += "<td class='TableDataDeviceProtocol'>" + resultList[i] + "</td>" //DeviceProtocol
                i++;
                content += "<td class='TableDataDeviceStatus'>" + resultList[i] + "</td>" //DeviceStatus
                i++;
                content += "<td class='TableDataDeviceAddress'>" + resultList[i] + "</td>" //DeviceAddress
                content += "<td><a href='#' class='deleteBtn'><span class='glyphicon glyphicon-trash' style='color:white'></span></a></td></tr>";
            }
            version_d = document.getElementById("locations-table-body");
            version_d.innerHTML = content;

            //CLICKED DELETE BUTTON
            $(".deleteBtn").click(function() {
                var $deviceID = $(this).closest("tr")   // Finds the closest row <tr> 
                                .find(".TableDataDeviceID") // Gets a descendent with class="nr"
                                .text();    // Retrieves the text within <td>

                $("#resultas").append($deviceID);       // Outputs the answer

                var $deviceName = $(this).closest("tr")   // Finds the closest row <tr> 
                                .find(".TableDataDeviceName") // Gets a descendent with class="nr"
                                .text();    // Retrieves the text within <td>

                $("#resultas").append($deviceName);       // Outputs the answer
                
                deleteDevice($deviceID, $deviceName);
            });
        }
    };
    xhr.send(null);
}


function deleteDevice(deviceID, deviceName){
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Devices/" + deviceID;
    xhr.open('DELETE', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onload = function() {
        //alert(xhr.responseText);
        console.log(this.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            alert("Deleted device '" + deviceName + "' successfully.");
        } else {
            alert("Failed to delete device'" + deviceName + "'.");
        }
        devicesInit();
    }
    xhr.send(null);
}