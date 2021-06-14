import { Dimensions, Platform } from 'react-native';
const { height, width } = Dimensions.get('window');
//Screen Constatnts
//375 and 812 are constants, check from Zeplin 
const guidelineBaseWidth = 375;
const guidelineBaseHeight = Platform.OS === 'ios' ? 812 : height <= 550 ? 667 : 812;
/**
 * Function to scale a value based on the size of the screen size and the original
 * size used on the design.
 */

const scale = size => Math.ceil(width / guidelineBaseWidth * size);
const verticalScale = size => Math.ceil(height / guidelineBaseHeight * size);
const moderateScale = (size, factor = 0.5) => Math.ceil(size + (scale(size) - size) * factor);
const moderateVerticalScale = (size, factor = 0.5) => Math.ceil(size + (verticalScale(size) - size) * factor);


export { scale, verticalScale, moderateScale, moderateVerticalScale };