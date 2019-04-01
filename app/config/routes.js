import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/Home';
import Options from '../screens/Options';
import Themes from '../screens/Themes';
import Businesses from "../screens/Businesses";

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


const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    Businesses: {
      screen: Businesses
    }
  },
  {
    initialRouteName: "Home",
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(AppNavigator);
