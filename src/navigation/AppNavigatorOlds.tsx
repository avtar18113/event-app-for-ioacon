import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; 
import { colors } from "../theme/colors";
import { useAuth } from "../context/AuthProvider";

// Screens
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import ForgotScreen from "../screens/Auth/ForgotScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ProgramScreen from "../screens/ProgramScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import FacultyScreen from "../screens/FacultyScreen";
import CommitteeScreen from "../screens/CommitteeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WebViewPage from "../screens/WebViewPage";
import ProgramDetailScreen from "../screens/ProgramDetailScreen";
import TestFacultyScreen from "../screens/TestFacultyScreen";





const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={DashboardScreen} />
      <Tabs.Screen name="Program" component={ProgramScreen} />
      <Tabs.Screen name="Notifications" component={NotificationsScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
      <Tabs.Screen name="Faculty" component={TestFacultyScreen} />
    </Tabs.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();
  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown:false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Forgot" component={ForgotScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Tabs" component={MainTabs} />
            <Stack.Screen name="TestFaculty" component={TestFacultyScreen} initialParams={{}} />
            <Stack.Screen name="Faculty" component={FacultyScreen} />
            <Stack.Screen name="Committee" component={CommitteeScreen} />
            <Stack.Screen name="WebViewPage" component={WebViewPage} />
            <Stack.Screen name="ProgramDetail" component={ProgramDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
