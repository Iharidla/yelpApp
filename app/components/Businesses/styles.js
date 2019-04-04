import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    margin: 10,
  },
  price: {
    position: 'absolute',
    bottom: 25,
  },
  rating: {
    position: 'absolute',
    top: 5,
  },
  imageContainer:{
    justifyContent: 'flex-start',
    flexBasis: '25%',
  },
  image: {
    width: 80,
    height: 80
  },
  description:{
    flexDirection: 'column',
    justifyContent: 'center',
    flexBasis: '65%',
    textAlign: 'left',
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexBasis: '10%',
    textAlign: 'center',
  },
  nameText: {
    fontWeight: 'bold',
  },
  categoryText: {
    flexDirection: 'row',
  },

});

export default styles;
