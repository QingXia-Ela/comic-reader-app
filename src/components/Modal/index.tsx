import { FunctionComponent, PropsWithChildren, useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal as RNModal,
  ModalProps as RNModalProps,
  NativeSyntheticEvent,
} from 'react-native';

interface ModalButtonProps {
  title: string;
  onPress?: (event: NativeSyntheticEvent<any>) => void;
}

interface ModalProps extends PropsWithChildren<RNModalProps> {
  title: string;
  showModal?: boolean;
  buttons?: ModalButtonProps[];
}

const ModalButton: FunctionComponent<ModalButtonProps> = ({
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={modalButtonStyles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const modalButtonStyles = StyleSheet.create({
  text: {
    color: '#02b5a2',
    fontSize: 20,
  },
});

const Modal: FunctionComponent<ModalProps> = ({
  title,
  showModal = false,
  buttons,
  children,
  ...props
}) => {
  const defaultButtons = useMemo(() => {
    return [
      {
        title: 'OK',
        onPress: (e) => {
          props.onRequestClose?.(e);
        },
      },
    ] as ModalButtonProps[];
  }, []);
  return (
    <RNModal
      animationType="fade"
      style={styles.modalBackground}
      visible={showModal}
      transparent
      {...props}>
      <View
        onTouchStart={props.onRequestClose}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          opacity: 0.6,
        }}></View>
      <View style={styles.modalWrapper}>
        <Text style={styles.modalTitle}>{title}</Text>
        <View style={{ flex: 1 }}>{children}</View>
        <View style={styles.modalButtonGroup}>
          {(buttons ?? defaultButtons).map((item, index) => (
            <ModalButton key={index} {...item} />
          ))}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242424',
  },
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '10%',
    width: '80%',
    minHeight: 200,
    color: '#fff',
    backgroundColor: '#333',
    borderRadius: 5,
    transform: [{ translateY: -100 }],
    padding: 25,
    paddingLeft: 35,
    paddingRight: 35,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  modalButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 30,
    marginTop: 20,
  },
});

export default Modal;
