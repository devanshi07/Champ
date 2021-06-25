import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { typography } from '../../theme';
import { moderateVerticalScale, scale, verticalScale } from '../../utils/scale';

export const imageDetailScreenStyles = {
    MAINVIEW: {
        flex: 1
    } as ViewStyle,
    PAGINATION: {
        width: scale(13.3),
        height: verticalScale(13.3),
        borderRadius: 360,
        backgroundColor: 'yellow',
        marginBottom: verticalScale(30),
    } as ViewStyle,
    SLIDEVIEW: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(26.7),
    } as ViewStyle,
    TOPBUTTONVIEW: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: verticalScale(13.3),
        marginHorizontal: scale(33.3)
    } as ViewStyle,
    PREVBUTTON: {
        width: scale(61.3),
        height: verticalScale(26.7),
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center'
    } as ViewStyle,
    NEXTBUTTON: {
        width: scale(61.3),
        height: verticalScale(26.7),
        backgroundColor: 'yellow',
        justifyContent: 'center'
    } as ViewStyle,
    INNERBUTTONVIEW: {
        justifyContent: "center",
        flexDirection: "row",
        marginVertical: verticalScale(9)
    } as ViewStyle,
    PREVBUTTONTEXT: {
        color: 'white',
        fontSize: moderateVerticalScale(12),
        fontFamily: typography.regular,
        alignSelf: "center",
        marginLeft: scale(10)
    } as TextStyle,
    NEXTBUTTONTEXT: {
        color: 'black',
        fontSize: moderateVerticalScale(12),
        fontFamily: typography.regular,
        alignSelf: "center",
        marginRight: scale(10)
    } as TextStyle,
    BUTTONIMAGE: {
        width: scale(5),
        height: verticalScale(8.7),
        marginTop: verticalScale(4),
    } as ImageStyle,
    SLIDERIMAGE: {
        alignSelf: 'center',
        width: "100%",
        height: verticalScale(270.7),
        marginBottom: verticalScale(26.3),
    } as ImageStyle,
    SLIDERTITLE: {
        color: 'white',
        fontSize: moderateVerticalScale(20),
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: typography.bold,
        marginBottom: verticalScale(16.3)
    } as TextStyle,
    SLIDERDES: {
        color: 'white',
        fontSize: moderateVerticalScale(17.3),
        textAlign: "center",
        fontFamily: typography.light,
        bottom: verticalScale(30)
    } as TextStyle,
    FLATLIST: {
        marginVertical: verticalScale(7),
        justifyContent: "center",
    } as ViewStyle,
    RENDERVIEW: {
        marginHorizontal: scale(33.3),
        justifyContent: "center"
    } as ViewStyle,
    RENDERTITLE: {
        fontFamily: typography.bold,
        fontSize: moderateVerticalScale(17.3),
        textTransform: "uppercase",
        marginBottom: verticalScale(16.3)
    } as TextStyle,
    RENDERIMAGE: {
        alignSelf: "center",
        height: verticalScale(139),
        width: scale(308.3),
        resizeMode: "cover",
    } as ImageStyle,
    RENDERDES: {
        fontFamily: typography.light,
        fontSize: moderateVerticalScale(15.3),
        lineHeight: verticalScale(22),
        marginTop: verticalScale(16.7),
        marginBottom: verticalScale(46.7),
        color: "white"
    } as TextStyle,
    NONEVIEW: {
        position: "absolute",
        justifyContent: "center",
        top: 250,
        alignSelf: "center"
    } as ViewStyle,
    NONEIMAGE: {
        backgroundColor: "white",
        alignSelf: "center"
    } as ImageStyle,
    NONETEXT: {
        color: "white",
        fontSize: 30
    } as TextStyle,
    ACTIVITYINDICATOR: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.5,
        backgroundColor: "black"
    } as ViewStyle
}