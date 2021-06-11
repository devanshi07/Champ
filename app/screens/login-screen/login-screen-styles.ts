import { ImageStyle, ViewStyle, TextStyle } from 'react-native';
import { color,typography } from '../../theme';
import { moderateVerticalScale, scale, verticalScale } from '../../utils/scale';

export const loginScreenStyles = {
    //all style for views
    ROOT: {
        flex: 1,
    } as ViewStyle,
    MAINCONTAINER: {
        flex:1,
        marginHorizontal: scale(33.3)
    }as ViewStyle,
    BOTTOMVIEW: {
        marginBottom:verticalScale(50.7),
        justifyContent:"flex-end"
    }as ViewStyle,
    ERRORMSGVIEW: {
        marginTop: verticalScale(9.7),
    } as ViewStyle,
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
    } as ViewStyle,
    EMAILVIEW: {
        marginTop: verticalScale(46.3),
    } as ViewStyle,
    PASSWORDVIEW: {
        marginTop: verticalScale(32.7)
    } as ViewStyle,
    //style for logo
    LOGO: {
        width: scale(66.7),
        height: verticalScale(66.7),
        marginTop: verticalScale(50.7),
    } as ImageStyle,
    //style for all text
    WELCOMETEXT: {
        fontSize: moderateVerticalScale(30), 
        marginTop: 18.7,
        fontFamily: typography.semiBold
    } as TextStyle,
    SIGNINWELCOMETEXT: {
        fontSize: moderateVerticalScale(16.7),
        fontFamily: typography.regular
    } as TextStyle,
    TEXTSTYLE: {
        fontSize: moderateVerticalScale(12),
        color: color.palette.textColor,
        fontFamily: typography.light
    } as TextStyle,
    TEXTINPUTSTYLE: {
        borderBottomColor: color.palette.white,
        borderBottomWidth: 0.7,
        fontSize: moderateVerticalScale(16),
        color: color.palette.white,
        fontFamily:typography.light,
        paddingLeft:0
    } as TextStyle,
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
    ERRORMSGTEXT: {
        fontSize: moderateVerticalScale(12),
        color: "#c53838",
        fontFamily: typography.regular,
        lineHeight:verticalScale(18.7)
    } as TextStyle,

}