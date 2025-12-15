import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./layout/Layout.jsx";
import ArticlesPage from "./pages/ArticlesPage.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import './App.css'

function App() {
   return (
     <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
              <Route path="/" element={<ArticlesPage/>}/>
              <Route path="/articles" element={<ArticlesPage/>}/>
              <Route path="/articles/:slug" element={<ArticlePage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App
