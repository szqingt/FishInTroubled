import React, {useState} from 'react';
import {viewportWidth, wp} from '@utils/index';
import {StyleSheet, View} from 'react-native';
import SnapCarousel, {
  ParallaxImage,
  AdditionalParallaxProps,
  Pagination as SnapPagination,
} from 'react-native-snap-carousel';

const sliderWidth = viewportWidth;
const slideWidht = wp(90);
const slideHeight = wp(35);
const itemWidth = slideWidht + wp(2) * 2;

const CarouselItem = (
  {item}: {item: ICarousel},
  parallaxProps?: AdditionalParallaxProps,
) => {
  return (
    <ParallaxImage
      source={{uri: item.title_file_url}}
      style={styles.image}
      containerStyle={styles.imageContainer}
      parallaxFactor={0.8}
      showSpinner
      spinnerColor="rgba(0,0,0,0.25)"
      {...parallaxProps}
    />
  );
};

type PaginationProps = {
  activeIndex: number;
  size: number;
};

const Pagination: React.FC<PaginationProps> = ({activeIndex, size}) => {
  return (
    <View style={styles.paginationWarp}>
      <SnapPagination
        dotsLength={size}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotContainerStyle={styles.dotContainer}
        dotStyle={styles.dot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.8}
      />
    </View>
  );
};

export type ICarousel = {
  title_file_url: string;
  album_title: string;
  album_id: string;
};

type IProps = {
  data: ICarousel[];
};

const Carousel: React.FC<IProps> = ({data}) => {
  const [slideIndex, setIndex] = useState<number>(0);
  return (
    <>
      <SnapCarousel
        data={data}
        renderItem={CarouselItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        hasParallaxImages
        loop
        onSnapToItem={setIndex}
      />

      <Pagination activeIndex={slideIndex} size={data.length} />
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: itemWidth,
    height: slideHeight,
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  paginationWarp: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    top: -20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
});

export default Carousel;
