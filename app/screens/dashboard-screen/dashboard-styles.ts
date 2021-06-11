import { ImageStyle, ViewStyle, TextStyle } from 'react-native';
import { color,typography } from '../../theme';
import { moderateVerticalScale, scale, verticalScale } from '../../utils/scale';

export const dashboardScreenStyles = {

    MAINVIEW: {
        flex:1 ,
        justifyContent:"center",
        alignSelf:"center"
    } as ViewStyle,

    TEXTSTYLE: {
        color: color.palette.textColor, 
        alignSelf: "center", 
        fontSize: moderateVerticalScale(15.3), 
        letterSpacing: 3.07,
        textTransform: "uppercase",
    } as TextStyle,
}