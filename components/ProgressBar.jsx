import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../assets/colors/global';

const ProgressBar = ({ percentage }) => {
    const stage = percentage === 100 ? 6 : Math.min(5, Math.ceil((percentage / 100) * 6));

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            alignItems: 'center',
            paddingVertical: 16,
        },
        label: {
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 8,
            color: colors.hookers_green,
        },
        progressBar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: 300,
            height: 10,
            borderRadius: 5,
        },
        stage: {
            flex: 1,
            borderWidth: 0.5,
            borderColor: "rgba(0, 0, 0, 0.3)",
        },
        firstStage: {
            borderTopLeftRadius: 50,
            borderBottomLeftRadius: 50,
        },
        lastStage: {
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
        },
        filledStage: {
            backgroundColor: stage <= 2 ? colors.scarlet : stage <= 4 ? colors.xanthous : colors.hookers_green, 
        },
        percentage: {
            marginTop: 8,
            fontSize: 12,
            color: stage <= 2 ? colors.scarlet : stage <= 4 ? colors.xanthous : colors.hookers_green,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.progressBar}>
                {[...Array(6)].map((_, index) => (
                <View
                    key={index}
                    style={[
                    styles.stage,
                    index < stage && styles.filledStage,
                    index === 0 && styles.firstStage,
                    index === 5 && styles.lastStage,
                    ]}
                />
                ))}
            </View>
            {/* <Text style={styles.percentage}>{percentage}%</Text> */}
        </View>
    );
};



export default ProgressBar;
