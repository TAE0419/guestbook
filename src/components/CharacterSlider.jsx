import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // 자동 재생 필요시
import 'swiper/css';
import CHARACTER from './characterData'; // 위에서 작성하신 
// import styles from './CharacterSlider.module.scss'

const CharacterSlider = ({ onSelect }) => {
  return (
    <div className="slider-container" style={{ width: '100%', overflow: 'hidden' }}>
      <Swiper
        spaceBetween={20}       // 이미지 간격
        slidesPerView={5}       // 한 번에 보여줄 이미지 개수
        loop={true}             // 무한 반복
        autoplay={{ delay: 2000, disableOnInteraction: false }} // 자동 재생
        modules={[Autoplay]}
      >
        {CHARACTER.map((item) => (
  <SwiperSlide key={item.id} onClick={() => onSelect?.(item.id)}>
    <div 
      style={{
        width: '350px',
        height: '300px',
        borderRadius: '15px 15px 0px 0px',
        // 배경 이미지로 설정하여 그림자가 이미지 위에 오도록 함....
        backgroundImage: `url(${item.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        // 핵심: 컨테이너 자체에 그림자를 넣으면 배경 위에 그림자가 깔림
        boxShadow: 'inset 0 5px 10px rgba(0,0,0,0.3)', 
        cursor: 'pointer'
      }}
    >
      {/* img 태그 삭제 */}
    </div>
  </SwiperSlide>
))}
      </Swiper>
    </div>
  );
};

export default CharacterSlider;