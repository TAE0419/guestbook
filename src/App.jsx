import React, { useEffect } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Header from './components/Header.jsx'
import Signup from './pages/Signup.jsx'
import Guestbook from './pages/Guestbook'
import useAuthStore from './store/useAuthStore.js'
import About from './pages/About.jsx'

const App = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/guestbook' element={<Guestbook />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  )
}

export default App

/*
  guestbook 만들기.
  프론트 - 서버연결(firebase)
  
  폴더 구조
    src 
      ㅣ- main.jsx (BrowserRouter 생성)
      ㅣ- App.jsx (Routes, Route)
      ㅣ- components
            ㅣ- Header.jsx (Link, NavLink) 
            ㅣ- Header.module.scss
            ㅣ- CharacterAvatar.jsx
            ㅣ- CharacterAvatar.module.scss (캐릭터 관리)
            ㅣ- characterAvatar.js (캐릭터 데이터)
            ㅣ- GuestbookForm.jsx (글입력, 캐릭터 선택, 이모티콘 선택 등)
            ㅣ- GuestbookForm.module.scss
      ㅣ- pages
            ㅣ- Home.jsx (동영상 3개 무한전환)
            ㅣ- Home.module.scss
            ㅣ- Guestbook.js (GuestbookForm.jsx import)
            ㅣ- Guestbook.module.scss
            ㅣ- Login.jsx
            ㅣ- Signup.jsx
            ㅣ- Auth.module.scss (Login + Signup)
*/