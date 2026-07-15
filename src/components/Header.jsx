import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiLogIn, FiLogOut, FiUserPlus } from 'react-icons/fi'
import useAuthStore from '../store/useAuthStore'
import styles from './Header.module.scss'

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout()
  }

  // user.displayName이 있으면 그것을 사용, 없으면 상태의 nickname 사용
  const displayNickname = user?.displayName || '사용자';

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to='/' className={styles.logo}>GENTLEPLACE.</Link>
        <nav className={styles.nav}>
          <NavLink to='/' className={({ isActive }) => (isActive ? styles.active : '')}>HOME</NavLink>
          <NavLink to='about' className={({ isActive }) => (isActive ? styles.active : '')}>ABOUT</NavLink>
          <NavLink to='/guestbook' className={({ isActive }) => (isActive ? styles.active : '')}>GUESTBOOK</NavLink>
          {user ? (
            <div className={styles.userSection}>
              <button type='button' onClick={handleLogout} className={styles.logout}>
                <FiLogOut size={20} />
              </button>
              <span className={styles.nickname}>{displayNickname}님</span>
            </div>
          ) : (
            <>
              <Link to='/login' className={styles.login} title='로그인'>
                <FiLogIn size={20} />
              </Link>
              <Link to='/signup' className={styles.signup} title='회원가입'>
                <FiUserPlus size={20} />
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
