import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// Importa tus slices aquí
import authSlice from './slices/AuthSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice
    },
});

// Infer el tipo de la raíz del estado y el despachador
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();