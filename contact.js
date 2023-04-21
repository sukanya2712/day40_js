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
  
  // main function
  function runAddressBookProgram() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question("Enter 1 to create a new address book : ,   2 to add a contact :, or   3 to exit : , 4 to display addressbooks and contacts : ", (action) => {
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
        default:
          console.log("Invalid input. Please try again.");
          runAddressBookProgram();
      }
    });
  }
  
  // run the program
  runAddressBookProgram();