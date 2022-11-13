import VideoTempe from "./VideoTempe";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import useWindowWidth from "../../utils/hooks/useWindowWidth";


import paly from "../../assets/icon-play.svg";
const Trending = ({ setBookmark, bookmark,trending}) => {
  const windowWidth = useWindowWidth()

  return (
    <div className="trending">
      <h1 className="first-heading">Trending</h1>
      <div className="trending_videos">
      <div className="play">
          <span >
            <img src={paly} alt="" />
            <p>Play</p>
          </span>
        </div>
        <Swiper
          spaceBetween={windowWidth > 650 ? 40 : 16}
          slidesPerView={windowWidth  > 650 ? 2.5 : 1.5}
          freeMode={true}
          modules={[FreeMode]}
          width='auto'
        >

          {trending?.videos?.map((video) => (
            <SwiperSlide key={video?.id}>

              <VideoTempe  videos={video} setBookmark={setBookmark} bookmark={bookmark} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Trending;
