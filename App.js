import { StatusBar } from 'expo-status-bar';
import React from 'react';

console.disableYellowBox = true;

import Home from './src/views/Home';
import Task from './src/views/Task';

export default function App() {
  return <Task />
}
