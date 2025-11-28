import { IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import { Redirect, Route } from 'react-router';
import { triangle } from 'ionicons/icons';
import Tab3 from './Tab3';
import Tab4 from './Tab4';



const Features: React.FC = () => {

  return (
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab3" href="/app/features/tab3">      
          <IonIcon icon={triangle} />
          <IonLabel>IMC</IonLabel>     
        </IonTabButton>
        <IonTabButton tab="tab4" href="/app/features/tab4">      
          <IonIcon icon={triangle} />
          <IonLabel>Arduino</IonLabel>     
        </IonTabButton>
        <IonTabButton tab="tab1" href="/app/features/tab1">      
          <IonIcon icon={triangle} />
          <IonLabel>Animações</IonLabel>     
        </IonTabButton>
        <IonTabButton tab="tab2" href="/app/features/tab2">      
          <IonIcon icon={triangle} />
          <IonLabel>Camera</IonLabel>     
        </IonTabButton>
      </IonTabBar>

      <IonRouterOutlet>
        <Route path="/app/features/tab1" component={Tab1} />
        <Route path="/app/features/tab2" component={Tab2} />
        <Route path="/app/features/tab3" component={Tab3} />
        <Route path="/app/features/tab4" component={Tab4} />

        <Route exact path="/app/features">
          <Redirect to="/app/features/tab3" />
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default Features;