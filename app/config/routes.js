import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/Home';
import CurrencyListScreen from '../screens/CurrencyList';
import Options from '../screens/Options';
import Themes from '../screens/Themes';
import Coffee from "../screens/Coffee";

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: () => null,
      },
    },
    Options: {
      screen: Options,
      navigationOptions: {
        headerTitle: 'Options',
      },
    },
    Themes: {
      screen: Themes,
      navigationOptions: {
        headerTitle: 'Themes',
      },
    },
  }, {
    headerMode: 'screen',
  });

const CurrencyListStack = createStackNavigator(
  {
    CurrencyList: {
      screen: CurrencyListScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
      }),
    },
  });



const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    CurrencyList: {
      screen: CurrencyListStack
    },
    Coffee: {
      screen: Coffee
    }
  },
  {
    initialRouteName: "Home",
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(AppNavigator);
