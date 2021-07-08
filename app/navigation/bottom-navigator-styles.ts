import { ImageStyle, ViewStyle, TextStyle } from 'react-native';
import { color,typography } from '../theme';
import { moderateVerticalScale, scale, verticalScale } from '../utils/scale';

export const bottomNavigatorStyles = {
    ROOT: {
        flexDirection: "row",
    } as ViewStyle,
    WHITETRIANGLE:{
        borderBottomColor:"white",
        borderBottomWidth: 17,
        borderLeftWidth: 105,
        borderLeftColor: "transparent",
        borderRightWidth: 105,
        borderRightColor: "transparent",
        borderEndColor: "transparent",
        height:scale(0),
        width: scale(0),
        left: 0,
        top: -17,
        bottom: -2,
        position: "absolute",
        backgroundColor: "transparent"
    }as ViewStyle,
    WHITEREACTANGLE:{
        backgroundColor: "white" , 
        height: verticalScale(91.3), 
        width: scale(187.7), 
        borderTopColor: "transparent", 
        justifyContent: "center"
    }as ViewStyle,
    YELLOWREACTANGLE:{
        backgroundColor: color.palette.yellow , 
        height: verticalScale(91.3), 
        width: scale(187.7), 
        borderTopColor: "transparent", 
        justifyContent: "center"
    }as ViewStyle,
    ICON:{
        height: verticalScale(23.3), 
        alignSelf: "center", 
        marginBottom: verticalScale(10),
        marginTop:verticalScale(11)
    }as ImageStyle,
    TITLE:{
        color: color.palette.black, 
        alignSelf: "center", 
        fontFamily: typography.regular, 
        fontSize: moderateVerticalScale(17.3),
        marginBottom:verticalScale(19.7) 
    }as TextStyle
}