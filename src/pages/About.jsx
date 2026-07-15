import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import styles from './About.module.scss'
import CHARACTERS from '../components/characterData'
import CharacterSlider from '../components/CharacterSlider';


const About = () => {
  return (
    <div className={styles.about}>
        <div className={styles.top}>
            <div className={styles.text1}>
                <h1>WELCOME TO <br/> GENTLE PLACE.</h1>
                <p> "가장 나답지 않은 모습으로, 가장 나답게 기록하는 시간."</p>
            </div>
            <CharacterSlider />
            <div  className={styles.line}></div>
        </div>
        <div className={styles.middle}>
            <div className={styles.img}>
                <div className={styles.imgBack}></div>
                <img src='/img/you.png'/>
            </div>
            <div className={styles.text2}>
                <h1>ANYONE CAN <br/>BECOME A <br/>GENTLEMAN.</h1>
                <p>우리는 매일 똑같은 옷을 입고, 똑같은 역할을 연기하며 살아갑니다. <br/>하지만 가끔은 우리가 꿈꾸던 다른 모습이 되어보고 싶지 않나요?<br/>
                    이곳은 코스프레를 한 매력적인 젠틀맨들이 모여 대화하는 GentlePlace 입니다.<br/> 여기서만큼은 당신이 어떤 캐릭터를 선택하든, 그 모습 그대로 환영받는 주인공이 됩니다.</p>
            </div>
        </div>
        <div className={styles.bottom}>
            <div className={styles.text3}>
            <h1>WHAT’S YOUR GENTLEMAN?</h1>
            <p>멋진 젠틀맨의 삶을 모두에게 공유해보세요.</p>
            </div>
            <div className={styles.buttonBox}>
              <Link to='/signup' className={styles.signup}>BE A GENTLEMAN</Link>
              <Link to='/guestbook' className={styles.guestbook}>TALK WITH GENTLEMAN</Link>
            </div>
        </div>
    </div>
  )
}

export default About