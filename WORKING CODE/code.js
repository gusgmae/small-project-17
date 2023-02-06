// Update urlBase with IP of droplet until URL is defined
const urlBase = '../API' //updated by judah, should link to php file responsible for handling the call
const extension = 'php'

function sendLogin()
{
    firstName = "";
    lastName = "";

    // Get user and password from html elements
    let login = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    document.getElementById("ErrorMessage").innerHTML = "";

    let dict = {login:login, password:password};

    // Create JSON payload
    let jsonPayload = JSON.stringify(dict);

    let url = urlBase + '/Login.' + extension;

    // Initialize a request to server
    let xhr = new XMLHttpRequest();
    // Send POST request to API endpoint
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;

                if (userId < 1)
                {
                    document.getElementById("serverMessage").innerHTML = "User/Pass not valid";
                    return;
                }

                firstName = jsonObject.firstname;
                lastName = jsonObject.lastName;

                // Use this to change webpages if login is successful
                window.location.href = "contacts.html";
            }
        };
        // Send request
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("serverMessage").innerHTML = err.message;
    }
}

function sendLogout()
{

}

function createContact()
{
    // Get information from create contact form
    let Name = document.getElementById("Name").value;
    let Email = document.getElementById("Email").value;
    let PhoneNumber = document.getElementById("PhoneNumber").value;
    let DateCreated = document.getElementById("DateCreated").value;
    // API should access the database and store the uid for this contact so it may be edited later

    // Create JSON payload this will be changed when API is working
    let dict = {}
    let jsonPayload = JSON.stringify(dict);

    // Define API endpoint
    let url = urlBase + '/AddContact.' + extension;
    // Initialize request
    let xhr = new XMLHttpRequest();
    //Open request
    xhr.open("POST", url, true);
    //Set request headers
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                document.getElementById("serverMessage").innerHTML = "Color has been added"
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("serverMessage").innerHTML = err.message;
    }
}

function readContact()
{

}

function updateContact()
{

}

function deleteContact()
{

}

function createUser()
{
//navigation to php page. urlbase and extension will always be the same. middle section format is /'filename'.
 let url = urlBase + '/CreateUser.' + extension;
 //setup connection to php
 const xmlhttp = new XMLHttpRequest();
 //open connection
 xmlhttp.open("POST", url);

// create dictionary to turn into json object
 let dict = {
                 // key:data. get element id needs to match html id
                "fName":document.getElementById("fName").value,
                "lName":document.getElementById("lName").value,
                "email":document.getElementById("email").value,
                "password":document.getElementById("password").value
             };
   //create json object and send it to php file
    xmlhttp.send(JSON.stringify(dict));
    
 //provide user feedback. not needed if different feedback gets created by frontend design
window.alert("user created");
}