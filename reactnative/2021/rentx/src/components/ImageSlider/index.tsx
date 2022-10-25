import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
  Container,
  ImageIndexes,
  CarImageWrapper,
  CarImage,
  SliderBullet
} from './styles';

interface Props {
  imagesUrl: {
    id: string;
    photo: string;
  }[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index ?? 0;
    setImageIndex(index);
  })

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((item, index) => (
          <SliderBullet
            key={item.id}
            isFirst={index === 0}
            active={index === imageIndex}
          />
        ))}
      </ImageIndexes>
      
      <FlatList 
        data={imagesUrl}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage 
              source={{ uri: item.photo }}
              resizeMode="contain"
            />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}