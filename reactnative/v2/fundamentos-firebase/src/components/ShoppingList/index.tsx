import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore'

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  // useEffect(() => {
  //   async function loadDocuments() {
  //     try {
  //       const response = await firestore().collection('products').get();

  //       const documentsData = response.docs.map(doc => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         }
  //       }) as ProductProps[];

  //       setProducts(documentsData)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   loadDocuments();
  // }, [])

  useEffect(() => {
    async function loadDocument() {
      try {
        const response = await firestore().collection('products').doc('LzwObB2MPZHzQgvLDo0u').get();

        const documentData = {
          id: response.id,
          ...response.data()
        } as ProductProps;

        setProducts([documentData])
      } catch (error) {
        console.log(error)
      }
    }

    loadDocument();
  }, [])

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
