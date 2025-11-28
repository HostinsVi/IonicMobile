import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonText,
  IonIcon,
  IonToast
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

// Tipos
interface RecordItem {
  id: string;
  weightKg: number;
  heightM: number;
  imc: number;
  category: string;
  dateISO: string;
}

const STORAGE_KEY = 'imc_history_v1';

const getCategory = (imc: number): string => {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 24.9) return 'Peso normal';
  if (imc < 29.9) return 'Sobrepeso';
  if (imc < 34.9) return 'Obesidade Grau I';
  if (imc < 39.9) return 'Obesidade Grau II';
  return 'Obesidade Grau III';
};

const format = (n: number) => Number(n.toFixed(2));

const Tab3: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [history, setHistory] = useState<RecordItem[]>([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const saveHistory = (entry: RecordItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
  };

  const calculate = () => {
    // substitui vírgula por ponto
    const w = parseFloat(weight.replace(',', '.'));
    const h = parseFloat(height.replace(',', '.'));

    if (isNaN(w) || isNaN(h) || h <= 0) {
      setToast('Valores inválidos. Use números com ponto ou vírgula para decimal.');
      return;
    }

    const imc = format(w / (h * h));
    const cat = getCategory(imc);

    setResult(imc);
    setCategory(cat);

    const record: RecordItem = {
      id: crypto.randomUUID(),
      weightKg: w,
      heightM: h,
      imc,
      category: cat,
      dateISO: new Date().toISOString()
    };

    const newHistory = [record, ...history];
    setHistory(newHistory);
    saveHistory(newHistory);
  };

  const remove = (id: string) => {
    const updated = history.filter(r => r.id !== id);
    setHistory(updated);
    saveHistory(updated);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>IMC</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonItem>
                <IonLabel position="floating">Peso (kg)</IonLabel>
                <IonInput
                  value={weight}
                  type="text"
                  placeholder="Ex: 75 ou 75.5 ou 75,5"
                  onIonInput={e => setWeight(e.detail.value || '')}
                />
              </IonItem>
            </IonCol>

            <IonCol size="12">
              <IonItem>
                <IonLabel position="floating" >Altura (m)</IonLabel>
                <IonInput
                  value={height}
                  type="text"
                  placeholder="Ex: 1.75 ou 1,75"
                  onIonInput={e => setHeight(e.detail.value || '')}
                />
              </IonItem>
            </IonCol>

            <IonCol size="12" className="ion-text-center ion-margin-top">
              <IonButton expand="block" onClick={calculate} color="success">
                Calcular IMC
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {result !== null && (
          <IonCard className="ion-margin-top">
            <IonCardHeader>
              <IonCardTitle>Resultado</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>
                <h2>IMC: {result}</h2>
                <h3>{category}</h3>
              </IonText>
            </IonCardContent>
          </IonCard>
        )}

        <IonCard className="ion-margin-top">
          <IonCardHeader>
            <IonCardTitle>Histórico</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {history.map(item => (
                <IonItem key={item.id}>
                  <IonLabel>
                    <strong>{item.imc}</strong> — {item.category}
                    <p>{new Date(item.dateISO).toLocaleString()}</p>
                  </IonLabel>
                  <IonButton color="danger" onClick={() => remove(item.id)}>
                    <IonIcon icon={trashOutline} />
                  </IonButton>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonToast
          isOpen={toast !== ''}
          message={toast}
          duration={2000}
          onDidDismiss={() => setToast('')}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
