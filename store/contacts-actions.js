export const ADD_CONTACT = 'ADD_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';

export const addContact = (name, number, imageURI) => {
  return {
    type: ADD_CONTACT, contact: { name, number, imageURI }
  }
}

export const removeContact = (id) => {
  return {
    type: REMOVE_CONTACT, id
  }
}