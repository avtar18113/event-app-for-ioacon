import React, { useState } from "react";
import { Image, View, StatusBar, Platform } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Menu, Provider as PaperProvider } from "react-native-paper";
import { useAuth } from "../context/AuthProvider";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

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

const HeaderLogo = () => (
  <Image
    source={require("../../assets/event-logo.png")}
    style={{ width: 120, height: 40, resizeMode: "contain" }}
  />
);

function HeaderMenu({ navigation }: any) {
  const { logout } = useAuth();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Ionicons
          name="ellipsis-vertical"
          size={24}
          color={colors.primary}
          onPress={openMenu}
          style={{ marginRight: 12 }}
        />
      }
    >
      <Menu.Item
        onPress={() => {
          closeMenu();
          navigation.navigate("Profile");
        }}
        title="Profile"
      />
      <Menu.Item
        onPress={() => {
          closeMenu();
          logout();
        }}
        title="Logout"
      />
      <Menu.Item
        onPress={() => {
          closeMenu();
          navigation.navigate("Profile");
        }}
        title="Logout"
      />
    </Menu>
  );
}

function MainTabs() {
  const insets = useSafeAreaInsets(); // 👈 handle bottom padding dynamically

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <Tabs.Navigator
        screenOptions={({ route, navigation }) => ({
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomWidth: 1,
            borderColor: colors.primary,
            elevation: 3,
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "700",
            color: colors.primary,
          },
          headerLeft: () => <HeaderLogo />,
          headerRight: () => <HeaderMenu navigation={navigation} />,
          tabBarStyle: {
            backgroundColor: colors.primary,
            height: 70 + insets.bottom, // 👈 dynamic safe bottom
            paddingBottom: insets.bottom > 0 ? insets.bottom - 4 : 8,
            paddingTop: 8,
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
            else if (route.name === "Notifications")
              iconName = focused ? "notifications" : "notifications-outline";
            else if (route.name === "Program")
              iconName = focused ? "book" : "book-outline";
            else if (route.name === "Profile")
              iconName = focused ? "person" : "person-outline";
            return <Ionicons name={iconName} size={22} color={color} />;
          },
        })}
      >
        <Tabs.Screen name="Home" component={DashboardScreen} />
        <Tabs.Screen name="Notifications" component={NotificationsScreen} />
        <Tabs.Screen name="Program" component={ProgramScreen} />
        <Tabs.Screen name="Profile" component={ProfileScreen} />
      </Tabs.Navigator>
    </View>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();
  if (loading) return null;

  return (
    <PaperProvider >
      <SafeAreaProvider style={{ flex: 1, backgroundColor: colors.bgPrimary }}>       
        <StatusBar     
          barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"} hidden={false} backgroundColor={colors.bgPrimary}
        />
       
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: { ...DefaultTheme.colors, background: colors.bgPrimary },
          }}
        >
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
      </SafeAreaProvider>
    </PaperProvider>
  );
}
