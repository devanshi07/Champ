import { ViewStyle, TextStyle } from 'react-native';
import { color } from '../../theme';
import { moderateVerticalScale, scale, verticalScale } from '../../utils/scale';

export const dashboardScreenStyles = {

    FLATLIST: {
        justifyContent: "center",
        flexGrow: 1
    } as ViewStyle,
    TEXTSTYLE: {
        color: color.palette.textColor,
        alignSelf: "center",
        fontSize: moderateVerticalScale(15.3),
        letterSpacing: 3.07,
        textTransform: "uppercase",
    } as TextStyle,
    BUTTON: {
        width: scale(308.3),
        height: verticalScale(53.3),
        borderWidth: 1,
        borderColor: "#ffffff",
        justifyContent: "center",
        marginBottom: 16.7,
        alignSelf: "center"
    } as ViewStyle
}