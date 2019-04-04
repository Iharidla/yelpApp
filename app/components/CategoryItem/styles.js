import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  GridViewTextLayout:{
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  GridViewContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 30,
    margin: 5,
  }
});

export default styles;
