import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { logInOutline, personCircleOutline, reload, reloadCircleOutline } from 'ionicons/icons';
import logo from '../assets/weblogo.png';
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../assets/firebase';


const Intro_Key = 'intro-seen';


const Login: React.FC = () => {

  const router = useIonRouter();
  const [introSeen, setIntroSeen] = useState(false);
  const [present, dismiss] = useIonLoading();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect (() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: Intro_Key });
      setIntroSeen(seen.value === 'true');
    }
    checkStorage();
  }, []);

  const timer = async() => {
    await present('Entrando...');
      setTimeout(async () => {
        dismiss();  
        router.push('/app', 'root');
      }, 2000);
  }

  const doLogin = async(event: any, email, password) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await present('Entrando...');
      timer();
    }
    catch (error) {
      console.error("Error during login:", error);
    }
    };
    
    const doLoginGoogle = async() => {
      try {
        await signInWithPopup(auth, googleProvider);
        timer();
      } catch (error) {
        console.error("Error during Google login:", error);
      }
    }

  const finishIntro = async() => {
    console.log('Intro finished');
    setIntroSeen(true);
    Preferences.set({ key: Intro_Key, value: 'true' });
  }

  return (
    <>
    {!introSeen ? (
      <Intro onFinish={finishIntro} />  
    ) : (
      <IonPage>
        <IonHeader>
          <IonToolbar color={'success'}>
            <IonTitle>Login Page</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent scrollY={false} className="ion-padding">
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
                    <form onSubmit={(event) => {doLogin(event, email, password)}}>
                      <IonInput label="Email" placeholder="insiraSeuEmail@email.com" label-placement="floating" fill="solid" type="email" 
                      value={email} onIonInput={e => setEmail(e.detail.value!)}></IonInput>
                      <IonInput className='ion-margin-top'
                        label="Senha" placeholder="insiraSuaSenha" label-placement="floating" fill="solid" type="password" value={password} 
                        onIonInput={e => setPassword(e.detail.value!)}></IonInput>
                      <IonButton color="secondary"type="submit"  expand="block" className="ion-margin-top">
                        Entrar
                        <IonIcon icon={logInOutline} slot="end"></IonIcon>
                      </IonButton>
                    </form>
                    <IonButton  routerLink="/register" color="primary" type="submit" expand="block" className="ion-margin-top">
                      Criar uma conta
                      <IonIcon icon={personCircleOutline} slot="end"></IonIcon>
                    </IonButton>
                    <IonButton expand="full" className='ion-padding ion-margin-top' color={'light'} onClick={() => doLoginGoogle()}>
                      Continuar com Google
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>          
        </IonContent>
        <IonFab  vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => {setIntroSeen(false)}}>
            <IonIcon icon={reload} />
          </IonFabButton>
        </IonFab> 
      </IonPage> 
    )}
    </>
  );
};

export default Login;