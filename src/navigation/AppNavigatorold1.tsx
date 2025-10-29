import React from "react";
import { Image } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
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
import { colors } from "../theme/colors";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    text: colors.text,
  },
};

// ✅ Header logo component
const HeaderLogo = () => (
  <Image
    source={require("../../assets/event-logo.png")}
    style={{ width: 120, height: 40, resizeMode: "contain" }}
  />
);

// ✅ Bottom Tabs (Footer)
function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: colors.white,
          elevation: 2,
          shadowOpacity: 0.15,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "700",
          color: colors.primary,
        },
        headerLeft: () => <HeaderLogo />,
        tabBarStyle: {
          backgroundColor: colors.primary,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: "#C8E6C9",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 3,
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
          if (route.name === "Home") iconName = focused ? "home" : "home-outline";
          else if (route.name === "Notifications")
            iconName = focused ? "notifications" : "notifications-outline";
          else if (route.name === "Program")
            iconName = focused ? "book" : "book-outline";
          else if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName} size={22} color={color} />;
        },
        headerRight: () => <HeaderLogo />,
        tabBarOptionStyle: {
          backgroundColor: colors.primary,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarOptionActiveTintColor: colors.white,
        tabBarOptionInactiveTintColor: "#C8E6C9",
        tabBarOptionLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 3,
        },
      })}
    >
      <Tabs.Screen name="Home" component={DashboardScreen} />
      <Tabs.Screen name="Notifications" component={NotificationsScreen} />
      <Tabs.Screen name="Program" component={ProgramScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

// ✅ Stack navigation
export default function AppNavigator() {
  const { user, loading } = useAuth();
  if (loading) return null;

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Forgot" component={ForgotScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Tabs" component={MainTabs} />
            <Stack.Screen name="Faculty" component={FacultyScreen} />
            <Stack.Screen name="TestFaculty" component={TestFacultyScreen} />
            <Stack.Screen name="Committee" component={CommitteeScreen} />
            <Stack.Screen name="WebViewPage" component={WebViewPage} />
            <Stack.Screen name="ProgramDetail" component={ProgramDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
