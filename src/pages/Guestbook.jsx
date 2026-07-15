import React, { useEffect, useState } from 'react'
import { collection, addDoc, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import GuestbookForm from '../components/GuestbookForm'
import CharacterAvatar from '../components/CharacterAvatar'
import useAuthStore from '../store/useAuthStore'
import { db } from '../../firebase'
import styles from './Guestbook.module.scss'

const ITEMS_PER_PAGE = 5

const Guestbook = () => {
  const [posts, setPosts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editingMessage, setEditingMessage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }))
      setPosts(list)
      setCurrentPage(1)
    })

    return () => unsubscribe()
  }, [])

  const addPostFnc = async (fromData) => {
    if (!user) return
    await addDoc(collection(db, 'posts'), {
      nickname: fromData.nickname,
      message: fromData.message,
      character: fromData.character,
      createdAt: serverTimestamp(),
      uid: user.uid,
    })
  }

  const deleteFun = async (postid) => {
    const delv = window.confirm('정말 삭제하시겠습니까?')
    if (!delv) return
    await deleteDoc(doc(db, 'posts', postid))
  }

  const startEdit = (post) => {
    if (!user || user.uid !== post.uid) return
    setEditingId(post.id)
    setEditingMessage(post.message)
  }

  const saveEdit = async (postid) => {
    if (!editingMessage.trim()) return
    await updateDoc(doc(db, 'posts', postid), {
      message: editingMessage,
    })
    setEditingId(null)
    setEditingMessage('')
  }

  // Pagination 계산
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentPosts = posts.slice(startIndex, endIndex)

  return (
    <section className={styles.GuestbookSection}>
      <div className={styles.back}></div>
      <div className={styles.title}>
        <h1>GUESTBOOK.</h1>
        <p>젠틀맨 저장소</p>
      </div>
      <div>
        <GuestbookForm onAddPost={addPostFnc} />
        <div className={styles.title}>
          <h1>GUESTLIST.</h1>
          <p>{posts.length}개의 이야기</p>
        </div>
        <div  className={styles.guestlist}>
        {currentPosts.length > 0 ? (
          <>
            {currentPosts.map((item) => (
              <div className={styles.post} key={item.id}>
                <div className={styles.nickname}>{item.nickname}</div>
                <div className={styles.box}>
                  {item.character && <CharacterAvatar character={item.character} />}

                  <div className={styles.text}>
                    <p className={styles.date}>{item.createdAt?.toDate ? new Date(item.createdAt.toDate()).toLocaleDateString('ko-KR') : '방금'}</p>
                    {editingId === item.id ? (
                      <>
                        <textarea value={editingMessage} onChange={(e) => setEditingMessage(e.target.value)} />
                        <button type='button' onClick={() => saveEdit(item.id)}>저장</button>
                      </>
                    ) : (
                      <p>{item.message}</p>
                    )}
                  </div>
                  
                  
                  {user && user.uid === item.uid && (
                    <div className={styles.btn}>
                      <button className={styles.btne} type='button' onClick={() => startEdit(item)}>수정</button>
                      <button type='button' onClick={() => deleteFun(item.id)}>삭제</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>기록이 없습니다</p>
        )}
        </div>
        
        {posts.length >= 5 && (
          <div className={styles.pagination}>
            <button 
              type='button'
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className={styles.navButton}
            >
              이전
            </button>
            
            <div className={styles.pageNumbers}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type='button'
                  onClick={() => setCurrentPage(page)}
                  className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button 
              type='button'
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className={styles.navButton}
            >
              다음
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Guestbook