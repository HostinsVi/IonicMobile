import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import { homeOutline, logOutOutline, newspaperOutline } from 'ionicons/icons';
import Features from './Features';
import Pokedex from './Pokedex';
import { auth } from '../assets/firebase';
import { signOut } from 'firebase/auth';

const Menu: React.FC = () => {

  const paths = [
    { name: 'Pokedex', url: '/app/pokedex', icon: homeOutline },
    { name: 'Features', url: '/app/features', icon: newspaperOutline }
  ];

  const signOutUser = async (auth) => {
    try {
      await signOut(auth);
      alert("Até já!");
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }


  if (!auth.currentUser) {
    return <Redirect to="/" />;
  } else {
    return (
      <IonPage>
        <IonSplitPane contentId="main" when="md">
          <IonMenu contentId='main'>
            <IonHeader>
              <IonToolbar color={"secondary"}>
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              {paths.map((item, index) => (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem detail={false} routerLink={item.url} routerDirection='none'>
                    <IonIcon slot="start" icon={item.icon} />
                    {item.name}
                    </IonItem>
                </IonMenuToggle>
                ))}

                <IonMenuToggle autoHide={false}>
                  <IonButton expand="full" onClick={async () => {signOutUser(auth)}}>
                    <IonIcon slot="start" icon={logOutOutline} />
                    Logout
                    </IonButton>
                </IonMenuToggle>
            </IonContent>
          </IonMenu>

          <IonRouterOutlet id='main'>
            <Route exact path="/app/pokedex" component={Pokedex} />
            <Route path="/app/features" component={Features} />
            <Route exact path ="/app">
              <Redirect to="/app/pokedex" />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonPage>
    );
  }
};

export default Menu;