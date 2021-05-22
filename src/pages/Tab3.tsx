import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="light">
              <IonIcon slot="start" name="ios-arrow-back">
                Favorites
              </IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>&nbsp;</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen slot="fixed">
        <IonCard>
          <IonHeader>
            <IonAvatar>
              <img src="https://bipbap.ru/wp-content/uploads/2018/03/01-700x1050-640x960.jpg" />
            </IonAvatar>
          </IonHeader>
          <IonCardContent>
            <div className="user-meta ion-text-center">
              <h3 className="playername">Roger Federer</h3>
              <h5 className="country">Switzerland</h5>
              <h6 className="ranking">
                Current ranking:
                <IonChip>
                  <IonLabel>2</IonLabel>
                </IonChip>
              </h6>
            </div>
            <IonButton expand="full" color="primary">
              http://rogerfederer.com
            </IonButton>
            <IonButton expand="full" color="secondary">
              @RogerFederer on Twitter
            </IonButton>
            <IonButton expand="full" color="secondary">
              View profile at ATP
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
