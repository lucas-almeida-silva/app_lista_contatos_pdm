import { ADD_CONTACT, REMOVE_CONTACT } from './contacts-actions';
import Contact from '../modelos/Contact'

const initialState = {
  contacts: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_CONTACT:
      const contact = new Contact(
        new Date().getMilliseconds().toString(),
        action.contact.name,
        action.contact.number,
        action.contact.imageURI
      );
      return {
        contacts: state.contacts.concat(contact)
      }
    case REMOVE_CONTACT:
      return {
        contacts: state.contacts.filter(contact => contact.id !== action.id)
      }
    default:
      return initialState;
  }
}