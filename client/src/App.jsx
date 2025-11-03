import './App.css'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home';
import PostList from './pages/PostList/PostList';
import PostPage from './pages/PostPage/PostPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  


function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path='/posts'>
          <Route path='/posts' element={<PostList />} />
          <Route path='/posts/:post_id' element={<PostPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
