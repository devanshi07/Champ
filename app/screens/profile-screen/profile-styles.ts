import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { typography } from '../../theme';
import { moderateVerticalScale, scale, verticalScale } from '../../utils/scale';

export const profileScreenStyles = {
    ROOT: {
        flex: 1
    } as ViewStyle,
    PROFILEVIEW: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: "100%",
    } as ViewStyle,
    PROFILEIMAGE: {
        width: scale(116.7),
        height: scale(116.7),
        borderRadius: 360,
        borderColor: "#eece00",
        borderWidth: 2,
        justifyContent: "center",
        alignSelf: "center"
    } as ImageStyle,
    PLACEHOLDERVIEW: {
        width: scale(116.7),
        height: scale(116.7),
        borderRadius: 360,
        borderColor: "#eece00",
        borderWidth: 2,
        marginTop: verticalScale(33.3),
        justifyContent: "center"
    } as ViewStyle,
    PLACEHOLDERTEXT: {
        alignSelf: "center",
        fontFamily: typography.light,
        letterSpacing: scale(0.43),
        fontSize: moderateVerticalScale(17.3),
        color: "#ffffff"
    } as TextStyle,
    PROFILENAME: {
        fontFamily: typography.semiBold,
        letterSpacing: scale(0.6),
        fontSize: moderateVerticalScale(24),
        color: "#ffffff",
        textAlign: "center",
        alignSelf: "flex-start",
        paddingLeft: scale(10)
    } as TextStyle,
    PROFILETEXT: {
        fontFamily: typography.light,
        letterSpacing: scale(0.43),
        fontSize: moderateVerticalScale(17.3),
        color: "#ffffff",
        textAlign: "center",
        alignSelf: "flex-start",
        paddingLeft: scale(10)
    } as TextStyle,
    CATEGORYVIEW: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: scale(33.3),
        marginBottom: verticalScale(49.3)
    } as ViewStyle,
    SAVEDTEXT: {
        fontFamily: typography.regular,
        fontSize: moderateVerticalScale(20),
        color: "#eece00",
        alignSelf: "flex-start",
        marginTop: verticalScale(27)
    } as TextStyle,
    SEARCHVIEW: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "white",
        alignItems: "center",
        width: "100%",
    } as ViewStyle,
    TEXTINPUT: {
        fontSize: moderateVerticalScale(16),
        color: "white",
        fontFamily: typography.light,
        flex: 1
    } as TextStyle,
    SEARCHIMAGE: {
        height: verticalScale(20),
        width: verticalScale(20)
    } as ImageStyle,
    ITEMSEPERATOR: {
        margin: 5
    } as ViewStyle,
    CLOSEBUTTON: {
        flexDirection: "row",
        height: verticalScale(43.3),
        borderWidth: 1,
        justifyContent: "space-between",
        marginTop: verticalScale(16.7),
        alignItems: "center",
        borderColor: "white",
        width: "75%",
        alignSelf: "center"
    } as ViewStyle,
    OPENBUTTON: {
        flexDirection: "row",
        height: verticalScale(43.3),
        borderWidth: 1,
        justifyContent: "space-between",
        marginTop: verticalScale(16.7),
        alignItems: "center",
        backgroundColor: "#eece00",
        width: "75%",
        alignSelf: "center"
    } as ViewStyle,
    CLOSEBUTTONTEXT: {
        fontFamily: typography.regular,
        fontSize: moderateVerticalScale(17.3),
        color: "#ffffff",
        flex: 1,
        marginLeft: scale(17.3),
        textTransform: "uppercase"
    } as TextStyle,
    OPENBUTTONTEXT: {
        fontFamily: typography.regular,
        fontSize: moderateVerticalScale(17.3),
        color: "#000000",
        flex: 1,
        marginLeft: scale(17.3),
        textTransform: "uppercase"
    } as TextStyle,
    BUTTONICON: {
        height: verticalScale(9),
        marginRight: scale(14)
    } as ImageStyle,
    LISTVIEW: {
        marginRight: scale(4)
    } as ViewStyle,
    LISTITEMVIEW: {
        flex: 1,
        width: verticalScale(64.3),
        height: verticalScale(64.7),
        borderRadius: 360,
        borderColor: 'yellow',
        borderWidth: 2,
        backgroundColor: "white",
    } as ViewStyle,
    LISTIMAGE: {
        alignSelf: 'center',
        width: "100%",
        height: verticalScale(50.7),
        marginBottom: verticalScale(6.7),
        borderRadius: 360,
        marginTop: verticalScale(6),
    } as ImageStyle,
    LISTVIDEOIMAGE: {
        alignSelf: 'center',
        width: "100%",
        height: "100%",
        marginBottom: verticalScale(6.7),
        borderRadius: 360,
        marginTop: 0,
    } as ImageStyle,
    DELETEVIEW: {
        height: verticalScale(17),
        width: verticalScale(16.7),
        backgroundColor: "red",
        position: "absolute",
        left: 40,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        borderRadius: 360,
    } as ViewStyle,
    DELETEICON: {
        alignSelf: "center",
        backgroundColor: "red",
        width: verticalScale(8.7),
        height: verticalScale(9.3)
    } as ImageStyle,
    DISPLAYVIEW: {
        marginBottom: verticalScale(31.7),
        marginTop: verticalScale(17.3),
        width: "75%",
        alignSelf: "center"
    } as ViewStyle,
    DISPLAYTEXT: {
        fontWeight: '800',
        fontSize: moderateVerticalScale(18),
        color: '#f4f4f4',
        marginBottom: verticalScale(16.3),
    } as TextStyle,
    LISTSEPARATOR: {
        margin: 12.7
    } as ViewStyle,
}