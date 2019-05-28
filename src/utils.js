// Creating function that identifies if it is an android user
import { Platform, PixelRatio } from 'react-native';

// Modifying the pixel ratio of the application according to the screen
export function getPixelSize(pixels) {
    return Platform.select({
        ios: pixels,

        // Calculating the size in pixels based on density
        android: PixelRatio.getPixelSizeForLayoutSize(pixels)
    });
}