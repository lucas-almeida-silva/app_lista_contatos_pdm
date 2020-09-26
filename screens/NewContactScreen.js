import React, { useState } from 'react';
import { 
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import { useDispatch } from 'react-redux';
import * as contactsActions from '../store/contacts-actions';
import SelectImage from '../components/SelectImage';
import Colors from '../constantes/Colors';

const NewContactScreen = (props) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [imageURI, setImageURI] = useState();

  const dispatch = useDispatch();

  const handleChangeName = (name) => {
    setName(name);
  }

  const handleChangeNumber = (number) => {
    setNumber(number);
  }

  const handleCaptureImageURI = (imageURI) => {
    setImageURI(imageURI);
  }

  const handleAddContact = () => {
    if(!name.trim() || !number) {
      Alert.alert('Atenção!', 'Preencha todos os campos');
      return;
    }
    if(!(number.replace(/[^0-9]+/g, '').length >= 10)) {
      Alert.alert('Atenção!', 'Preencha o telefone corretamente');
      return;
    }

    dispatch(contactsActions.addContact(name, number, imageURI));
    props.navigation.navigate('ContactList');
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Novo Contato</Text>
        <TextInput
          placeholder="Nome"
          value={name}
          onChangeText={handleChangeName}
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
          onChangeText={handleChangeNumber}
          style={styles.input}
        />
        <SelectImage onCaptureImage={handleCaptureImageURI} />
        <RectButton 
          onPress={handleAddContact}
          style={styles.addButton}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </RectButton>
      </View>
    </ScrollView>
  );
}

export default NewContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 30,
    backgroundColor: Colors.background
  },
  title: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 38,
    color: Colors.titlePrimary,
    textAlign: 'center',
    marginBottom: 24
  },
  input: {    
    backgroundColor: Colors.white,
    height: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 16,
    paddingVertical: 0,
    justifyContent: 'center',
    textAlignVertical: 'center',
    marginBottom: 10,
    fontSize: 17,
    fontFamily: 'Poppins_400Regular'
  },
  addButton: {
    backgroundColor: Colors.button,
    height: 54,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    color: Colors.white,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18
  }
});

NewContactScreen.navigationOptions = options => {
  return {
    headerTitle: 'Adicionar contato'
  }
}