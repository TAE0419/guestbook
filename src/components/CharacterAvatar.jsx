import React from 'react'
import CHARACTERS from './characterData'
import styles from './characterAvatar.module.scss'

const CharacterAvatar = ({character}) => {
  const characterData = CHARACTERS.find((item)=>item.id === character)
  if(!characterData) return null
  return (
    <img src={characterData.src} alt={characterData.label}/>
  )
}

export default CharacterAvatar
