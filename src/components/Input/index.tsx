import React, { FunctionComponent } from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';

interface TextInputProps extends React.ComponentProps<typeof RNTextInput> {}

const TextInput: FunctionComponent<TextInputProps> = ({ ...props }) => {
  return (
    <RNTextInput
      style={styles.input}
      placeholderTextColor={'#999'}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: '100%',
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 22,
    color: '#fff',
    backgroundColor: '#222',
  },
});

export default TextInput;
