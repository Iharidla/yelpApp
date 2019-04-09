import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '$white',
    borderRadius: 10,
    height: 30,
    width: 150,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
    paddingTop: 0,
    fontSize: 15,
  },
  roundContainer: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  listItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: '$inputText',
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
  cancelText: {
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '$white',
    borderWidth: 2,
  },
  placeContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeIcon: {
    marginRight: 10,
  },
  filtersContainer: {
    padding: 20,
    borderRadius: 20,
  },
  separateContainer: {
    marginBottom: 20,
  },
  filterTitleContainer: {
    paddingLeft: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    color: 'white',
    paddingLeft: 5
  },
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

});

export default styles;
