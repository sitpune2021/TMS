import {Dimensions} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';

const {height} = Dimensions.get('window');

const ResponsiveSize = size => {
  return RFValue(size, height);
};

export {ResponsiveSize};
