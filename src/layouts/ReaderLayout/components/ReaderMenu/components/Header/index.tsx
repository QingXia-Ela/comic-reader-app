import Navigator from '@/components/Navigator';
import px2dp from '@/utils/ScreenUtils';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { FunctionComponent } from 'react';

interface ReaderMenuHeaderProps
  extends Partial<Parameters<typeof Navigator>[0]> {}

const ReaderMenuHeader: FunctionComponent<ReaderMenuHeaderProps> = ({
  ...props
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    // @ts-expect-error: currently we don't have access to the type?
    <Navigator navigation={navigation} route={route} {...props} showBack />
  );
};

export default ReaderMenuHeader;
