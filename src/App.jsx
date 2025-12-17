import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layout/Layout.jsx";
import ArticlesPage from "./pages/ArticlesPage.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import './App.css'
import SingUp from './pages/SingUp.jsx';
import SingIn from './pages/SingIn.jsx';
import Profile from "./pages/Profile.jsx";

function App() {
   return (
     
        <Routes>
          <Route element={<Layout/>}>
              <Route path="/" element={<ArticlesPage/>}/>
              <Route path="/articles" element={<ArticlesPage/>}/>
              <Route path="/articles/:slug" element={<ArticlePage/>}/>
              <Route path="/sing-up" element={<SingUp />} />
              <Route path="/sing-in" element={<SingIn />} />
              <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
   ); 
}

export default App
