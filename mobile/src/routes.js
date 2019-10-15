import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Logo from '~/components/Logo';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Meetups from './pages/Meetups';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createStackNavigator(
          {
            A: createBottomTabNavigator(
              {
                Meetups,
                Subscription,
                Profile,
              },
              {
                tabBarOptions: {
                  keyboardHidesTabBar: true,
                  activeTintColor: '#FFF',
                  inactiveTintColor: 'rgba(255,255,255,0.6)',
                  style: {
                    backgroundColor: '#2B1A2F',
                  },
                },
              },
            ),
          },
          {
            defaultNavigationOptions: () => ({
              headerTransparent: true,
              headerTintColor: '#fff',
              headerTitle: <Logo />,
              headerStyle: {
                backgroundColor: 'rgba(0,0,0,0.3)',
              },
            }),
          },
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      },
    ),
  );
