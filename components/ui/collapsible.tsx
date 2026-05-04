import { PropsWithChildren, useState } from 'react';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';

type CollapsibleProps = PropsWithChildren & {
  title: string;
  image?: ImageSourcePropType;
};

export function Collapsible({ children, title, image }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        {image && <Image source={image} style={styles.cardImage} />}

        <View style={styles.textArea}>
          <ThemedText style={styles.titleText}>{title}</ThemedText>
          <ThemedText style={styles.smallText}>Time:</ThemedText>
          <ThemedText style={styles.smallText}>PR:</ThemedText>
        </View>

        <IconSymbol
          name="chevron.right"
          size={18}
          color="#111827"
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />
      </TouchableOpacity>

      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#D9ECFA',
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#111827',
    overflow: 'hidden',
  },
  heading: {
    minHeight: 92,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  cardImage: {
    width: 95,
    height: 75,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#C7DDED',
  },
  textArea: {
    flex: 1,
    alignItems: 'flex-end',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  smallText: {
    fontSize: 13,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    paddingTop: 8,
  },
});