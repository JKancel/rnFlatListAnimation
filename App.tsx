import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

const { width } = Dimensions.get('screen');

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg',
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg',
  'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg',
  'https://cdn.dribbble.com/users/3281732/screenshots/6388824/samji_illustrator.jpg',
  'https://cdn.dribbble.com/users/3281732/screenshots/6354986/samji_illustrator.jpg',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg',
  'https://cdn.dribbble.com/users/3281732/screenshots/6552930/ef066617-ce4e-45c9-ae22-1af21711119c.jpeg'
];

const imageW = width * 0.7;
const imageH = imageW * 1.54;

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [blurRadius] = useState(50);
  const [currPage, setCurrPage] = useState(0);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const viewSizeWidth = e.nativeEvent.layoutMeasurement.width; // or width
    const pageNumber = Math.floor(e.nativeEvent.contentOffset.x / viewSizeWidth);
    setCurrPage(pageNumber);
    console.log(currPage);
  };

  const onLoad = () => {
    Animated.timing(scrollX, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: 'extend'
          });
          return (
            <Animated.Image
              key={`image-${index}`}
              source={{ uri: image }}
              onLoad={onLoad}
              style={[
                StyleSheet.absoluteFillObject,
                {
                  opacity
                }
              ]}
              resizeMode="cover"
              blurRadius={blurRadius}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={data}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOpacity: 0.5,
                shadowOffset: {
                  width: 0,
                  height: 0
                },
                shadowRadius: 20
              }}>
              <Image
                source={{ uri: item }}
                style={{
                  width: imageW,
                  height: imageH,
                  resizeMode: 'cover',
                  borderRadius: 16
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
