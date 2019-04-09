import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from "react-native";

const width = Dimensions.get('window').width * 0.9;

const styles = EStyleSheet.create({
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 3,
    height: 45,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 10,
    width: width,
  },
  searchIcon: {
    position: 'absolute',
    left: 13,
    top: 12,
  },
  inputText: {
    marginLeft: 43,
    fontSize: 15,
    color: '#999',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  autocomplete: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  }
});

export default styles;
