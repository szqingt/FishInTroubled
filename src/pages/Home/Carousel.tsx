import React, { useState } from 'react';
import { viewportWidth, wp } from '@utils/index';
import { StyleSheet, View } from 'react-native';
import SnapCarousel, { ParallaxImage, AdditionalParallaxProps, Pagination as SnapPagination } from 'react-native-snap-carousel';

const dataList = [
    'https://play.imayu.com/localfile/BUSIIMG/BUSIIMG_3d452d4304a511ea8c745600017c8591.png',
    'https://play.imayu.com/localfile/BUSIIMG/BUSIIMG_26b63c3d91c611e9b8345600017c8591.png',
    'https://play.imayu.com/localfile/BUSIIMG/BUSIIMG_882894fe5ed011e9a4535600017c8591.png',
    'https://play.imayu.com/localfile/BUSIIMG/BUSIIMG_a3d88776ca5811e995345600017c8591.png',
    'https://play.imayu.com/localfile/BUSIIMG/BUSIIMG_aaa2ecc3e8da11eaa5c55600017c8591.jpg',
];
const sliderWidth = viewportWidth;
const slideWidht = wp(90);
const slideHeight = wp(35);
const itemWidth = slideWidht + wp(2) * 2;

const CarouselItem = ({ item }: { item: string }, parallaxProps?: AdditionalParallaxProps) => {

    return (
        <ParallaxImage
            source={{ uri: item }}
            style={styles.image}
            containerStyle={styles.imageContainer}
            parallaxFactor={0.8}
            showSpinner
            spinnerColor='rgba(0,0,0,0.25)'
            {...parallaxProps}
        />
    )
}

type PaginationProps = {
    activeIndex: number
}

const Pagination: React.FC<PaginationProps> = ({ activeIndex }) => {

    return (
        <View style={styles.paginationWarp}>
            <SnapPagination
                dotsLength={dataList.length}
                activeDotIndex={activeIndex}
                containerStyle={styles.paginationContainer}
                dotContainerStyle={styles.dotContainer}
                dotStyle={styles.dot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.8}
            />

        </View>

    )
}

const Carousel: React.FC = () => {
    const [slideIndex, setIndex] = useState<number>(0);
    return (
        <>
            <SnapCarousel
                data={dataList}
                renderItem={CarouselItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                hasParallaxImages
                loop
                onSnapToItem={setIndex}
            />

            <Pagination activeIndex={slideIndex} />
        </>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: itemWidth,
        height: slideHeight,
        borderRadius: 8
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain'
    },
    paginationWarp: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    paginationContainer: {
        position: 'absolute',
        top: -20,
        backgroundColor: 'rgba(0,0,0,0.35)',
        paddingHorizontal: 3,
        paddingVertical: 4,
        borderRadius: 8
    },
    dotContainer: {
        marginHorizontal: 6
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
    }
})

export default Carousel