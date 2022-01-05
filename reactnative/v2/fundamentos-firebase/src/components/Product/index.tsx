import React from 'react';
import firestore from '@react-native-firebase/firestore';

import { ButtonIcon } from '../ButtonIcon';
import { Container, Info, Title, Quantity, Options } from './styles';

export type ProductProps = {
  id: string;
  description: string;
  quantity: number;
  done: boolean;
}

type Props = {
  data: ProductProps;
}

export function Product({ data }: Props) {
  async function handleDoneToggle() {
    try {
      await firestore()
        .collection('products')
        .doc(data.id)
        .update({
          done: !data.done
        })
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDelete() {
    try {
      await firestore()
        .collection('products')
        .doc(data.id)
        .delete()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Info>
        <Title done={data.done}>
          {data.description}
        </Title>

        <Quantity>
          Quantidade: {data.quantity}
        </Quantity>
      </Info>

      <Options>
        <ButtonIcon
          icon={data.done ? "undo" : "check"}
          onPress={handleDoneToggle}
        />

        <ButtonIcon
          icon="delete"
          color="alert"
          onPress={handleDelete}
        />
      </Options>
    </Container>
  );
}
