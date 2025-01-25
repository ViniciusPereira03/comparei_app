import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '../assets/colors/global';

const Range = ({ min = 0, max = 100, initial = 50, step = 1, unidade = "", onChange }) => {
    const [value, setValue] = useState(initial);

    const handleValueChange = (val) => {
        setValue(val);
        if (onChange) {
        onChange(val);
        }
    };

    return (
        <View style={styles.container}>
            <Slider
                style={styles.slider}
                minimumValue={min}
                maximumValue={max}
                step={step}
                value={initial}
                minimumTrackTintColor={colors.hookers_green}
                maximumTrackTintColor={colors.mint_cream}
                thumbTintColor={colors.hookers_green}
                onValueChange={handleValueChange}
                thumbStyle={styles.thumb}
                trackStyle={styles.track}

                accessibilityLabel="Deslize para ajustar o valor"
                accessibilityHint="O valor atual será alterado ao deslizar"
                accessible={true}
                accessibilityRole="slider"
            />
            <Text
                style={styles.valueText}
                accessibilityLabel={`Valor selecionado: ${value} ${unidade ? unidade : ''}`}
                accessibilityHint="Este é o valor atual selecionado"
                accessible={true}
                accessibilityLiveRegion="assertive" // Informa a mudança imediatamente
            >
                {value}{unidade}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    alignItems: 'center',
  },
  slider: {
    width: '90%',
    height: 40,
  },
  valueText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.hookers_green,
  },
});

export default Range;
