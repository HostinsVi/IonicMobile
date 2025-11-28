import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonButton, IonCard, IonCardContent, IonIcon, IonInput} from '@ionic/react';
import React, { useState } from 'react';
import logo from '../assets/weblogoalt.png';
import { checkmarkDoneOutline } from 'ionicons/icons';
import { auth } from '../assets/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";


const Register: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useIonRouter();


const doRegister = async (event, email, password) => {
  try {
    event.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Usuário criado com sucesso!");
    router.goBack();
  }
  catch (error) {
    console.error("Error during registration:", error);
  }
  };


  return ( <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Criar uma Conta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false}>
           <IonGrid fixed>
              <IonRow className='ion-justify-content-center'>
                <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                  <div className='ion-text-center ion-padding'>
                    <img src={logo} alt="Web Logo" width={'50%'}/>
                  </div>          
                </IonCol>
              </IonRow>

              <IonRow className='ion-justify-content-center'>
                <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                  <IonCard>
                    <IonCardContent>
                      <form onSubmit={(event) => {doRegister(event, email, password)}}>
                        <IonInput 
                          label="Email" 
                          placeholder="insiraSeuEmail@email.com" 
                          label-placement="floating" 
                          fill="solid" 
                          type="email"
                          value={email}
                          onIonInput={e => setEmail(e.detail.value!)}
                        />
                        <IonInput 
                          className='ion-margin-top'
                          label="Senha"
                          placeholder="insiraSuaSenha"
                          label-placement="floating"
                          fill="solid"
                          type="password"
                          value={password}
                          onIonInput={e => setPassword(e.detail.value!)}
                        />
                        <IonButton color="primary" type="submit" expand="block" className="ion-margin-top">
                          Criar uma conta
                        <IonIcon icon={checkmarkDoneOutline} slot="end" ></IonIcon>
                        <IonIcon  slot="end"></IonIcon>
                        </IonButton>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>

            </IonGrid>       
      </IonContent>
      
    </IonPage> 
  );
};

export default Register;