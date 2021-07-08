import { ImageStyle, ViewStyle, TextStyle } from 'react-native';
import { color, typography } from '../theme';
import { moderateVerticalScale, scale, verticalScale } from '../utils/scale';

export const drawerNavigatorStyles = {
    ROOT: {
        flex: 1,
        backgroundColor: "black",
        marginHorizontal: scale(33.3),
    } as ViewStyle,
    UPPERPART: {
        flex: 1
    } as ViewStyle,
    BOTTOMPART: {
        padding: 0,
        marginBottom: verticalScale(35.7),
    } as ViewStyle,
    LOGO: {
        width: scale(36),
        height: verticalScale(36)
    } as ImageStyle,
    TEXTSTYLE: {
        color: "white",
        fontFamily: typography.regular,
        fontSize: moderateVerticalScale(20),
        lineHeight: verticalScale(50),
        textTransform: "uppercase"
    } as TextStyle,
    TITLE: {
        fontSize: moderateVerticalScale(23.8),
        marginTop: verticalScale(5.3),
        fontWeight: "bold",
        color: color.palette.textColor,
        textTransform: "uppercase"
    } as TextStyle,
    CAPTION: {
        fontSize: moderateVerticalScale(5),
        color: color.palette.textColor,
        letterSpacing: scale(2.4),
        fontFamily: typography.light,
        marginTop: verticalScale(4)
    } as TextStyle,
    LABELSTYLE: {
        color: color.palette.textColor,
        fontSize: moderateVerticalScale(20),
        fontFamily: typography.regular,
        lineHeight: verticalScale(25),
        textTransform: "uppercase",
        left: -6,
    } as TextStyle,
    ACTIVELABELSTYLE: {
        color: color.palette.yellow,
        fontSize: moderateVerticalScale(20),
        fontFamily: typography.regular,
        lineHeight: verticalScale(25),
        textTransform: "uppercase",
        left: -6,
    } as TextStyle,
    DRAWERITEMSTYLE: {
        left: -10
    } as ViewStyle
}