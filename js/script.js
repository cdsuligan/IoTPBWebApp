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
                //saveCredentials(username, password);
                localStorage.setItem("currentUser", username);
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
    usernameLogin = localStorage.getItem("currentUser"); // you will have to parse
    alert("usernameLogin: " + usernameLogin);
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Users/" + usernameLogin;
    
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');

    resultList = "";

    xhr.onload = function() {
        //alert("SUCCESS HERE");
        result = xhr.responseText;
        result = result.replace(/['"]+/g, '');
        resultList = result.split("~");
        resultListLen = resultList.length;
    }
    xhr.send(null);

    if (resultList[2] != 1){
        alert("resultList:" + resultList[1]. + " " + resultList[2]);
        return "no";
    }
    else{
        return "yes";
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
                content += "<td class='TableDataPassword'>&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;</td>" //password
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
    /*userIsAdmin = isAdmin();
    //alert("userIsAdmin: "+ userIsAdmin);
    if (userIsAdmin == "no"){ //Not an admin
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
    //alert(locationName + " " + locationDesc);

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
            version_d = document.getElementById("devices-table-body");
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

/* DELETE A DEVICE */
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
            alert("Failed to delete device '" + deviceName + "'.");
        }
        devicesInit();
    }
    xhr.send(null);
}

/* ADD A NEW DEVICE */
function addDevice() {
    
    deviceName = document.getElementById("deviceNameInput").value;

    deviceLocation = document.getElementById("deviceLocations");
    deviceLocation2 = deviceLocation.options[deviceLocation.selectedIndex].value;

    deviceType = document.getElementById("deviceTypes");
    deviceType2 = deviceType.options[deviceType.selectedIndex].value;

    deviceProtocol = document.getElementById("deviceProtocols");
    deviceProtocol2 = deviceProtocol.options[deviceProtocol.selectedIndex].value;

    deviceStatus = document.getElementById("deviceStatus");
    deviceStatus2 = deviceStatus.options[deviceStatus.selectedIndex].value;

    deviceAddress = document.getElementById("deviceAddressInput").value;
    
    //var e = document.getElementById("ddlViewBy");
    //var strUser = e.options[e.selectedIndex].value;
    
    //alert(locationName + " " + locationDesc);

    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Devices/" 
    xhr.open('POST', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    message = {"DeviceName":deviceName, "DeviceLocation":deviceLocation2, "DeviceTypeID":deviceType2, "ProtocolID":deviceProtocol2, "StatusID":deviceStatus2, "DeviceAddress":deviceAddress};
    xhr.send(JSON.stringify(message));
    
    //alert("message: " + JSON.stringify(message));

    message = "";
    xhr.onload = function() {
        //alert(xhr.responseText);
        console.log(this.responseText);
        if (xhr.readyState == 4 && xhr.status == "201") {
            alert("Added new device '" + deviceName + "' successfully.");
        } else {
            alert("Failed to add device '" + deviceName + "'.");
        }
        devicesInit();
    }
    
}

/* SET UP ADD NEW DEVICE MODAL */
function setUpDevicesModal(){
    getLocations();
    getDeviceTypes();
    getProtocols();
    getStatus();
}

/* GET LOCATIONS LIST */
function getLocations(){
    
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Locations"
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
            result = xhr.responseText;
            result = result.replace(/['"]+/g, '');
            resultList = result.split("~");
            resultListLen = resultList.length;
            content = "";
            console.log(this.responseText);

            for (i=0; i<resultListLen-1; i++){
                content += "<option value='" + resultList[i] + "'>" //locationID
                i++;
                content += resultList[i] + "</option>" //locationID
                i++;
            }
            version_d = document.getElementById("deviceLocations");
            version_d.innerHTML = content;
    }
    xhr.send(null);
}

/* GET DEVICE TYPES LIST */
function getDeviceTypes(){
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/DeviceTypes"
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
            result = xhr.responseText;
            result = result.replace(/['"]+/g, '');
            resultList = result.split("~");
            resultListLen = resultList.length;
            content = "";
            console.log(this.responseText);

            for (i=0; i<resultListLen-1; i++){
                content += "<option value='" + resultList[i] + "'>" //locationID
                i++;
                content += resultList[i] + "</option>" //locationID
            }
            version_d = document.getElementById("deviceTypes");
            version_d.innerHTML = content;
    }
    xhr.send(null);
}

/* GET PROTOCOLS LIST */
function getProtocols(){
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Protocols"
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
            result = xhr.responseText;
            result = result.replace(/['"]+/g, '');
            resultList = result.split("~");
            resultListLen = resultList.length;
            content = "";
            console.log(this.responseText);

            for (i=0; i<resultListLen-1; i++){
                content += "<option value='" + resultList[i] + "'>" //locationID
                i++;
                content += resultList[i] + "</option>" //locationID
            }
            version_d = document.getElementById("deviceProtocols");
            version_d.innerHTML = content;
    }
    xhr.send(null);
}


/* GET PROTOCOLS LIST */
function getStatus(){
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Status"
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
            result = xhr.responseText;
            result = result.replace(/['"]+/g, '');
            resultList = result.split("~");
            resultListLen = resultList.length;
            content = "";
            console.log(this.responseText);

            for (i=0; i<resultListLen-1; i++){
                content += "<option value='" + resultList[i] + "'>" //locationID
                i++;
                content += resultList[i] + "</option>" //locationID
            }
            version_d = document.getElementById("deviceStatus");
            version_d.innerHTML = content;
    }
    xhr.send(null);
}




/****************************/
/***** LOCATION ACCESS ******/
/****************************/
/* INITIALISE THE LOCATION ACCESS WEBPAGE */
function locationAccessInit(){
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api//LocationAccesses"
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
                content += "<tr><td style='display:none' class='TableDataLocationAccessIDLA'>" + resultList[i] + "</td>" //username
                i++;
                //pass = "*".repeat(resultList[i].length)
                //alert(pass);
                content += "<td class='TableDataLocationIDLA'>" + resultList[i] + "</td>" //password
                i++;
                content += "<td class='TableDataUsernameLA'>" + resultList[i] + "</td>" //password
                content += "<td><a href='#' class='deleteBtn'><span class='glyphicon glyphicon-trash' style='color:white'></span></a></td></tr>";
            }
            version_d = document.getElementById("locationaccesses-table-body");
            version_d.innerHTML = content;

            //CLICKED DELETE BUTTON
            $(".deleteBtn").click(function() {
                var $locationAccessIDLA = $(this).closest("tr")   // Finds the closest row <tr> 
                                .find(".TableDataLocationAccessIDLA") // Gets a descendent with class="nr"
                                .text();    // Retrieves the text within <td>

                $("#resultas").append($locationAccessIDLA);       // Outputs the answer

                var $locationIDLA = $(this).closest("tr")   // Finds the closest row <tr> 
                                .find(".TableDataLocationIDLA") // Gets a descendent with class="nr"
                                .text();    // Retrieves the text within <td>

                $("#resultas").append($locationIDLA);       // Outputs the answer

                var $usernameLA = $(this).closest("tr")   // Finds the closest row <tr> 
                                .find(".TableDataUsernameLA") // Gets a descendent with class="nr"
                                .text();    // Retrieves the text within <td>

                $("#resultas").append($usernameLA);       // Outputs the answer

                
                deleteLocationAccess($locationAccessIDLA, $locationIDLA, $usernameLA);
            });
        }
    };
    xhr.send(null);
}

/* DELETE LOCATION ACCESS */
function deleteLocationAccess(locationAccessIDLA, locationIDLA, usernameLA){
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/LocationAccesses/" + locationAccessIDLA;
    xhr.open('DELETE', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onload = function() {
        //alert(xhr.responseText);
        console.log(this.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            alert("Deleted '" + usernameLA + "'s access for location '"+ locationAccessIDLA + "' successfully.");
        } else {
            alert("Failed to delete location access for '" + usernameLA + "'.");
        }
        locationAccessInit();
    }
    xhr.send(null);
}

/* ADD A NEW LOCATION ACCESS */
function addLocationAccess() {
    
    locationsLA = document.getElementById("locationsLA");
    locationsLA2 = locationsLA.options[locationsLA.selectedIndex].value;

    usersLA = document.getElementById("usersLA");
    usersLA2 = usersLA.options[usersLA.selectedIndex].value;

    //alert("Here addlocationaccess");
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/LocationAccesses/"
    xhr.open('POST', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    message = {"LocationID":locationsLA2, "Username":usersLA2};
    xhr.send(JSON.stringify(message));
    
    //alert("message: " + JSON.stringify(message));

    message = "";
    xhr.onload = function() {
        //alert(xhr.responseText);
        console.log(this.responseText);
        if (xhr.readyState == 4 && xhr.status == "201") {
            alert("Access granted.");
        } else {
            alert("Access allocation already exists.");
        }
        locationAccessInit();
    }
    
}

/* SET UP ADD NEW DEVICE MODAL */
function setUpLocationAccessesModal(){
    getLocationsLA();
    getUsersLA();
}


/* GET LOCATIONS LIST */
function getLocationsLA(){
    
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Locations"
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
            result = xhr.responseText;
            result = result.replace(/['"]+/g, '');
            resultList = result.split("~");
            resultListLen = resultList.length;
            content = "";
            console.log(this.responseText);

            for (i=0; i<resultListLen-1; i++){
                content += "<option value='" + resultList[i] + "'>" //locationID
                i++;
                content += resultList[i] + "</option>" //locationID
                i++;
            }
            version_d = document.getElementById("locationsLA");
            version_d.innerHTML = content;
    }
    xhr.send(null);
}


/* GET USERS LIST */
function getUsersLA(){
    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Users"
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
            result = xhr.responseText;
            result = result.replace(/['"]+/g, '');
            resultList = result.split("~");
            resultListLen = resultList.length;
            content = "";
            console.log(this.responseText);

            for (i=0; i<resultListLen-1; i++){
                content += "<option value='" + resultList[i] + "'>" + resultList[i] + "</option>" //username
                i++;
                i++;
                //content += resultList[i] + "</option>" //password
                //i++;
            }
            version_d = document.getElementById("usersLA");
            version_d.innerHTML = content;
    }
    xhr.send(null);
}


/**********************/
/*** CONTROL DEVICES***/
/**********************/

function controlDevicesInit(){

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
                content += "<tr id='controldevicestr'><td style='display:none' id='TableDataControlDevicesID'>" + resultList[i] + "</td>" //username
                i++;
                //pass = "*".repeat(resultList[i].length)
                //alert(pass);
                content += "<td class='TableDataControlDevicesLocationName'>" + resultList[i] + "</td>" //LocationName
                i++;
                content += "<td class='TableDataControlDevicesLocationDesc'>" + resultList[i] + "</td>" //LocationDesc
                content += "</tr>";
            }
            version_d = document.getElementById("control-devices-locations-table-body");
            version_d.innerHTML = content;


            $(document).ready(function(){
            $('tbody#control-devices-locations-table-body tr').on('click',function() {
                //alert($(this).find('td:first').text());
                controlDevicesInit2($(this).find('td:first').text());
            });
            });
        }
    };
    xhr.send(null);
}


function controlDevicesInit2(locationID){
    document.getElementById('control-devices-status').style.display = 'inline-block';
    document.getElementById('control-devices-location').style.display = 'none';
    document.getElementById('control-devices-device').style.display = 'inline-block';
    //document.getElementById('control-devices-MAC-address').style.display = 'inline-block';
    document.getElementById('control-devices-locations-table-body').style.display = 'none';

    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/Locations/" + locationID;
    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
        {
            result = xhr.responseText;
            result = result.replace(/['"]+/g, '');
            resultList = result.split("~");
            resultListLen = resultList.length;
            content = "";

            // Change "Control Devices" header to selected room //OK
            version_d = document.getElementById("control-devices-header");
            version_d.innerHTML = resultList[0];
                     
            console.log(this.responseText);
            // Show devices and their status
            for (i=1; i<resultListLen-1; i++){


                content += "<tr><td class='ControlDevicesMACAddress'>" + resultList[i] + "</td>"; //MAC Address
                i++;
                //pass = "*".repeat(resultList[i].length)
                //alert(pass);
                content += "<td class='ControlDevicesDevices'>" + resultList[i] + "</td>"; //DeviceName
                i++;
                var currentStatus = resultList[i]; //Current status
                content += "<td class='ControlDevicesStatus'><label class='switch'>";

                if (currentStatus.toUpperCase() === "ON"){ // Current status is ON
                    content += "<input class='toggleSwitches' type='checkbox' checked data-toggle='toggle' onclick='javascript:toggle(this);'>";}

                else {
                    content += "<input class='toggleSwitches' type='checkbox'>";}

                content += "<span class='slider round'></span></label></td></tr>";
            }
            version_d = document.getElementById("control-devices-devices-table-body");
            version_d.innerHTML = content;

            //CLICKED ONE OF THE TOGGLE BUTTONS
            $(".toggleSwitches").click(function() {
                var $ControlDevicesMACAddress = $(this).closest("tr")   // Finds the closest row <tr> 
                                .find(".ControlDevicesMACAddress") // Gets a descendent with class="nr"
                                .text();    // Retrieves the text within <td>

                $("#resultas").append($ControlDevicesMACAddress);       // Outputs the answer

                if($(this).is(':checked')){ // Checks if the user wants to switch ON
                    switchDeviceStatus($ControlDevicesMACAddress, "ON");
                    //alert("ControlDevicesMACAddress: " + $ControlDevicesMACAddress + " NewStatus: ON"); // The user wants to switch ON
                }

                else{
                    switchDeviceStatus($ControlDevicesMACAddress, "OFF");
                    //alert("ControlDevicesMACAddress: " + $ControlDevicesMACAddress + " NewStatus: OFF"); // The user wants to switch OFF
                }
            });
        }
    };
    xhr.send(null);
}

function switchDeviceStatus(MACAddress, newStatus){
    //alert("MACAddress: " + MACAddress + " newStatus: " + newStatus);

    var xhr = new XMLHttpRequest();
    var uri = "http://localhost:60724/api/WebAppToRPi?NewStatus=" + newStatus + "&MACAddress=" + MACAddress; 
    alert("uri: " + uri);
    xhr.open('POST', uri, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    //message = {"NewStatus":newStatus, "MACAddress":MACAddress};
    //xhr.send(JSON.stringify(message));
    xhr.send(uri);
    //alert("message: " + JSON.stringify(message));
    //message = "";

    /*xhr.onload = function() {
        //alert(xhr.responseText);
        console.log(this.responseText);
        if (xhr.readyState == 4 && xhr.status == "201") {
            alert("Added " + username + " successfully.");
        } else {
            alert("Failed to add " + username + ".");
        }
        newStatus = "";
        MACAddress = "";
    }*/

}