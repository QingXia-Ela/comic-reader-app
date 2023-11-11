import { FunctionComponent, useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useStore } from '@nanostores/react';
import $settings, { CnMap, changeSettings } from '@/store/settings';
import Modal from '@/components/Modal';
import TextInput from '@/components/Input';

interface SettingsProps {}

// don't know why useState for input value doesn't work
let inputValue: string;

const SingleSetting: FunctionComponent<{
  name: string;
  cnName?: string;
  value: string | null;
}> = memo(({ name, cnName, value }) => {
  const [open, setOpen] = useState(false);
  const handlePress = () => {
    // changeSettings
    setOpen(true);
  };

  const handleOk = () => {
    changeSettings(name, inputValue);
    inputValue = '';
    setOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        style={singleSettingStyles.container}
        activeOpacity={0.8}
        onPress={handlePress}>
        <Text style={singleSettingStyles.name}>{cnName || name}</Text>
        <Text style={singleSettingStyles.value}>
          {value ? '******' : 'None'}
        </Text>
      </TouchableOpacity>
      <Modal
        title={`Update ${cnName || name} value...`}
        showModal={open}
        onRequestClose={() => setOpen(false)}
        onOk={handleOk}>
        <TextInput onChangeText={(text) => (inputValue = text)} />
      </Modal>
    </>
  );
});

const singleSettingStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    gap: 10,
    paddingHorizontal: 15,
    backgroundColor: '#333',
  },
  name: {
    fontSize: 18,
    color: 'white',
  },
  value: {
    fontSize: 18,
    color: 'white',
  },
});

const SettingsScreen: FunctionComponent = () => {
  const settings = useStore($settings);

  return Object.entries(settings).map(([key, value]) => (
    <SingleSetting key={key} name={key} value={value} />
  ));
};

const Settings: FunctionComponent<SettingsProps> = () => {
  // settings

  return (
    <View style={styles.container}>
      <SettingsScreen />
      {/* <Text style={{ color: 'white' }}>test</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 20,
    padding: 15,
  },
});

export default Settings;
