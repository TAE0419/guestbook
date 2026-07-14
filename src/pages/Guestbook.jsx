import React, { useEffect, useState } from 'react'
import { collection, addDoc, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import GuestbookForm from '../components/GuestbookForm'
import CharacterAvatar from '../components/CharacterAvatar'
import useAuthStore from '../store/useAuthStore'
import { db } from '../../firebase'
import styles from './Guestbook.module.scss'

const Guestbook = () => {
  const [posts, setPosts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editingMessage, setEditingMessage] = useState('')
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }))
      setPosts(list)
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

  return (
    <section className={styles.GuestbookSection}>
      <div className={styles.title}>
        <h1>GUESTBOOK</h1>
        <p>이야기 저장소</p>
      </div>
      <div>
        <GuestbookForm onAddPost={addPostFnc} />
        <div className={styles.title}>
          <h1>GUESTLIST</h1>
          <p>{posts.length}개의 이야기</p>
        </div>
        <div  className={styles.guestlist}>
        {posts.length > 0 ? (
          <>
            {posts.map((item) => (
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
      </div>
    </section>
  )
}

export default Guestbook