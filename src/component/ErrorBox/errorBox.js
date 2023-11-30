import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ResponsiveSize} from '../../utils/ResponsiveSize';

export const ErrorBox = props => { 
  return (
    <>
     
        <View style={[styles.box, { ...props.boxStyle }]}>
          <Text style={[styles.text, { ...props.style }]}>
            {props?.errMsg.toString()}
          </Text>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    minHeight: 0,
    backgroundColor:'rgba(255,0,0,0.05)',
    marginTop: ResponsiveSize(10),
  },
  text: {
    color: '#A6192E',
    fontSize: ResponsiveSize(14),
    textAlign: 'left',
    marginHorizontal: ResponsiveSize(20),
    marginVertical: ResponsiveSize(16),
  },
});
