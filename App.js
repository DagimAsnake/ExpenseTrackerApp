import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import { GlobalStyles } from "./Constants/Styles";
import IconButton from "./Components/Ui/IconButton";

import AllExpensesScreen from "./Screens/AllExpensesScreen";
import RecentExpensesScreen from "./Screens/RecentExpensesScreen";
import ManageExpensesScreen from "./Screens/ManageExpensesScreen"

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

function BottomNav () {
  return (
    <BottomTab.Navigator initialRouteName="All Expenses" 
      screenOptions={({navigation}) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => <IconButton name={"add"} size={24} color={tintColor} onPress={() => {navigation.navigate("Manage Expenses")}} />
      })}
    >
        <BottomTab.Screen name="Recent Expenses" component={RecentExpensesScreen}
             options={{
              tabBarLabel: 'Recent',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="timer-sand-empty" size={size} color={color} />
              )
            }}
        />
        <BottomTab.Screen name="All Expenses" component={AllExpensesScreen} 
             options={{
              tabBarIcon: ({color, size}) => (
                <Ionicons name="calendar" size={size} color={color} />
              )
            }}
        />
      </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
    <StatusBar style="auto" />
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: "white"
        }}
      > 
        <Stack.Screen name="BottomNav" component={BottomNav} options={{headerShown: false}} />
        <Stack.Screen name="Manage Expenses" component={ManageExpensesScreen} 
          options={{
            presentation: "modal"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}