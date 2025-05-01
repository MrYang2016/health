import { useEffect } from 'react';
import { Redirect } from 'expo-router';

export default function Root() {
  // Redirect to the dashboard screen
  return <Redirect href="/(tabs)" />;
}