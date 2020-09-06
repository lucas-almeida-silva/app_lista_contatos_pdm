import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { AppLoading } from 'expo';
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import ContactInput from './components/ContactInput';
import ContactItem from './components/ContactItem';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [counter, setCounter] = useState(10);

  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  const addContact = (contact) => {
    if(!contact.name.trim() || !contact.number) {
      alert('É necessário preencher todos os campos');
      return false;
    }

    if(!(contact.number.replace(/[^0-9]+/g, '').length >= 10)) {
      alert('Preencha o telefone corretamente');
      return false;
    }

    setContacts(contacts => {
      setCounter(counter + 2);
      return [...contacts, {key: counter.toString(), value: contact}];
    });

    return true;
  }

  const removeContact = (key) => {
    setContacts(contacts => {
      return contacts.filter(contact => contact.key != key);
    });
  }

  if(!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Meus Contatos</Text>

        <ContactInput onAddContact={addContact} />

        <View style={styles.contactListContainer}>
          <Text style={styles.contactListTitle}>Contatos</Text>
          {!contacts.length && <Text style={styles.contactListEmpty}>Nenhum contato salvo</Text>}

          <FlatList 
            data={contacts}
            renderItem={
              (contact) => (
                <ContactItem 
                  contactKey={contact.item.key} 
                  contact={contact.item.value} 
                  onDelete={removeContact} 
                />
              )
            }
          />     
        </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 45,
    paddingHorizontal: 40, 
    backgroundColor: '#8257e5',
  },
  title: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 38,
    color: '#FFF',
    marginBottom: 32,
    textAlign: 'center'
  },
  contactListContainer: {
    flex: 1
  },
  contactListTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 32,
    color: '#FFF',
    marginBottom: 16
  },
  contactListEmpty: {
    fontFamily: 'Archivo_400Regular',
    fontSize: 18,
    color: '#FFF'
  }
}); 