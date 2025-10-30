import React, { useState } from "react";
import {
  Image,
  
  StatusBar,
  
} from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Menu, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaFrameContext, SafeAreaProvider } from "react-native-safe-area-context";


import { useAuth } from "../context/AuthProvider";

// screens
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
import MessageScreen from "../screens/MessageScreen";
import { colors } from "../theme/colors";
import TestScreen from "../components/TestScreen";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

/* ---------- header logo + menu ---------- */
const HeaderLogo = () => (
  <Image
    source={require("../../assets/event-logo.png")}
    style={{ width: 120, height: 40, resizeMode: "contain" }}
  />
);

function HeaderMenu({ navigation }: any) {
  const { logout } = useAuth();
  const [visible, setVisible] = useState(false);
  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <Ionicons
          name="ellipsis-vertical"
          size={24}
          color={colors.primary}
          onPress={() => setVisible(true)}
          style={{ marginRight: 12 }}
        />
      }
    >
      <Menu.Item
        onPress={() => {
          setVisible(false);
          navigation.navigate("Profile");
        }}
        title="Profile"
      />
      <Menu.Item
        onPress={() => {
          setVisible(false);
          logout();
        }}
        title="Logout"
      />
    </Menu>
  );
}

/* ---------- tabs ---------- */
function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route, navigation }) => ({
        headerStyle: {
          backgroundColor: colors.white,
          borderBottomWidth: 1,
          borderColor: colors.primary,
          elevation: 3,
        },
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "700", color: colors.primary },
        headerLeft: () => <HeaderLogo />,
        headerRight: () => <HeaderMenu navigation={navigation} />,
        tabBarStyle: {
          backgroundColor: colors.primary,
          height: 65,
          paddingBottom: 6,
          paddingTop: 6,
          borderTopWidth: 0,
          elevation: 12,
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
          else if (route.name === "Program")
            iconName = focused ? "book" : "book-outline";
          else if (route.name === "Notifications")
            iconName = focused ? "notifications" : "notifications-outline";
          else if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";
          else if (route.name === "Faculty")
            iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="Home" component={DashboardScreen} />
      {/* <Tabs.Screen name="Home" component={TestScreen} /> */}
      
      
      <Tabs.Screen name="Program" component={ProgramScreen} />
      <Tabs.Screen name="Notifications" component={NotificationsScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
      {/* <Tabs.Screen name="Faculty" component={FacultyScreen} /> */}
    </Tabs.Navigator>
  );
}

/* ---------- root navigator ---------- */
export default function AppNavigator() {
  const { user, loading } = useAuth();
  if (loading) return null;

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <StatusBar
       
          // barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"}
          // backgroundColor={colors.bgPrimary}
        />

        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: { ...DefaultTheme.colors, background: colors.background },
          }}
        >
          <Stack.Navigator>
            {!user ? (
              <>
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={RegisterScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Forgot"
                  component={ForgotScreen}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
                {/* main tab flow */}
                <Stack.Screen
                  name="Tabs"
                  component={MainTabs}
                  options={{ headerShown: false }}
                />

                {/* nested pages that keep header */}
                <Stack.Screen
                  name="Faculty"
                  component={FacultyScreen}
                  options={{ headerShown: true, title: "Faculty" }}
                />
                <Stack.Screen
                  name="Committee"
                  component={CommitteeScreen}
                  options={{ headerShown: true, title: "Committee" }}
                />
                <Stack.Screen
                  name="Message"
                  component={MessageScreen}
                  options={{ headerShown: true, title: "Message" }}
                />

                {/* detail / webview pages hide tab bar but keep safe area */}
                <Stack.Screen
                  name="WebViewPage"
                  component={WebViewPage}
                  options={{
                    headerShown: false,
                    title: "View",
                    presentation: "modal",
                  }}
                />
                <Stack.Screen
                  name="ProgramDetail"
                  component={ProgramDetailScreen}
                  options={{
                    headerShown: true,
                    title: "Program Details",
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
