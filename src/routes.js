import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './pages/AuthPages/SignIn';
import SignUp from './pages/AuthPages/SignUp';
import ForgotPassword from './pages/AuthPages/ForgotPassword';
import ResetPassword from './pages/AuthPages/ResetPassword';

const Stack = createStackNavigator();

export default function createRouter(signedIn = false) {
  return !signedIn ? (
    <Stack.Navigator headerMode="none" initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator initialRouteName="DashboardRoutes">
      <Stack.Screen name="DashboardRoutes" component={{}} />
    </Stack.Navigator>
  );
}
