import { useState } from "react";
import { Center, Heading, ScrollView, Skeleton, Text, useToast, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Controller, useForm } from 'react-hook-form';

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useAuth } from "@hooks/useAuth";

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
}

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/rodrigorgtic.png');

  const toast = useToast();
  const { user } = useAuth();

  const { control, handleSubmit } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email
    }
  });

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      });
  
      if (photoSelected.cancelled) {
        return;
      }

      if (photoSelected.uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.uri);

        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
            placement: 'top',
            bgColor: 'red.500',
          })
        }

        setUserPhoto(photoSelected.uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    console.log(data);
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView 
        contentContainerStyle={{
          paddingBottom: 36
        }}
      >
        <Center mt={6} px={10}>
          { photoIsLoading ? (
            <Skeleton 
              w={PHOTO_SIZE} 
              h={PHOTO_SIZE} 
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto 
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input 
                bg="gray.600"
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { value } }) => (
              <Input 
                bg="gray.600"
                placeholder="E-mail"
                isDisabled
                value={value}
              />
            )}
          />

          <Heading color="gray.200" fontSize="md" mb={4} mt={12} alignSelf="flex-start" fontFamily="heading">
            Alterar senha
          </Heading>
        
          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input 
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input 
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input 
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Button 
            title="Atualizar"
            onPress={handleSubmit(handleProfileUpdate)}
            mt={4}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}