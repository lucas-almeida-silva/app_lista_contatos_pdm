import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const ContactInput = (props) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const getName = (name) => {
    setName(name);
  }

  const getNumber = (number) => {
    setNumber(number);
  }

  const clearFields = () => {
    setName('');
    setNumber('');
  }

  return (
    <View style={styles.container}>
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

      <TouchableOpacity onPress={() => {
        if(props.onAddContact({name, number}))
          clearFields();
        }} 
        style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactInput;

const styles = StyleSheet.create({
  container: {
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