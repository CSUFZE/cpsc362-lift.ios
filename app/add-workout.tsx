import { useRouter } from 'expo-router';
import { push, ref, set } from 'firebase/database';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { db } from '@/firebaseConfig';

const userId = 'Vb6rpFnoztg5gLCp9KTzsZFVjXP2';

export default function AddWorkoutScreen() {
  const router = useRouter();

  const [exerName, setExerName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');

  const saveWorkout = async () => {
    if (!exerName.trim()) return;

    const newLogRef = push(ref(db, `users/${userId}/exerciseLogs`));

    await set(newLogRef, {
      createdAt: Date.now(),
      date: new Date().toISOString().split('T')[0],
      exerID: exerName.toLowerCase().replace(/\s+/g, '-'),
      exerName,
      logID: newLogRef.key,
      reps: Number(reps),
      sets: Number(sets),
      time: {
        minutes: 0,
        seconds: 0,
      },
    });

    router.back();
  };

  return (
    <View style={styles.screen}>
      <ThemedText style={styles.title}>Add Workout</ThemedText>

      <TextInput
        placeholder="Exercise name"
        value={exerName}
        onChangeText={setExerName}
        style={styles.input}
      />

      <TextInput
        placeholder="Sets"
        value={sets}
        onChangeText={setSets}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Reps"
        value={reps}
        onChangeText={setReps}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={saveWorkout}>
        <ThemedText style={styles.buttonText}>Save Workout</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#111827',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  button: {
    backgroundColor: '#111827',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});