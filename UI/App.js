import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './src/pages/Dashboard'
import Order from './src/pages/Order'
import Product from './src/pages/Product'
import Cost from './src/pages/Cost'
import Setting from './src/pages/Setting'
import Login from './src/pages/Login'
import Signup from './src/pages/Signup'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sidebar from './src/components/Sidebar';
import { StatusBar } from 'react-native';
import * as SystemUI from 'expo-system-ui';
import { useAuthStore } from './src/store/useAuthSore';

// Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#fff',
        },
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const tabIcons = {
            Order: {
              focused: 'list-circle',
              outline: 'list-circle-outline',
            },
            Dashboard: {
              focused: 'home',
              outline: 'home-outline',
            },
            Product: {
              focused: 'cube',
              outline: 'cube-outline',
            },
            Cost: {
              focused: 'cash',
              outline: 'cash-outline',
            },
            Setting: {
              focused: 'settings',
              outline: 'settings-outline',
            },
          };
          const { focused: focusedIcon, outline } = tabIcons[route.name] || {};
          const iconName = focused ? focusedIcon : outline;

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >

      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Product" component={Product} />
      <Tab.Screen name="Cost" component={Cost} />
      <Tab.Screen name="Setting" component={Setting} />

    </Tab.Navigator>
  );
}

// Memoize the Sidebar component to prevent unnecessary re-renders
const MemoizedSidebar = React.memo((props) => <Sidebar {...props} />);

const MainDrawer = () => {
  // Use useMemo to prevent recreation of screenOptions on re-renders
  const screenOptions = useMemo(() => ({
    headerShown: false,
    drawerType: 'slide', // Changed to 'slide' which often performs better
    swipeEnabled: false, // Disable swipe gesture for better performance
    drawerStyle: {
      width: 250,
    },
    // Defer non-critical animations until after interactions
    drawerOpenOptions: {
      useNativeAnimations: true,
      containerStyle: { opacity: 1 },
    },
  }), []);

  // Use useMemo to stabilize the reference for drawerContent
  const drawerContent = useMemo(() => {
    return (props) => {
      // Defer rendering complex content during animation
      InteractionManager.runAfterInteractions(() => {
        // Heavy sidebar operations can go here
      });
      return <MemoizedSidebar {...props} />;
    };
  }, []);
  // const MainDrawer = () => {
  //   return (
  //     <Drawer.Navigator
  //       drawerContent={Sidebar}
  //       screenOptions={{
  //         headerShown: false,
  //         drawerType: 'front',
  //         drawerStyle: {
  //           width: 250,
  //         },
  //       }}
  //     >
  //       <Drawer.Screen name="MainTabs" component={MainTabs} />
  //     </Drawer.Navigator>
  //   );
  // };

  export default function App() {
    const { authUser } = useAuthStore();
    return (

      <>
        {/* if translucent -> true , make bg color semitransparent */}
        <StatusBar
          barStyle="dark-content"
          backgroundColor='rgba(238, 238, 238, 0.24)'
          translucent={true}
        />
        <NavigationContainer>

          <Stack.Navigator screenOptions={{ headerShown: false }}>

            {!authUser ? (
              <>
                <Stack.Screen name="Login" component={Login} options={{ animation: 'slide_from_left' }} />
                <Stack.Screen name="Signup" component={Signup} options={{ animation: 'slide_from_right' }} />
              </>
            ) : <Stack.Screen name="MainApps" component={MainDrawer} />}

          </Stack.Navigator>

        </NavigationContainer>
      </>

    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
