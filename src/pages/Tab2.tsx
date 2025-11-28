import { Camera, CameraResultType } from '@capacitor/camera';
import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';

// CAMERA 

const Tab2: React.FC = () => {

  const [image, setImage] = useState<any>();

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });

    const img = `data:image/${image.format};base64,${image.base64String}`;  
    setImage(img);
  };

  return (
    <IonPage>
      <IonHeader>
       <IonToolbar color={'success'}>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Camera</IonTitle>
      </IonToolbar>   
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand='full' onClick={takePicture}>Take Picture</IonButton>
        <img src={image} alt="" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;