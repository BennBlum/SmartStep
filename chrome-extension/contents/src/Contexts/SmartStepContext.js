// apiContext.js
import { createContext } from 'react';
import SmartStep from '../Services/SmartStep';

export const SmartStepContext = createContext(new SmartStep());