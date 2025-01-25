import React, { useEffect, useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  AccessibilityInfo,
  findNodeHandle,
} from 'react-native';
import { BlurView } from 'expo-blur';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../assets/colors/global';

const AnimatedModal = ({ visible, onClose, children }) => {
  const [animation] = useState(new Animated.Value(0));
  const [modalRef, setModalRef] = useState(null);

  const openModal = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
        if (modalRef) {
          const reactTag = findNodeHandle(modalRef);
          AccessibilityInfo.setAccessibilityFocus(reactTag);
        }
      });
  };

  const closeModal = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  useEffect(() => {
    if (visible) {
      openModal();
    }
  }, [visible]);

    const icons = {
        close: <AntDesign name="close" size={16} color={`${colors.font.to_background.white}`} />,
    }

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={closeModal}
    >
      <BlurView
        style={styles.backdrop}
        intensity={8}
        accessible={false}
      >
        <TouchableOpacity 
            style={styles.backdrop} 
            activeOpacity={1}  
            onPress={closeModal} 
            accessibilityLabel="Fechar modal tocando no fundo"
        />
      </BlurView>

      <Animated.View 
        style={[styles.modalContainer, { transform: [{ translateY }] }]}
        ref={setModalRef}
        accessible
        accessibilityViewIsModal
        importantForAccessibility="yes"
        accessibilityLabel="Conteúdo do modal"
    >
        
        <View style={styles.close}>
            <TouchableOpacity
                onPress={closeModal}
                style={styles.closeButton}
                accessible
                accessibilityRole="button"
                accessibilityLabel="Fechar modal"
            >
                {icons['close']}
            </TouchableOpacity>
        </View>
        <View accessible>{children}</View>
      </Animated.View> 
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.032)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    paddingBottom: 32,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  close: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  closeButton: {
    alignSelf: 'center',
    padding: 8
  }
});

export default AnimatedModal;
