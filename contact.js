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
  
  try {
    const myContact = new Contact('Sukanya', 'Naik', 'srishti', 'virar', 'maharhtra', '12345', '982-234-5671', 'sukanya.naik@example.com');
    console.log(myContact);
  } catch (error) {
    console.error(error);
  }
  

