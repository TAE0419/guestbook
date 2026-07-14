import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import styles from './Header.module.scss'

const Header = () => {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to='/' className={styles.logo}>GUESTBOOK</Link>
        <nav className={styles.nav}>
          <NavLink to='/' className={({ isActive }) => (isActive ? styles.active : '')}>HOME</NavLink>
          <NavLink to='/guestbook' className={({ isActive }) => (isActive ? styles.active : '')}>GUESTBOOK</NavLink>
          {user ? (
            <button type='button' onClick={handleLogout} className={styles.logout}>LOGOUT</button>
          ) : (
            <>
              <Link to='/login' className={styles.login}>LOGIN</Link>
              <Link to='/signup' className={styles.signup}>SIGNUP</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
