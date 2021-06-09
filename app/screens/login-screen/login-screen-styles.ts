import { ImageStyle, ViewStyle, TextStyle } from 'react-native';
import { color,typography } from '../../theme';
import { moderateVerticalScale, scale, verticalScale } from '../../utils/scale';

export const loginScreenStyles = {
    //main container
    ROOT: {
        flex: 1,
        backgroundColor: color.palette.black
    } as ViewStyle,

    //style for logo
    LOGO: {
        width: scale(221.7),
        height: verticalScale(131),
        marginTop: verticalScale(30),
    } as ImageStyle,
    
    TEXTSTYLE: {
        fontSize: moderateVerticalScale(12),
        color: color.palette.textColor,
        fontFamily: typography.light
    } as TextStyle,

    //styles for buttons
    SIGNINBTN: {
        height: verticalScale(53.3),
        justifyContent: "center",
        backgroundColor: '#eece00',
        marginTop: verticalScale(33.3),
        marginBottom:verticalScale(160.7)
    } as ViewStyle,
    FACEBOOKBTN: {
        height: verticalScale(53.3),
        justifyContent: "center",
        backgroundColor: '#4267b2',
    } as ViewStyle,
    GMAILBTN: {
        height: verticalScale(53.3),
        justifyContent: "center",
        backgroundColor: '#b23121',
        marginTop: verticalScale(10),
        marginBottom: verticalScale(50.7)
    } as ViewStyle,

    //style for email and password view
    EMAILVIEW: {
        marginTop: verticalScale(46.3),
    } as ViewStyle,
    PASSWORDVIEW: {
        marginTop: verticalScale(32.7)
    } as ViewStyle,
    TEXTINPUTSTYLE: {
        borderBottomColor: color.palette.white,
        borderBottomWidth: 0.7,
        fontSize: moderateVerticalScale(16),
        color: color.palette.white,
        fontFamily:typography.light
    } as TextStyle,

    //style for button text
    BTNTEXTSTYLE: {
        fontSize: moderateVerticalScale(15.3),
        color: color.palette.textColor,
        alignSelf: "center",
        fontFamily: typography.regular
    } as TextStyle,
    SIGNINTEXT: {
        fontSize: moderateVerticalScale(15.3),
        alignSelf: "center",
        letterSpacing: 3.07,
        color: color.palette.black,
        fontFamily:typography.regular
    } as TextStyle,

    //style for error msg
    ERRORMSGVIEW: {
        marginTop: verticalScale(9.7),
    } as ViewStyle,
    ERRORMSGTEXT: {
        fontSize: moderateVerticalScale(12),
        color: "#c53838",
        fontFamily: typography.regular,
        lineHeight:verticalScale(18.7)
    } as TextStyle,

}