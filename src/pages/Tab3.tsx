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
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { getLoggerUser } from '../api';
import { User } from '../api/models';
import './Tab3.css';
import {
  basketOutline,
  calendarOutline,
  calendarSharp,
  callOutline,
  cardOutline,
  ellipse,
  mailOutline,
  personCircleOutline,
  personOutline,
  square,
  triangle,
} from 'ionicons/icons';

const Tab3: React.FC = () => {
  const [loggedUser, setLoggedUser] = useState<User>();
  useEffect(() => {
    getLoggerUser().then(({ data }) => setLoggedUser(data));
  }, []);

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
              <IonIcon slot="mail-outline"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen slot="fixed">
        <IonCard>
          <IonHeader>
            <IonAvatar className="avatar">
              <img src="https://bipbap.ru/wp-content/uploads/2018/03/01-700x1050-640x960.jpg" />
            </IonAvatar>
          </IonHeader>
          <IonCardContent>
            <IonList>
              <IonListHeader>Персональная информация</IonListHeader>
              <IonItem>
                <IonIcon icon={mailOutline} />
                <span className="info">Почтовый адрес:</span>
                <IonLabel> {loggedUser?.email}</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={callOutline} />
                <span className="info">Номер телефона:</span>
                <IonLabel> {loggedUser?.phoneNumber}</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={personOutline} />
                <span className="info">ФИО:</span>
                <IonLabel>
                  {loggedUser?.firstName} {loggedUser?.lastName} {loggedUser?.middleName}
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={calendarOutline} />
                <span className="info">Дата регистрации:</span>
                <IonLabel> {loggedUser?.registrationDate}</IonLabel>
              </IonItem>
            </IonList>
            <IonButton expand="full" color="secondary">
              История заказов
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
