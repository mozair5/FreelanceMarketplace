import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="create-service" />
      <Stack.Screen name="my-services" />
      <Stack.Screen name="service-details" />
    </Stack>
  );
}