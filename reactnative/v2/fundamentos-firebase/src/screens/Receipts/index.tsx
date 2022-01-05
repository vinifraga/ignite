import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import storage from '@react-native-firebase/storage';

import { Container, PhotoInfo } from './styles';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';
import { File, FileProps } from '../../components/File';

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([])
  const [photoSelected, setPhotoSelected] = useState('');

  useEffect(() => {
    async function loadPhotos() {
      const response = await storage().ref('images').list();

      const files = response.items.map(file => (
        {
          name: file.name,
          path: file.fullPath
        }
      ))

      setPhotos(files);
    }

    loadPhotos()
  }, []);

  async function handleShowImage(path: string) {
    const urlImage = await storage().ref(path).getDownloadURL();
    setPhotoSelected(urlImage)
  }

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={photoSelected} />

      <PhotoInfo>
        Informações da foto
      </PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => { }}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', padding: 24 }}
      />
    </Container>
  );
}
