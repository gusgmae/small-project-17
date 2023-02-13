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

function addContact()
{
//doens't work and i can't figure out why. php script is for usre being called. i can't get any logging or text box changes to work even in createUser which is for sure working also. so i can't even figure out how to see if this function is being called. but either it isn't or it isn't calling the php.

    // Define API endpoint
    let url = urlBase + '/AddContact.' + extension;
    // Initialize request
    const xhr = new XMLHttpRequest();
    // Open request
    xhr.open("POST", url);
    // Create JSON payload
    let dict = {
    "name":document.getElementById("Name").value,
    "email":document.getElementById("Email").value,
    "phoneNumber":document.getElementById("PhoneNumber").value,
    "userEmail":document.getElementById("User").value
    };
    
    // Send request
    xhr.send(JSON.stringify(dict));
}

//myemail@gmail.com

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

function testLogin(){
  
  
  let url = urlBase + '/login.' + extension;
  let dict = {
                "username":document.getElementById("username").value,
                "password":document.getElementById("password").value
  };
  
  if( dict.username == "" || dict.password == "")
    {
      window.alert("Please enter both a username and a password");
      return;
    
    }
  
  
  fetch(url,{
    method: 'POST',
    body: JSON.stringify(dict)
  
  }).then(res => {
      return res.json()
      })
      .then(data => {
      if (data.Password != dict.password)
        window.alert("Username and Password do not match");
      else{
        window.alert("Logging you in");  
        window.location.href ="contacts.html";
        }
          })
      .catch(error => window.alert("Username not found"))



}



function deleteUser()
{
  //needs to send ID and UserName
}