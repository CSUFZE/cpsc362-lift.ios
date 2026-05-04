import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { Collapsible } from '@/components/ui/collapsible';
import { TopBar } from '@/components/ui/top-bar';
import { db } from '@/firebaseConfig';

const userId = 'Vb6rpFnoztg5gLCp9KTzsZFVjXP2';

type ExerciseLog = {
  logID: string;
  exerName: string;
  sets: number;
  reps: number;
  date: string;
  time?: {
    minutes: number;
    seconds: number;
  };
};

export default function HomeScreen() {
  const router = useRouter();
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);

  useEffect(() => {
    const logsRef = ref(db, `users/${userId}/exerciseLogs`);

    const unsubscribe = onValue(logsRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setExerciseLogs([]);
        return;
      }

      const logsArray: ExerciseLog[] = Object.keys(data).map((key) => ({
        logID: key,
        ...data[key],
      }));

      setExerciseLogs(logsArray.reverse());
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.screen}>
      <TopBar />

      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <View style={styles.headerContainer}>
            <Image
              source={require('@/assets/images/blurred-gym.jpg')}
              style={styles.bigGymHeader}
              contentFit="cover"
            />

            <View style={styles.overlay} />

            <Image
              source={require('@/assets/images/lift-logo.png')}
              style={styles.headerLogo}
              contentFit="contain"
              tintColor="#E5E7EB"
            />
          </View>
        }
      >
        {exerciseLogs.length === 0 ? (
          <View style={styles.emptyCard}>
            <ThemedText style={styles.emptyText}>
              No workouts yet. Add your first workout below.
            </ThemedText>
          </View>
        ) : (
          exerciseLogs.map((workout) => (
            <Collapsible key={workout.logID} title={workout.exerName}>
              <ThemedText style={styles.exerciseText}>
                {workout.sets} sets - {workout.reps} reps
              </ThemedText>

              <ThemedText style={styles.exerciseText}>
                Date: {workout.date}
              </ThemedText>

              <ThemedText style={styles.exerciseText}>
                Time: {workout.time?.minutes ?? 0} min {workout.time?.seconds ?? 0} sec
              </ThemedText>
            </Collapsible>
          ))
        )}

        <View style={styles.bottomSpacer} />
      </ParallaxScrollView>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/add-workout')}
        >
          <ThemedText style={styles.addButtonText}>+ Add Workout</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  bigGymHeader: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  headerLogo: {
    position: 'absolute',
    top: '3%',
    alignSelf: 'center',
    width: 660,
    height: 260,
    opacity: 0.9,
  },
  exerciseText: {
    marginBottom: 6,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 90,
  },
  bottomButtonContainer: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    backgroundColor: '#F3F4F6',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  addButton: {
    backgroundColor: '#111827',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});