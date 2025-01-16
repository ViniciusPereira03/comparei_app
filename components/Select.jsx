import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '../assets/colors/global';

const Select = ({ label, required = false, options = [], value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = useRef(new Animated.Value(selectedValue ? 1 : 0)).current;

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    setIsFocused(!isOpen);
  };

  const handleOptionSelect = (selectedOption) => {
    setSelectedValue(selectedOption.value);
    setIsOpen(false);
    setIsFocused(false);
    onValueChange && onValueChange(selectedOption.value);
  };

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || selectedValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, selectedValue]);

  const labelStyle = {
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [required ? 26 : 28, required ? -6 : 0],
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
  };

  const renderLabel = () => (
    <Animated.Text style={[styles.label, labelStyle]}>
      {label}
      {required && <Text style={styles.asterisco}>*</Text>}
    </Animated.Text>
  );

  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => handleOptionSelect(item)}
    >
      <Text style={styles.optionText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderLabel()}
      <TouchableOpacity
        style={[
            styles.select,
            isFocused && styles.selectFocused,
            isOpen && styles.selectOpen,
        ]}
        onPress={toggleDropdown}
        accessible={true}
        accessibilityRole="menu"
        accessibilityLabel={label}
        accessibilityHint="Pressione para abrir ou fechar o menu de opções"
      >
        <Text style={styles.selectedText}>
          {options.find((option) => option.value === selectedValue)?.label || ''}
        </Text>
        <MaterialIcons
          name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
          size={24}
          color={colors.hookers_green}
        />
      </TouchableOpacity>
      {isOpen && (
        <ScrollView style={styles.dropdown}>
            {options.map((option) => (
            <TouchableOpacity
                key={option.value}
                style={styles.option}
                onPress={() => handleSelect(option.value)}
                accessible={true}
                accessibilityRole="menuitem"
            >
                <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
            ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 8,
    // height: 52
  },
  label: {
    position: 'absolute',
    left: 8,
    color: colors.dark_green,
  },
  asterisco: {
    color: 'red',
    fontSize: 18,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.hookers_green,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginTop: 16,
  },
  selectOpen: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  selectFocused: {
    // borderColor: colors.xanthous,
  },
  selectedText: {
    color: colors.dark_green,
    fontSize: 16,
  },
  dropdown: {
    marginTop: -1,
    borderWidth: 1,
    borderColor: colors.hookers_green,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    maxHeight: 150,
  },
  option: {
    padding: 12,
  },
  optionText: {
    color: colors.dark_green,
    fontSize: 16,
  },
});

export default Select;