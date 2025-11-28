import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonText, useIonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import { bulbOutline, bulb } from 'ionicons/icons';


// para testar, entra nesse link https://www.hivemq.com/demos/websocket-client/
// no host coloque "test.mosquitto.org", porta "8081".
// e assina os tópicos "teste/led1" e "teste/led2", depois aperta os botões abaixo 
// para ver as mensagens chegando.




const Tab4: React.FC = () => {
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);
  const [led1On, setLed1On] = useState(false);
  const [led2On, setLed2On] = useState(false);
  const [presentToast] = useIonToast();

  const brokerUrl = 'wss://test.mosquitto.org:8081/mqtt';
  const topicLed1 = 'teste/led1';
  const topicLed2 = 'teste/led2';

  useEffect(() => {
 
    const mqttClient = mqtt.connect(brokerUrl, {
      reconnectPeriod: 2000
    });

    mqttClient.on('connect', () => {
      mqttClient.subscribe(topicLed1);
      mqttClient.subscribe(topicLed2);
      presentToast({ message: 'Conectado ao Mosquitto!', duration: 2000, color: 'success' });
      console.log('Conectado ao Mosquitto WebSocket');
    });

    mqttClient.on('message', (topic, message) => {
      const msg = message.toString();
      if (topic === topicLed1) setLed1On(msg === 'on');
      if (topic === topicLed2) setLed2On(msg === 'on');
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT Error:', err);
      presentToast({ message: 'Erro na conexão MQTT', duration: 2000, color: 'danger' });
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  const toggleLed = (led: 1 | 2) => {
    if (!client) return;

    if (led === 1) {
      const newState = !led1On;
      client.publish(topicLed1, newState ? 'on' : 'off');
      setLed1On(newState);
    } else {
      const newState = !led2On;
      client.publish(topicLed2, newState ? 'on' : 'off');
      setLed2On(newState);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Arduino</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-margin-bottom">
            <IonCol size="12" sizeMd="6">
              <IonButton
                expand="block"
                color={led1On ? 'warning' : 'medium'}
                onClick={() => toggleLed(1)}
              >
                <IonIcon icon={led1On ? bulb : bulbOutline} slot="start" />
                LED 1 {led1On ? 'Ligado' : 'Desligado'}
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center ion-margin-bottom">
            <IonCol size="12" sizeMd="6">
              <IonButton
                expand="block"
                color={led2On ? 'warning' : 'medium'}
                onClick={() => toggleLed(2)}
              >
                <IonIcon icon={led2On ? bulb : bulbOutline} slot="start" />
                LED 2 {led2On ? 'Ligado' : 'Desligado'}
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center ion-margin-top">
            <IonCol size="12">
              <IonText color="medium">
                Toque nos botões para controlar os LEDs via MQTT Mosquitto.
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
