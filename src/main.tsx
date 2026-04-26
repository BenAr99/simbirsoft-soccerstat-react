import {createRoot} from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {ErrorProvider} from "./app/shared/context/error.tsx";

const basename = import.meta.env.BASE_URL;

createRoot(document.getElementById('root')!).render(
    <ErrorProvider>
        <BrowserRouter basename={basename}>
            <App/>
        </BrowserRouter>,
    </ErrorProvider>
)
