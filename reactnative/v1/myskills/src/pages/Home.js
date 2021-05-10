import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentHour, setCurrentHour] = useState(10);

  const handleAddNewSkill = useCallback(() => {
    setIsLoading(true);
    setMySkills(oldState => [...oldState, newSkill]);
  }, [newSkill]);

  const handleRemoveSkill = useCallback((skillRemoved) => {
    setMySkills(oldState => oldState.filter(
      skill => skill !== skillRemoved
    ));
  }, [mySkills])

  const greetings = useMemo(() => {
    if (currentHour < 12)
      return 'Good morning';
    else if (currentHour > 12 && currentHour < 18)
      return 'Good afternoon';
    else
      return 'Good night';
  }, [currentHour])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [mySkills]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Rodrigo</Text>
      <Text style={styles.greetings}>{greetings}</Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill} />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My Skills
      </Text>

      { isLoading ? <ActivityIndicator color="#FFF" size="large" /> : (
        <FlatList
          data={mySkills}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <SkillCard skill={item} onPress={() => handleRemoveSkill(item)} />
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  greetings: {
    color: '#FFF'
  }
})