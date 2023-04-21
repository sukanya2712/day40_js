const readline = require('readline');
class Contact {

    constructor(firstName, lastName, address, city, state, zip, phone, email) {
      this.validateName(firstName);
      this.validateName(lastName);
      this.validateMinLength(address, 4);
      this.validateMinLength(city, 4);
      this.validateMinLength(state, 4);
      this.validatePattern(zip, /^\d{5}$/);
      this.validatePattern(phone, /^\d{3}-\d{3}-\d{4}$/);
      this.validatePattern(email, /^\S+@\S+\.\S+$/);
  
      this.firstName = firstName;
      this.lastName = lastName;
      this.address = address;
      this.city = city;
      this.state = state;
      this.zip = zip;
      this.phone = phone;
      this.email = email;
    }
  
    validateName(name) {
      if (!/^[A-Z][a-z]{2,}$/.test(name)) {
        throw new Error(`${name} is not a valid name`);
      }
    }
  
    validateMinLength(value, minLength) {
      if (value.length < minLength) {
        throw new Error(`${value} should be at least ${minLength} characters long`);
      }
    }
  
    validatePattern(value, pattern) {
      if (!pattern.test(value)) {
        throw new Error(`${value} is not a valid format`);
      }
    }
  }
  
//------------------------------------------------------------------uc3------------------------------------------------------------------------------------------
  
  let addressBooks = [];

 // function to prompt user for a yes/no question
function promptYesNo(question, callback) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(`${question} (y/n)`, (answer) => {
      rl.close();
      callback(answer.toLowerCase() === "y");
    });
  }
  
  // create new address book
  function createAddressBook(callback) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question("Enter a name for the new address book:", (name) => {
      rl.close();
      let addressBook = {
        name: name,
        contacts: [] // initialize empty array for contacts in this address book
      };
      addressBooks.push(addressBook); // add new address book to array of address books
      callback();
    });
  }
  
  // find address book by name
  function findAddressBookByName(name) {
    for (let i = 0; i < addressBooks.length; i++) {
      if (addressBooks[i].name === name) {
        return i; // return index of address book if found
      }
    }
    return -1; // return -1 if address book not found
  }
  
  function addContact(callback) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    rl.question("Enter the name of the address book to add the contact to:", (name) => {
      let index = findAddressBookByName(name);
  
      if (index === -1) {
        // address book not found
        promptYesNo("Address book not found. Do you want to create a new one?", () => {
          createAddressBook(() => {
            addContact(callback);
          });
        });
        return; // exit function and wait for user input
      }
  
      rl.question("Enter the first name of the new contact:", (firstName) => {
        rl.question("Enter the last name of the new contact:", (lastName) => {
          rl.question("Enter the address of the new contact:", (address) => {
            rl.question("Enter the city of the new contact:", (city) => {
              rl.question("Enter the state of the new contact:", (state) => {
                rl.question("Enter the zip code of the new contact:", (zip) => {
                  rl.question("Enter the phone number of the new contact (format: xxx-xxx-xxxx):", (phone) => {
                    rl.question("Enter the email address of the new contact:", (email) => {
                      let newContact = new Contact(firstName, lastName, address, city, state, zip, phone, email);
                      addressBooks[index].contacts.push(newContact);
                      rl.close();
                      callback();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
  
  function displayAddressBooks() {
    console.log("Address Books:");
    console.log("--------------");
    for (let i = 0; i < addressBooks.length; i++) {
      console.log(`Name: ${addressBooks[i].name}`);
      console.log("Contacts:");
      console.log("---------");
      for (let j = 0; j < addressBooks[i].contacts.length; j++) {
        let contact = addressBooks[i].contacts[j];
        console.log(`Name: ${contact.firstName} ${contact.lastName}`);
        console.log(`Address: ${contact.address}`);
        console.log(`City: ${contact.city}`);
        console.log(`State: ${contact.state}`);
        console.log(`Zip: ${contact.zip}`);
        console.log(`Phone: ${contact.phone}`);
        console.log(`Email: ${contact.email}`);
        console.log("--------");
      }
      console.log("--------------");
    }
  }


  //----------------------------------------------------------------------------UC4----------------------------------------------------------------------------
  function editContacts(callback) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    rl.question("Enter the name of the address book to edit the contact in:", (name) => {
      let index = findAddressBookByName(name);
  
      if (index === -1) {
        // address book not found
        promptYesNo("Address book not found. Do you want to create a new one?", () => {
          createAddressBook();
        });
        return; 
      }else{
        rl.question("Enter the first name of the contact to edit:", (firstName) => {
          rl.question("Enter the last name of the contact to edit:", (lastName) => {
            let contactIndex = addressBooks[index].contacts.findIndex(contact => contact.firstName === firstName && contact.lastName === lastName);
    
            if (contactIndex === -1) {
              console.log("Contact not found.");
              rl.close();
              return;
            }else{
              rl.question("Enter the new first name of the contact:", (newFirstName) => {
                rl.question("Enter the new last name of the contact:", (newLastName) => {
                  rl.question("Enter the new address of the contact:", (newAddress) => {
                    rl.question("Enter the new city of the contact:", (newCity) => {
                      rl.question("Enter the new state of the contact:", (newState) => {
                        rl.question("Enter the new zip code of the contact:", (newZip) => {
                          rl.question("Enter the new phone number of the contact (format: xxx-xxx-xxxx):", (newPhone) => {
                            rl.question("Enter the new email address of the contact:", (newEmail) => {
                              let contact = addressBooks[index].contacts[contactIndex];
                            contact.firstName = newFirstName;
                            contact.lastName = newLastName;
                            contact.address = newAddress;
                            contact.city = newCity;
                            contact.state = newState;
                            contact.zip = newZip;
                            contact.phone = newPhone;
                            contact.email = newEmail;
                            rl.close();
                            callback();
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
            }
          });
        });
      }
  });
}
  
 

//-------------------------------------------------------------uc5---------------------------------------------------------------------------------------------
  function deleteContacts(callback) {
    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

    rl.question("Enter the name of the address book to delete the contact in:", (name) => {
    let index = findAddressBookByName(name);

    if (index === -1) {
      // address book not found
      console.log("addressbook not found");
      return; 
    }else{
      rl.question("Enter the first name of the contact to delete:", (firstName) => {
        rl.question("Enter the last name of the contact to delete:", (lastName) => {
          let contactIndex = addressBooks[index].contacts.findIndex(contact => contact.firstName === firstName && contact.lastName === lastName);
  
          if (contactIndex === -1) {
            console.log("Contact not found.");
            rl.close();
            return;
          }else{
            addressBooks[index].contacts.splice(contactIndex, 1);
            console.log("contact deleted sunceefully");
            callback();
          }
        });
      });
      }   
    });
  }



//------------------------------------------------------------------uc6-------------------------------------------------------------------------------------------
function noofContacts(){
  console.log(`no of addressbooks : ${addressBooks.length}`);
  console.log("addressbooks with names and no of contacts : ");
  for (let i = 0; i < addressBooks.length; i++) {
    console.log(`addressbookName: ${addressBooks[i].name}   no of contacts: ${addressBooks[i].contacts.length}`);
  }
}








         
                          
                        
   
  
  
  
  
  
  
  
  
  // main function
  function runAddressBookProgram() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question("Enter:\n1 to create a new address book\n2 to add a contact\n3 to exit\n4 to display addressbooks and contacts\n5 to edit contacts\n6 to delete contacts\n7 to display no of addressbooks & conacts in addressbooks ", (action) => {
      rl.close();
      switch (action) {
        case "1":
          createAddressBook(() => {
            runAddressBookProgram();
          });
          break;
        case "2":
          addContact(() => {
            runAddressBookProgram();
          });
          break;
        case "3":
          return;
        case "4":
          displayAddressBooks();
          runAddressBookProgram();
          break;
        case "5":
          editContacts(() => {
            runAddressBookProgram();
          });
          break;
        case "6":
          deleteContacts(() => {
            runAddressBookProgram();
          });
          break;
        case "7":
         noofContacts();
         runAddressBookProgram();
          break;   
        default:
          console.log("Invalid input. Please try again.");
          runAddressBookProgram();
      }
    });
  }
  
  // run the program
  runAddressBookProgram();