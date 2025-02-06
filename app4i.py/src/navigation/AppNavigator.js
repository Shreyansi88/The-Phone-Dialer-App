import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DialerScreen from '../screens/DialerScreen';
import CallHistoryScreen from '../screens/CallHistoryScreen';
import ContactsScreen from '../screens/ContactsScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dialer':
              iconName = 'dialpad';
              break;
            case 'History':
              iconName = 'history';
              break;
            case 'Contacts':
              iconName = 'contacts';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dialer" component={DialerScreen} />
      <Tab.Screen name="History" component={CallHistoryScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator; 