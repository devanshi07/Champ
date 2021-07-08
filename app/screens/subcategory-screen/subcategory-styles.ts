import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { color, typography } from '../../theme';
import { moderateVerticalScale, scale, verticalScale } from '../../utils/scale';

export const subCategoryScreenStyles = {
    ROOT: {
        backgroundColor: color.palette.black,
        flex: 1,
    } as ViewStyle,
    FLATLIST: {
        marginHorizontal:scale(36),
        justifyContent: "center",
        flexGrow: 1,
        marginVertical: verticalScale(10),
        marginBottom: verticalScale(20)
    } as ViewStyle,
    ITEMVIEW: {
        flex:1,
        flexDirection: "row",
    } as ViewStyle,
    TEXTSTYLE: {
        flex:1,
        color: color.palette.textColor,
        alignSelf: "center",
        fontSize: moderateVerticalScale(20),
        letterSpacing: scale(0.5),
        marginLeft: scale(18.7),
        fontFamily: typography.regular,
        textTransform: "capitalize",
    } as TextStyle,
    BUTTON: {
        flex:1,
        justifyContent: "flex-start",
        marginBottom: verticalScale(28.7),
        paddingLeft:scale(10),
    } as ViewStyle,
    IMAGESTYLE: {
        width: scale(66.7),
        height: scale(66.7),
        backgroundColor: "yellow",
        borderColor: color.palette.yellow,
        borderWidth: 2,
        borderRadius: 300,
    } as ImageStyle,
    ACTIVITYINDICATOR: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.5,
        backgroundColor: "black"
    } as ViewStyle
}