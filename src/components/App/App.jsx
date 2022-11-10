import { Routes, Route } from 'react-router-dom'

import Header from '../Header'
import PostList from '../PostList'
import Article from '../Article'
import { SignUpForm } from '../Forms'

import './App.css'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="articles/:slug" element={<Article />} />
        <Route path="*" element={<PostList />} />
        <Route path="signup" element={<SignUpForm />} />
      </Routes>
    </div>
  )
}

export default App
