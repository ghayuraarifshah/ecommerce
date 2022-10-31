const { faker } = require("@faker-js/faker");
const { writeFile } = require("fs/promises");

const billAdd = {
    addressLine1: "Street 1",
    addressLine2: "Street 2",
    city: "Delhi",
    state: "Delhi",
    zipCode: 190014,
}

class User {
    constructor(name, lastName, email, phoneNumber, billingAdress, shippingAddress) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.billingAdress = billingAdress;
        this.shippingAddress = shippingAddress;
    }
}

const user = new User(faker.name.firstName('male'), faker.name.lastName(), faker.internet.email(), faker.phone.number(), billAdd, billAdd)
const json = JSON.stringify(user)

writeFile("./user.json", json)