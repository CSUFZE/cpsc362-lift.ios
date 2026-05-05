import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export function TopBar() {
  const router = useRouter();

  return (
    <View style={styles.topBar}>
      {/* LEFT SIDE EMPTY SO SETTINGS STAYS RIGHT */}
      <View />

      {/* RIGHT SIDE SETTINGS ONLY */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => router.push('/settings')}
      >
        <Ionicons name="settings-outline" size={24} color="#111827" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
  },
});