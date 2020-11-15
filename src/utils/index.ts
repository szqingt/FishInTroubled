import { Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function reversPercen(val: number):number {
    return Math.round(val / 100);
}

function wp (percentage: number) {
    return reversPercen(percentage * viewportWidth);
}

function hp (percentage: number) {
    return reversPercen(percentage * viewportHeight);
}

export {
    viewportWidth,
    viewportHeight,
    wp,
    hp
}