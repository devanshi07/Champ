import { ViewStyle, TextStyle } from 'react-native';
import { color } from '../../theme';
import { moderateVerticalScale, scale, verticalScale } from '../../utils/scale';

export const dashboardScreenStyles = {
    ROOT: {
        backgroundColor: color.palette.black,
        flex: 1,
    } as ViewStyle,
    FLATLIST: {
        justifyContent: "center",
        flexGrow: 1
    } as ViewStyle,
    TEXTSTYLE: {
        color: color.palette.textColor,
        alignSelf: "center",
        fontSize: moderateVerticalScale(15.3),
        letterSpacing: scale(3.07),
        textTransform: "uppercase",
    } as TextStyle,
    BUTTON: {
        width: scale(308.3),
        height: verticalScale(53.3),
        borderWidth: 1,
        borderColor: "#ffffff",
        justifyContent: "center",
        marginBottom: verticalScale(16.7),
        alignSelf: "center"
    } as ViewStyle,
    ACTIVITYINDICATOR: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.5,
        backgroundColor: "black"
    } as ViewStyle
}