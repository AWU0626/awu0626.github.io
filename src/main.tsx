import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router'

import App from './App'
import Home from './pages/Home'
import Anime from './pages/Anime'
import Contacts from './pages/Contacts'
import Projects from './pages/Projects'
import Donate from './pages/Donate'

createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <Routes>
            <Route path='/' element={<App />}>
                <Route index element={<Home />} />
                <Route path='anime' element={<Anime />} />
                <Route path='contact' element={<Contacts />} />
                <Route path='projects' element={<Projects />} />
                <Route path='donate' element={<Donate />} />
            </Route>
        </Routes>
    </HashRouter>
)
