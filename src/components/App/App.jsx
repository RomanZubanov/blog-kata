import { Routes, Route } from 'react-router-dom'

import Header from '../Header'
import PostList from '../PostList'
import Article from '../Article'

import './App.css'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="articles/:slug" element={<Article />} />
        <Route path="*" element={<PostList />} />
      </Routes>
    </div>
  )
}

export default App
