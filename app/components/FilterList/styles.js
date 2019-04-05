import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  filterListBackground: {
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: 'white',
    marginTop: 5,
    borderRadius: 20
  },
  filterListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5
  },
  listItemCheck: {
    backgroundColor: '$inputText',
  },
  listItemUncheck: {
    backgroundColor: '$white',
  },
  textCheck: {
    color: '$white',
  },
  textUncheck: {
    color: '$inputText',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: '$inputText',
  },
});

export default styles;
