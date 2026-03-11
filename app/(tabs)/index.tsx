import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { Collapsible } from '@/components/ui/collapsible';
import { TopBar } from '@/components/ui/top-bar';
import workouts from '@/data/workouts.json';

export default function HomeScreen() {
  return (
     <View style={{ flex: 1 }}>
      <TopBar />
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <View style={styles.headerContainer}>
            <Image
              source={require('@/assets/images/icon-image.jpeg')}
              style={styles.bigGymHeader}
            />
            <View style={styles.liftBox}>
              <ThemedText style={styles.liftText}>LIFT</ThemedText>
            </View>
          </View>
        }>
        {workouts.map((group, i) => (
          <Collapsible key={i} title={group.title}>
            {group.exercises.map((exercise, j) => (
              <ThemedText key={j}>
                {exercise.sets} sets - {exercise.name}
                {exercise.equipment ? ` (${exercise.equipment})` : ""}
              </ThemedText>
            ))}
          </Collapsible>
        ))}
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
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
  liftBox: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderWidth: 3,
    borderColor: 'black',
  },
  liftText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#666',
    letterSpacing: 2,
  },
});
