import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    width: '80%',
    alignItems: 'center',
  },
  hairline: {
    backgroundColor: 'white',
    height: 1,
    width: '90%',
  },
  menu: {
    marginTop: 15,
    alignItems: 'center',
  },
});

export default styles;
