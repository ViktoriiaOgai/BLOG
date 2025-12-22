import {Routes, Route } from 'react-router-dom';
import Layout from "./layout/Layout.jsx";
import MainPage from "./pages/MainPage.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import './App.css'
import SingUp from './pages/SingUp.jsx';
import SingIn from './pages/SingIn.jsx';
import ProfilePage from "./pages/ProfilePage.jsx";
import EditArticlePage from  "./pages/EditArticlePage";
import SettingPage from "./pages/SettingPage.jsx";

function App() {
   return (
     
        <Routes>
          <Route element={<Layout/>}>
              <Route index element={<MainPage/>}/>
              <Route path="/articles" element={<MainPage/>}/>
              <Route path="/articles/:slug" element={<ArticlePage/>}/>
              <Route path="/sing-up" element={<SingUp />} />
              <Route path="/sing-in" element={<SingIn />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="profile/:username" element={<ProfilePage />} />
              <Route path="settings" element={<SettingPage />} />
              <Route path="/articles/:slug/edit" element={<EditArticlePage />} />
          </Route>
        </Routes>
   ); 
}

export default App
