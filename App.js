import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Button } from 'react-native';
import { AppLoading } from 'expo';
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text'

export default function App() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [contacts, setContacts] = useState([]);
  const [counter, setCounter] = useState(10);

  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  const getName = (name) => {
    setName(name);
  }

  const getNumber = (number) => {
    setNumber(number);
  }

  const addContact = (contact) => {
    if(!name || !number) {
      alert('É necessário preencher todos os campos');
      return;
    }

    if(!(number.replace(/[^0-9]+/g, '').length >= 10)) {
      alert('Preencha o telefone corretamente');
      return;
    }

    setContacts(contacts => {
      setCounter(counter + 2);
      return [...contacts, {key: counter.toString(), value: {name, number}}];
    });

    setName('');
    setNumber('');
  }

  if(!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Contact List</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Nome"
            value={name}
            onChangeText={getName}
            style={styles.input}
          />
          <TextInputMask 
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            keyboardType={'phone-pad'}
            placeholder="Número"
            value={number}
            onChangeText={getNumber} 
            style={styles.input}
          />

          <TouchableOpacity onPress={addContact} style={styles.addButton}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactListContainer}>
          <Text style={styles.contactListTitle}>Contatos</Text>
          {!contacts.length && <Text style={styles.contactListEmpty}>Nenhum contato salvo</Text>}

          <FlatList 
            data={contacts}
            renderItem={
              (contact) => (
                <View style={styles.contactListItem}>
                  <Ionicons name="md-contact" size={60} />
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.item.value.name}</Text>
                    <Text style={styles.contactNumber}>{contact.item.value.number}</Text>
                  </View>
                </View>
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
    paddingHorizontal: 35,
    backgroundColor: '#8257e5',
  },
  title: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 36,
    color: '#FFF',
    marginBottom: 32,
    textAlign: 'center'
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {    
    backgroundColor: '#FFF',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular'
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
  },
  contactListItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  contactInfo: {
    marginLeft: 16,
    justifyContent: 'center'
  },
  contactName: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 18
  },
  contactNumber: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    marginTop: 3
  },
  addButton: {
    backgroundColor: '#04d361',
    height: 56,
    borderRadius: 8,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18
  }
}); 