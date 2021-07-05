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
        width: 116.7,
        height: 116.7,
        borderRadius: 360,
        borderColor: 'yellow',
        borderWidth: 2,
        // marginTop: 33.3,
        justifyContent: "center",
        alignSelf: "center"
    } as ImageStyle,
    PLACEHOLDERVIEW: {
        width: 116.7,
        height: 116.7,
        borderRadius: 360,
        borderColor: 'yellow',
        borderWidth: 2,
        marginTop: 33.3,
        justifyContent: "center"
    } as ViewStyle,
    PLACEHOLDERTEXT: {
        alignSelf: "center", fontFamily: typography.light, letterSpacing: 0.43, fontSize: 17.3, color: "#ffffff"
    } as TextStyle,
    PROFILENAME: {
        fontFamily: typography.semiBold, letterSpacing: 0.6, fontSize: 24, color: "#ffffff",  textAlign: "center"
    } as TextStyle,
    PROFILETEXT: {
        fontFamily: typography.light, letterSpacing: 0.43, fontSize: 17.3, color: "#ffffff", textAlign: "center"
    } as TextStyle,
    CATEGORYVIEW: {
        justifyContent: "center", alignItems: "center", marginHorizontal: 33.3, marginBottom: 49.3,
    } as ViewStyle,
    SAVEDTEXT: {
        fontFamily: typography.regular, fontSize: 20, color: "#eece00", alignSelf: "flex-start", marginTop: 27
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
        fontSize: 16,
        color: "white",
        fontFamily: typography.light,
        flex: 1
    } as TextStyle,
    SEARCHIMAGE: {
        height: 20,
        width: 20
    } as ImageStyle,
    SEARCHLIST: {
        backgroundColor: "black", width: "100%", borderColor: "white", borderWidth: 1, paddingLeft: 5
    } as ViewStyle,
    ITEMSEPERATOR: {
        margin: 5
    } as ViewStyle,
    CLOSEBUTTON: {
        flex: 1, flexDirection: "row", height: 43.3, borderWidth: 1, justifyContent: "center", marginTop: 16.7, alignItems: "center", borderColor: "white"
    } as ViewStyle,
    OPENBUTTON: {
        flex: 1, flexDirection: "row", height: 43.3, borderWidth: 1, justifyContent: "center", marginTop: 16.7, alignItems: "center", backgroundColor: "#eece00"
    } as ViewStyle,
    CLOSEBUTTONTEXT: {
        fontFamily: typography.regular, fontSize: 17.3, color: "#ffffff", flex: 1, marginLeft: 17.3
    } as TextStyle,
    OPENBUTTONTEXT: {
        fontFamily: typography.regular, fontSize: 17.3, color: "#000000", flex: 1, marginLeft: 17.3
    } as TextStyle,
    BUTTONICON: {
        height: 9, marginRight: 14
    } as ImageStyle,
    LISTVIEW: {
        marginRight: 4
    } as ViewStyle,
    LISTITEMVIEW: {
        flex: 1,
        width: 64.3,
        height: 64.7,
        borderRadius: 360,
        borderColor: 'yellow',
        borderWidth: 2,
        backgroundColor: "white",
    } as ViewStyle,
    LISTIMAGE: {
        alignSelf: 'center',
        width: "100%",
        height: 50.7,
        marginBottom: 6.7,
        borderRadius: 360,
        marginTop: 6,
    } as ImageStyle,
    LISTVIDEOIMAGE: {
        alignSelf: 'center',
        width: "100%",
        height: "100%",
        marginBottom: 6.7,
        borderRadius: 360,
        marginTop: 0,
    } as ImageStyle,
    DELETEVIEW: {
        height: 17, width: 16.7, backgroundColor: "red", position: "absolute",
        left: 45,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        borderRadius: 360,
    } as ViewStyle,
    DELETEICON: {
        alignSelf: "center",
        backgroundColor: "red",
        width: 8.7,
        height: 9.3
    } as ImageStyle,
    DISPLAYVIEW: {
        marginBottom: 31.7, marginTop: 17.3, width: "100%"
    } as ViewStyle,
    DISPLAYTEXT: {
        fontWeight: '800',
        fontSize: 18,
        color: '#f4f4f4',
        marginBottom: 16.3,
    } as TextStyle,
    LISTSEPARATOR: {
        margin: 12.7
    } as ViewStyle,
}