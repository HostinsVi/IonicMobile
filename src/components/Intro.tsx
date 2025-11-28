import { IonButton, IonText } from '@ionic/react';
import { Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import intropng from '../assets/intro.png';
import intro1jpg from '../assets/Intro1.jpg';
import intro2jpg from '../assets/Intro2.jpg';
import intro3jpg from '../assets/Intro3.jpg';
import 'swiper/css';
import './Intro.css';
interface ContainerProps {
  onFinish: () => void;
}

const SwiperButtonNext = ({ children }: any) => {
  const swiper = useSwiper();
  return <IonButton onClick={() => 
     swiper.slideNext()}>{children}
    </IonButton>;
}


const Intro: React.FC<ContainerProps> = ({ onFinish }) => {

  return (
    <Swiper>
      <SwiperSlide>
        <img src={intropng}  alt="Intro 0" />
        <IonText>
          <h3>Eu queria fazer um app, mas...</h3>
        </IonText>
          <SwiperButtonNext> {'--->'} </SwiperButtonNext>
      </SwiperSlide>
      
      <SwiperSlide>
        <img src={intro1jpg} alt="Intro 0" />
        <IonText>
          <h3> o cara do vídeo me deu acesso ao Swiper e...</h3>
        </IonText>
          <SwiperButtonNext> {'--->'} </SwiperButtonNext>
      </SwiperSlide>

      <SwiperSlide>
        <img src={intro2jpg} alt="Intro 0" />
        <IonText>
          <h3> Não vai ter jeito, vou ter que usar</h3>
        </IonText>
          <SwiperButtonNext> {'--->'} </SwiperButtonNext>
      </SwiperSlide>

      <SwiperSlide>
        <img src={intro3jpg} alt="Intro 0" />
        <IonText>
          <h3>Vai escutar Daft Punk que ta pagante</h3>
        </IonText>
        <IonButton onClick={() => onFinish()}>Fim</IonButton>
      </SwiperSlide>
    </Swiper>
  );
};

export default Intro;