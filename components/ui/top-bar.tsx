import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export function TopBar() {
  const router = useRouter();

  return (
    <View style={styles.topBar}>
      
      {/* LEFT SIDE ICONS */}
      <View style={styles.leftIcons}>
        <TouchableOpacity onPress={() => router.push('/modal')}>
          <Ionicons name="calendar-outline" size={26} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/modal')}>
          <Ionicons name="filter-outline" size={26} />
        </TouchableOpacity>
      </View>

      {/* RIGHT SIDE ICON */}
      <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/settings')}>
        <Ionicons name="settings-outline" size={26} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: '#e5e5e5',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  leftIcons: {
    flexDirection: 'row',
    gap: 18, // space between calendar & filter
  },
});