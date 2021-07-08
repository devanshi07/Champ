import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Icon } from "../components"
import { useStores } from "../models"
import { drawerNavigatorStyles } from "./drawer-navigator-styles"
import { verticalScale } from "../utils/scale"
import { DrawerItem } from '@react-navigation/drawer';
import { color } from "../theme"

export function DrawerContent({ navigation, props }) {
  const { authStore, parentCategoryStore, subCategoryStore } = useStores()
  return (
    <View style={drawerNavigatorStyles.ROOT} {...props}>
      <View style={drawerNavigatorStyles.UPPERPART}>
        <View>
          <Icon icon="loginScreenLogo" style={drawerNavigatorStyles.LOGO} />
          <Text style={drawerNavigatorStyles.TITLE}>Boxing</Text>
          <Text style={drawerNavigatorStyles.CAPTION}>by Tatvasoft</Text>
        </View>
        <View style={{ marginTop: verticalScale(66) }}>
          <DrawerItem
            label='Dashboard'
            labelStyle={subCategoryStore.currentSubcategoryId == 0 ? drawerNavigatorStyles.ACTIVELABELSTYLE : drawerNavigatorStyles.LABELSTYLE}
            onPress={() =>
              navigation.navigate("dashboradScreen")}
            activeTintColor="yellow"
            inactiveTintColor={color.palette.white}
            activeBackgroundColor="black"
            focused={subCategoryStore.currentSubcategoryId == 0 ? true : false}
            style={drawerNavigatorStyles.DRAWERITEMSTYLE} />
          {parentCategoryStore.parentCategoryDetails.map((item, key) => {
            return (
              <DrawerItem key={key}
                label={item.name}
                labelStyle={subCategoryStore.currentSubcategoryId == item.id ? drawerNavigatorStyles.ACTIVELABELSTYLE : drawerNavigatorStyles.LABELSTYLE}
                onPress={() =>
                  navigation.navigate("subcategory", { ParamId: item.id, ParamName: item.name })}
                activeTintColor="black"
                inactiveTintColor={color.palette.white}
                activeBackgroundColor="black"
                focused={subCategoryStore.currentSubcategoryId == item.id ? true : false}
                style={drawerNavigatorStyles.DRAWERITEMSTYLE} />
            );
          })
          }
        </View>
      </View>
      <TouchableOpacity style={drawerNavigatorStyles.BOTTOMPART}
        onPress={() => {
          authStore.removeAccess()
        }}>
        <Text style={drawerNavigatorStyles.TEXTSTYLE}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}