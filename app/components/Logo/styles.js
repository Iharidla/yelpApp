import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  logo: {
    width: imageWidth,
    height: imageWidth/1.5,
    tintColor: '$white',
  },
  text: {
    color: '$white',
    fontSize: 50,
    letterSpacing: -0.5,
    fontWeight: '600',
  },
});
