import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Platform, StatusBar } from 'react-native';
import Animated from 'react-native-reanimated';

const images = [
  { id: 1, uri: require('./assets/1.jpg') },
  { id: 2, uri: require('./assets/1.jpg') },
  { id: 3, uri: require('./assets/1.jpg') },
  { id: 4, uri: require('./assets/1.jpg') },
];
const HEADER_HEIGHT = Platform.OS == 'ios' ? 115 : 70 + StatusBar.currentHeight;

export default function App() {
  const scrollY = new Animated.Value(0);
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  const headerY = new Animated.interpolate(diffClampScrollY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={{ flex: 1 }}>
        <Animated.View style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: HEADER_HEIGHT,
          backgroundColor: 'rgb(34, 177, 76)',
          zIndex: 1000,
          elevation: 1000,
          transform: [{ translateY: headerY }],
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Text style={{
            color: '#fff',
            fontWeight: 'bold'
          }}>
            HEADER
        </Text>
        </Animated.View>
        <Animated.ScrollView
          bounces={false}
          scrollEventThrottle={16}
          style={{ paddingTop: HEADER_HEIGHT }}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: scrollY } }
            }
          ])}
        >
          {images.map(image => (
            <View key={image.id} style={{
              height: 400,
              margin: 20,
            }}>
              <Image source={image.uri} style={{
                flex: 1,
                height: 400,
                width: '100%',
                borderRadius: 10,
              }} />
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    </>
  );
}

