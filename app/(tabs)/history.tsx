import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { Collapsible } from '@/components/ui/collapsible';
import { TopBar } from '@/components/ui/top-bar';

const historyData = [
  {
    title: 'April 12, 2026',
    exercises: [
      '4 sets - Incline Bench Press (Dumbbell)',
      '4 sets - Bench Press (Dumbbell)',
      '4 sets - Chest Fly (Dumbbell)',
      '4 sets - Pullover (Dumbbell)',
    ],
  },
  {
    title: 'April 10, 2026',
    exercises: [
      '4 sets - Dumbbell Row',
      '4 sets - Renegade Row (Dumbbell)',
      '4 sets - Pull Up',
      '4 sets - Chin Up',
    ],
  },
  {
    title: 'April 8, 2026',
    exercises: [
      '4 sets - Front Raise (Dumbbell)',
      '4 sets - Lateral Raise (Dumbbell)',
      '4 sets - Shoulder Press (Dumbbell)',
      '4 sets - Rear Delt Reverse Fly (Dumbbell)',
    ],
  },
  {
    title: 'April 6, 2026',
    exercises: [
      '4 sets - Seated Incline Curl (Dumbbell)',
      '4 sets - Triceps Extension (Dumbbell)',
      '4 sets - Hammer Curl (Dumbbell)',
      '4 sets - Skullcrusher (Dumbbell)',
    ],
  },
];

export default function HistoryScreen() {
  return (
    <View style={{ flex: 1 }}>
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
        {historyData.map((workout, i) => (
          <Collapsible key={i} title={workout.title}>
            {workout.exercises.map((exercise, j) => (
              <ThemedText key={j}>
                {exercise}
              </ThemedText>
            ))}
          </Collapsible>
        ))}
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    opacity: 0.9
  },
  exerciseText: {
    marginBottom: 6,
  },
});