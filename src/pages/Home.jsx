import React, {useEffect, useState} from 'react'
import styles from './Home.module.scss'

const videos = [
    {title : '색다른 모습을 찾아가보세요.', label : 'FIND.', src : '/mp4/cave.mp4'},
    {title : '당신의 이야기를 작성해보세요.', label : 'WRITE.', src : '/mp4/calculate.mp4'},
    {title : '다양한 경험들과 마주해보세요.', label : 'FACE.', src : '/mp4/face.mp4'},
]

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const activeVideo = videos[activeIndex]
    //4초마다 다음 영상으로 전환
    useEffect(()=>{
        const timer = setInterval(()=>{
            setActiveIndex((idx)=>{
                if(idx=== videos.length-1){
                    return 0
                }
                return idx + 1
            })
        },4000)
        return ()=>{
            clearInterval(timer)
        }
    },[])
    return (
        <section className={styles.home}>
            <div className={styles.sec1}>
            <div className={styles.back}></div>
            <div className={styles.slide}>
                <video key={activeVideo.src} autoPlay muted loop playsInline>
                    <source src={activeVideo.src} type='video/mp4'/>
                </video>
            </div>
            <div className={styles.copy}>
                <h1>{activeVideo.label}</h1>
                <h2>{activeVideo.title}</h2>
            </div>
            {/* 동영상을 알려주는 점(dot) */}
            <div className={styles.dots}>
                {videos.map((item,index)=>{
                    return(
                        <button key={item.label} 
                            className={index === activeIndex? styles.activeDot : ''}
                            onClick={()=>{
                                setActiveIndex(index)
                            }}/>
                    )
                })}
            </div>
            </div>
            <div className={styles.sec2}>
                <div>두번째컴포넌트</div>
            </div>
        </section>
    )
  return (
    <section>

    </section>
  )
}

export default Home
