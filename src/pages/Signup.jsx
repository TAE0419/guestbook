import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import styles from './Auth.module.scss'

const Signup = () => {
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const signup = useAuthStore((state) => state.signup)

  const submitFun = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const user = await signup(email, password)
      console.log(user)
      navigate('/')
    } catch (err) {
      setError(err.message || '회원가입에 실패했습니다.')
    }
  }

  return (
    <section className={styles.auth}>
      <div className={styles.back}></div>
      <form onSubmit={submitFun} className={styles.card}>
        <p>회원이 되어 더 많은 기능을 사용해보세요</p>
        <h1>회원가입</h1>
        <label className={styles.field}>
          닉네임
          <input type='text' value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder='사용할 이름' maxLength={10} required />
        </label>
        <label className={styles.field}>
          이메일
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@email.com' required />
        </label>
        <label className={styles.field}>
          비밀번호
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='6글자 이상 입력' required />
        </label>
        {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
        <button type='submit' className={styles.submitBtn}>회원가입</button>
        <p>계정이 있으신가요? {'  '}<Link to='/login' className={styles.link}>로그인</Link></p>
      </form>
    </section>
  )
}

export default Signup