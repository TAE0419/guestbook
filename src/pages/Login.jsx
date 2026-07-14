import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import styles from './Auth.module.scss'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const submitFun = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.')
    }
  }

  return (
    <section className={styles.auth}>
      <div className={styles.back}></div>
      <form onSubmit={submitFun} className={styles.card}>
        <p>회원이 되어 더 많은 기능을 사용해보세요</p>
        <h1>로그인</h1>
        <label className={styles.field}>
          이메일
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@email.com' required />
        </label>
        <label className={styles.field}>
          비밀번호
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='6글자 이상 입력' required />
        </label>
        {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
        <button type='submit' className={styles.submitBtn}>로그인</button>
        <p>계정이 없으신가요?{'  '}<Link to='/signup' className={styles.link}>회원가입</Link></p>
      </form>
    </section>
  )
}

export default Login
