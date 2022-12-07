const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const contactById = data.find((contact) => contact.id === contactId);
    console.log(contactById);
    return contactById;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const filteredContacts = JSON.stringify(
      data.filter((contact) => contact.id !== contactId)
    );
    await fs.writeFile(contactsPath, filteredContacts, "utf8");
    console.log("The contact was removed");
  } catch (error) {
    console.log(error);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    data.push({ id: uid(3), name, email, phone });
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    console.log("The contact was added");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};


