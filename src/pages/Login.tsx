import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import './Login.css';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
        <IonTitle>Login</IonTitle>
      </IonToolbar>
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="fixed"> Username</IonLabel>
          <IonInput type="text" required></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="fixed"> Password</IonLabel>
          <IonInput type="password" required></IonInput>
        </IonItem>

        <IonRow>
          <IonCol>
            <IonButton type="submit" color="danger" expand="block">
              Sign In
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
