import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import {ThemeProvider} from './contexts/ThemeContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter basename="/proseflow-web">
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);