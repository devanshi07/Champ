import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Icon } from "../components"
import { bottomNavigatorStyles } from "./bottom-navigator-styles"

export function MyTabBar({ navigation, descriptors, state }) {
  return (
    <View style={bottomNavigatorStyles.ROOT} >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
        const key = index;
        const isFocused = state.index === index;
        const onPress = () => {
          console.tron.log(index)
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
            key: label !== "Dashboard" ? "second" : "first"
          });
        };
        return (
          <View {...{ key }}>
            {isFocused ? <View style={isFocused ? bottomNavigatorStyles.WHITETRIANGLE : bottomNavigatorStyles.YELLOWTRIANGLE}></View> : <></>}
            <TouchableOpacity accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={isFocused ? bottomNavigatorStyles.WHITEREACTANGLE : bottomNavigatorStyles.YELLOWREACTANGLE}>
              <Icon icon={label !== "Dashboard" ? "userIcon" : "homeIcon"} style={bottomNavigatorStyles.ICON} />
              <Text style={bottomNavigatorStyles.TITLE}>
                {label}
              </Text>
            </TouchableOpacity>
          </View>
        )
      })}
    </View>
  );
}