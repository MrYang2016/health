import { View, StyleSheet, Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Text } from 'react-native';
import React from 'react';
export default function LoginScreen() {
  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // 保存用户信息
      await AsyncStorage.setItem('user', JSON.stringify({
        id: credential.user,
        email: credential.email,
        fullName: credential.fullName,
        avatar: credential.fullName ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
          `${credential.fullName.givenName || ''} ${credential.fullName.familyName || ''}`
        )}&background=random` : 'https://ui-avatars.com/api/?name=User&background=random',
      }));

      // 登录成功后跳转到主页
      router.replace('/(tabs)');
    } catch (error) {
      if ((error as any).code === 'ERR_CANCELED') {
        // 用户取消了登录
        console.log('User canceled Apple Sign in.');
      } else {
        console.error('Apple Sign in error:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      {Platform.OS === 'ios' && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.appleButton}
          onPress={handleAppleLogin}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  appleButton: {
    width: '80%',
    height: 45,
  },
}); 