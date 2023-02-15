let url = '' // TODO Fill this out based on yaml

function Register()
{
    let fnameVal = document.getElementById("fname").value;
    let lnameVal = document.getElementById("lname").value;
    let emailVal = document.getElementById("email").value;
    let passVal = document.getElementById("password").value;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fname : fnameVal,
            lName : lnameVal,
            email : emailVal,
            password : passValu
        })
    }).then(res => {
        return res.json()
    }).then(data => console.log(data)).catch(error => console.log('ERROR'))
}

function Login()
{
    let userVal = document.getElementById("username").value;
    let passVal = document.getElementById("password").value;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username : userVal,
            password : passVal
        })
    }).then(res => {
        createCookie(userVal, passVal, 3);
        return res.json()
    }).then(data => console.log(data)).catch(error => console.log('ERROR'))
}

function Read()
{
    let uid = document.getElementById("uid").value;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uid : 'AlexTest',
        })
    }).then(res => {
        return res.json()
    }).then(data => console.log(data)).catch(error => console.log('ERROR'))
}

function createCookie(uid, pass, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = uid + "=" + pass + ";" + exdays + ";path=/";
}

function decodeCookie()
{
    let data = document.cookie.split(",");
    for(split in data)
    {
        let curr = split.trim();
        let tokens = curr.split("=");
        username = tokens[1];
        userID = tokens[0];
    }
}

// get reference to the contact list HTML element
const contactList = document.getElementById('contact-list');

// function to create a contact HTML element with edit and delete buttons
function createContactElement(contact) {
	// create the HTML elements
	const contactElement = document.createElement('div');
	const fname = document.createElement('span');
	const email = document.createElement('span');
	const password = document.createElement('span');
	const editButton = document.createElement('button');
	const deleteButton = document.createElement('button');
	
	// set the text and attributes of the HTML elements
	fname.textContent = `${contact.firstname} ${contact.lastname}`;
	email.textContent = contact.email;
	password.textContent = contact.password;
	editButton.textContent = 'Edit';
	editButton.setAttribute('data-id', contact.id);
	deleteButton.textContent = 'Delete';
	deleteButton.setAttribute('data-id', contact.id);
	
	// add event listeners to the edit and delete buttons
	editButton.addEventListener('click', editContact);
	deleteButton.addEventListener('click', deleteContact);
	
	// append the HTML elements to the contact element
	contactElement.appendChild(fname);
	contactElement.appendChild(document.createElement('br'));
	contactElement.appendChild(email);
	contactElement.appendChild(document.createElement('br'));
	contactElement.appendChild(password);
	contactElement.appendChild(document.createElement('br'));
	contactElement.appendChild(editButton);
	contactElement.appendChild(deleteButton);
	
	return contactElement;
}

// function to fetch and display the contact information
function displayContacts() {
	fetch(url)
	.then(response => response.json())
	.then(contacts => {
		// create a contact element for each contact and append it to the contact list
		contacts.forEach(contact => {
			const contactElement = createContactElement(contact);
			contactList.appendChild(contactElement);
		});
	})
	.catch(error => {
		// displays error
		alert(error.message);
	});
}

// function to edit a contact
function editContact(event) {
	// get the ID of the contact to edit from the button's data-id attribute
	const id = event.target.getAttribute('data-id');
	
	// TODO: implement editing functionality
}

// function to delete a contact
function deleteContact(event) {
	// get the ID of the contact to delete from the button's data-id attribute
	const id = event.target.getAttribute('data-id');
	
	// send a DELETE request to the API to delete the contact
	fetch(`${url}/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`
		}
	})
	.then(response => {
		if (response.ok) {
			// remove the contact element from the contact list
			event.target.parentNode.remove();
		} else {
			// display an error message
			throw new Error('Failed to delete contact');
		}
	})
	.catch(error => {
		alert(error.message);
	});
}

// fetch and display the contact information when the page loads
displayContacts();