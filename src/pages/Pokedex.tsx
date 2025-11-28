import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonModal, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonSegment, IonSegmentButton, IonSkeletonText, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import { addOutline, trashBinOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import "../styles/List.css";



// POKEMON LIST

const Pokedex: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemons, setPokemon] = useState<any[]>([]);
  const [showAlert] = useIonAlert();
  const [showToast]= useIonToast();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const cardModal = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  const page = useRef(null);
  const [activeSegment, setActiveSegment] = useState<any>('details');
  



  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  useIonViewWillEnter(async () => {
    /* duvidoso */
    const pokemons = await getPokemons();
    setPokemon(pokemons);
    setLoading(false);
  });


  function getRegion(id: number): string {
    if (id >= 1 && id <= 151) return "Kanto";
    if (id >= 152 && id <= 251) return "Johto";
    if (id >= 252 && id <= 386) return "Hoenn";
    if (id >= 387 && id <= 493) return "Sinnoh";
    if (id >= 494 && id <= 649) return "Unova";
    if (id >= 650 && id <= 721) return "Kalos";
    if (id >= 722 && id <= 809) return "Alola";
    if (id >= 810 && id <= 898) return "Galar";
    if (id >= 899 && id <= 1025) return "Paldea";
    return "Unknown";
  }


  const getPokemons = async () => {
  const maxPokemon = 1025; 
  const count = 10;

  const randomIds = Array.from({ length: count }, () =>
    Math.floor(Math.random() * maxPokemon) + 1
  );

  const detailed = await Promise.all(
    randomIds.map(async (id) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return await res.json();
    })
  );

    return detailed;
  };

 
  const clearList = () => {
    showAlert({
      header: 'Confirmar',
      message: 'Tem certeza que gostaria de limpar a lista?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            setPokemon([]);
            showToast({
              message: 'Lista limpa com sucesso!',
              duration: 2000,
              color: 'success',
            });
          },
        },
      ],
    });
    //
  }

  const doRefresh = async (event: any) => {
    const data = await getPokemons();
    setPokemon(data);
    event.detail.complete();
  };

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Pokedex</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={clearList}>
              <IonIcon slot="icon-only" icon={trashBinOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>  
        <IonToolbar color={'success'}>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>



      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={(ev) => doRefresh(ev)}>
          <IonRefresherContent />
        </IonRefresher>

        {loading && ( 
          [...Array(10)].map((_, index) => (
            <IonCard key={index}>
              <IonCardContent className='ion-no-padding'>
                <IonItem lines='none'>
                  <IonAvatar slot="start" className='avatar-img' >
                      <IonSkeletonText />                  
                  </IonAvatar>
                  <IonLabel>
                    <IonSkeletonText animated style={{width:'150px'}} />
                    <p>
                      <IonSkeletonText />
                    </p>
                  </IonLabel>
                  <IonChip slot="end" color="light" />
                </IonItem>
              </IonCardContent>
            </IonCard>
        )))}

        {pokemons.map((pokemon, index) => (
          <IonCard key={index} onClick={() => setSelectedUser(pokemon)} >
            <IonCardHeader>
              <IonCardTitle>
                {getRegion(pokemon.id)}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent className='ion-no-padding'>
              <IonItem lines='none'>
                <IonAvatar slot="start" className='avatar-img' >
                  <IonImg className="avatar-img-img" 
                  src={pokemon.sprites.front_default} />
                </IonAvatar>
                <IonLabel className='pokemon-namer'>
                  {pokemon.name} 
                  <p>#{pokemon.id}</p>
                </IonLabel>
                <div className="types-vertical ion-no-padding" >
                  {pokemon.types.map((t: any, i: number) => (
                    <IonChip key={i} color="light">
                      {t.type.name}
                    </IonChip>
                  ))}
                </div>

              </IonItem>
            </IonCardContent>
          </IonCard>      
        ))}

        <IonModal breakpoints={[0, 0.5, 0.8]} initialBreakpoint={0.6}
        ref={modal} isOpen={selectedUser !== null} 
        onIonModalDidDismiss={() => setSelectedUser(null)}>
          <IonHeader>
            <IonToolbar color={'primary'}>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>
                  Close
                </IonButton>
              </IonButtons>
             <IonTitle>{selectedUser?.name}</IonTitle>
            </IonToolbar>
            <IonToolbar color={'primary'}>
              <IonSegment value={activeSegment} onIonChange={e => setActiveSegment(e.detail.value!)}>
                <IonSegmentButton value="details">Detalhes</IonSegmentButton>
                <IonSegmentButton value="stats">Stats</IonSegmentButton>
                <IonSegmentButton value="moves">Movimentos</IonSegmentButton>
              </IonSegment>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
           
            {activeSegment === "details" && selectedUser && (
              <div className="segment-section">
                <h2>{selectedUser.name}</h2>

                <img src={selectedUser.sprites.front_default} />

                <p>Pokedex Entry: #{selectedUser.id}</p>
                <p>Height: {selectedUser.height}</p>
                <p>Weight: {selectedUser.weight}</p>

                <h3>Types</h3>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {selectedUser.types.map((t, i) => (
                    <IonChip key={i} color="light">
                      {t.type.name}
                    </IonChip>
                  ))}
                </div>
              </div>
            )}

            {/* STATS */}
            {activeSegment === "stats" && selectedUser && (
              <div className="segment-section">
                {selectedUser.stats.map((s, i) => (
                  <p key={i}>
                    {s.stat.name}: {s.base_stat}
                  </p>
                ))}
              </div>
            )}

            {/* MOVES */}
            {activeSegment === "moves" && selectedUser && (
              <div className="segment-section">
                {selectedUser.moves.slice(0, 10).map((m, i) => (
                  <p key={i}>{m.move.name}</p>
                ))}
              </div>
            )}

          </IonContent>
        </IonModal>
      </IonContent>

      <IonModal ref={cardModal} trigger="card-modal" presentingElement={presentingElement!}>
        <IonHeader>
          <IonToolbar color={'success'}>
            <IonButtons slot="start">
              <IonButton onClick={() => cardModal.current?.dismiss()}>
                Close
              </IonButton>
            </IonButtons>
            <IonTitle>Card Modal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p> testerinho </p>
        </IonContent>
      </IonModal>

      <IonFab  vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton id="card-modal">
          <IonIcon icon={addOutline} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Pokedex;