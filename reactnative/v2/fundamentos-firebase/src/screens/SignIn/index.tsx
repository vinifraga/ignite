import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleAnonymousSignIn() {
    try {
      const { user } = await auth().signInAnonymously();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreateUserAccount() {
    try {
      await auth().createUserWithEmailAndPassword(email, password)
      Alert.alert('Usuário criado com sucesso!')
    } catch (error: any) {
      console.log(error.code);

      if (error.code === 'auth/email-already-in-use') {
        return Alert.alert('E-mail não disponível', 'Escolha outro e-mail para cadastrar.')
      }

      if (error.code === 'auth/invalid-email') {
        return Alert.alert('E-mail inválido', 'Escolha uma e-mail válido para cadastro.')
      }

      if (error.code === 'auth/weak-password') {
        return Alert.alert('Senha fraca', 'Escolha uma senha com 6 ou mais dígitos.')
      }
    }
  }

  async function handleSignInWithEmailAndPassword() {
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
      console.log(user);
    } catch (error: any) {
      console.log(error.code);

      if(error.code === 'auth/user-not-found' || 'auth/wrong-password') {
        Alert.alert('Usuário e/ou senha incorreto', 'Por favor verifique as suas credenciais.')
      }
    }
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => { }} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}