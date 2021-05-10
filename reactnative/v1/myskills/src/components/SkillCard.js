import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export function SkillCard({ skill, onPress }) {
  return (
    <TouchableOpacity style={styles.buttonSkill} onPress={onPress}>
      <Text style={styles.textSkill}>
        {skill}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonSkill: {
    backgroundColor: '#1f1e25',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 10
  },
  textSkill: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  }
})