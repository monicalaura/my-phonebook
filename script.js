
// Get vars
let quickAddBtn = document.getElementById('QuickAdd'); 
let addBtn = document.getElementById('Add');
let cancelBtn = document.getElementById('Cancel');
let addFormDiv = document.querySelector('.quickaddForm');
let addressBook = document.querySelector('.book'); //address book display
let filterInput = document.getElementById('filterInput'); //search input


// CONTACT Class
class Contact {
  constructor(name, phone) {
 
    this.name = name;
    this.phone = phone;
		
  } 
  
}

//UI Class

class UI {
	
  static displayContacts() {
    const contacts = Store.getContact(); 
    
    contacts.forEach((contact) => UI.addContactToList(contact));
  }
  

  static addContactToList(contact) {
	const itemDiv = document.querySelector('#contact-items');  
    const list = document.querySelector('#names');
	
	
    list.insertAdjacentHTML("afterbegin", `
      </li>
      <li class="collection-item">
            
  <a href="#"><i class="fas fa-user text-blue "></i><span class="text-grey">${contact.name} </span></a>
  
      <span class="contact-phone"><i class="fas fa-phone text-blue phi "><span class="text-grey ph">${contact.phone}</span></i></span>
         
	<i class="far fa-trash-alt delete" data-phone="${contact.phone}"></i>
	</li> `);
	  
    // add event listener to the delete button that has been added
const delButton = document.querySelector("#contact-items .delete[data-phone='" + contact.phone + "']");
delButton.addEventListener('click', function () {
  const phone = this.getAttribute('data-phone');
  console.log(phone);
  Store.removeContact(phone);
});
  

 
  } //end addContact()
  

  static deleteContact(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
	const htitle = document.querySelector('#htitle');
    container.insertBefore(div, htitle);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 5000);
  }

  static clearFields() {
    document.querySelector('#name').value = '';
    document.querySelector('#phone').value = '';
    
  }
}


// STORE Class: Local Storage
class Store {
  static getContact() {
    let contacts;
    if(localStorage.getItem('contacts') === null) {
      contacts = [];  //empty array of contacts
    } else {
      contacts = JSON.parse(localStorage.getItem('contacts'));
    }

    return contacts;
  }

  static addContact(contact) {
    const contacts = Store.getContact();
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  
  static removeContact(phone) {
        const contacts = Store.getContact();
         
        contacts.forEach((contact, index) => {
	  console.log(contact.phone);
	  console.log(phone);
          if(contact.phone == phone) {
            contacts.splice(index, 1);
			
          }
    	  
        });
    	
        localStorage.setItem('contacts', JSON.stringify(contacts));
    	 
      } 
    }
  

//show form onclick
quickAddBtn.addEventListener('click', function(){
	addFormDiv.style.display ="block";
	
})

//hide form on Cancel
cancelBtn.addEventListener('click', function(){
	addFormDiv.style.display ="none";
	
})



// Event: Display Contacts
document.addEventListener('DOMContentLoaded', UI.displayContacts);


// Event: Add a Contact
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const name = document.querySelector('#name').value;
  const phone = document.querySelector('#phone').value;
  

  // Validate
  if(name === '' || phone === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const contact = new Contact(name, phone);

    // Add Book to UI
    UI.addContactToList(contact);

    // Add book to store
    Store.addContact(contact);

    // Show success message
    UI.showAlert('Contact Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

 // add event listener to each delete button
        const delButtons = document.querySelectorAll('#contact-items .delete');
		console.log(delButtons);
        for (let i = 0; i < delButtons.length; i++) {
            delButtons[i].addEventListener('click', function () {
                const phone = this.getAttribute('data-phone');
                Store.removeContact(phone);
            });
        }

// Event: Remove a Contact
document.querySelector('#contact-items').addEventListener('click', (e) => {
	
  // Remove contact from UI -call deleteContact method
  UI.deleteContact(e.target);

  // Remove contact from storage
  //Store.removeContact(e.target.parentElement);
  //console.log(e.target.parentElement);

  // Show success message
  UI.showAlert('Contact Removed', 'success');
});

	

//SEARCH FUNCTIONALITY

// Add event listener
filterInput.addEventListener('keyup', filterNames);


function filterNames(){
  
  let filterValue = document.getElementById('filterInput').value.toUpperCase();

  // Get the list of all contacts
  let ul = document.getElementById('names');
  // Get <lis> from ul
  let li = ul.querySelectorAll('li.collection-item'); 

  for(let i = 0;i < li.length;i++){
  
    let a = li[i].getElementsByTagName('a')[0];
    if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1){	
    li[i].style.display = '';  
	console.log(li[i]);
	//a.scrollIntoView(); //scroll to the target element

    } else {
      li[i].style.display = 'none';
    }
  }


}

