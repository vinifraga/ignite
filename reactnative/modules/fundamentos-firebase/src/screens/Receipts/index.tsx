import React, { useState, useEffect, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import storage from '@react-native-firebase/storage';

import { Container, PhotoInfo } from './styles';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';
import { File, FileProps } from '../../components/File';
import { useFocusEffect } from '@react-navigation/native';

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([])
  const [photoSelected, setPhotoSelected] = useState('');
  const [photoInfo, setPhotoInfo] = useState('');

  async function loadPhotos() {
    try {
      const response = await storage().ref('images').list();

      const files = response.items.map(file => (
        {
          name: file.name,
          path: file.fullPath
        }
      ))

      setPhotos(files);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleShowImage(path: string) {
    try {
      const imageUrl = await storage().ref(path).getDownloadURL();
      setPhotoSelected(imageUrl)

      const info = await storage().ref(path).getMetadata();
      setPhotoInfo(`Upload realizado em ${info.timeCreated}`);
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDeleteImage(path: string) {
    try {
      await storage().ref(path).delete();
      Alert.alert('Imagem excluída com sucesso!');
      await loadPhotos();
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(useCallback(() => {
    loadPhotos()
  }, []))

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo title='Nenhuma foto selecionada' uri={photoSelected} />

      <PhotoInfo>
        {photoInfo}
      </PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => handleDeleteImage(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', padding: 24 }}
      />
    </Container>
  );
}
