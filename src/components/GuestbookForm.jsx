import React, {useState} from 'react'
import CharacterAvatar from './CharacterAvatar'
import CHARACTERS from './characterData.js'
import useAuthStore from '../store/useAuthStore'
import styles from './GuestbookForm.module.scss'

const EMOJIS = ['🤢', '✨', '🤓', '👽', '💩', '🦷']

const GuestbookForm = ({ onAddPost }) => {
  const [nickname, setNickname] = useState('')
  const [message, setMessage] = useState('')
  const [character, setCharacter] = useState('')
  const user = useAuthStore((state) => state.user)

  const addE = (emoji) => {
    setMessage((msg) => msg + emoji)
  }

  const submitFnc = (e) => {
    e.preventDefault()
    if (!user) return

    const newPost = {
      nickname,
      message,
      character,
    }

    onAddPost(newPost)

    setNickname('')
    setMessage('')
    setCharacter('')
  }

  return (
    <div>
      <form className='' onSubmit={submitFnc}>
        <div> 
            <div className={styles.write}>
          <label className={styles.left}>
            <input type='text' value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder='사용할 이름' maxLength={20} required />
            <textarea type='text' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='당신의 이야기를 들려주세요' maxLength={500} required />
          </label>
          <div className={styles.right}>
            <div className={styles.buttonBox}>
                {EMOJIS.map((item) => (
                    <button key={item} type='button' onClick={() => addE(item)}>
                        {item}
                    </button>
                ))}
            </div>
            {character && (
            <div className={styles.you}>
              <p>YOU</p>
              <CharacterAvatar character={character} />
            </div>
          )}
            <button type='submit' className={styles.submitBtn}>
            {user ? '게시글 등록하기' : '로그인 후 작성 가능'}
          </button>
          </div>
          </div>
          
            <div className={styles.characterInBox}>
                <p>HOW ARE YOU?  :</p>
              {CHARACTERS.map((item) => (
                <button key={item.id} type='button' className={character === item.id ? styles.selected : ''} onClick={() => setCharacter(item.id)}>
                  <CharacterAvatar character={item.id} />
                  <div className={styles.buttonBox}></div>
                </button>
              ))}
            </div>
          
        </div>
      </form>
    </div>
  )
}

export default GuestbookForm
