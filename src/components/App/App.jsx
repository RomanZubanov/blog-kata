import { Routes, Route } from 'react-router-dom'

import Header from '../Header'
import PostList from '../PostList'
import Article from '../Article'
import { FormSignUp, FormSignIn, FormEditProfile } from '../Forms'
import { FormNewArticle, FormEditArticle } from '../FormArticle'

import './App.css'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="articles/:slug" element={<Article />} />
        <Route path="*" element={<PostList />} />
        <Route path="sign-up" element={<FormSignUp />} />
        <Route path="sign-in" element={<FormSignIn />} />
        <Route path="profile" element={<FormEditProfile />} />
        <Route path="new-article" element={<FormNewArticle />} />
        <Route path="articles/:slug/edit" element={<FormEditArticle />} />
      </Routes>
    </div>
  )
}

export default App
