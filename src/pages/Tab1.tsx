import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const menuItems = [
  {
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
  },
  {
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
  },
  {
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
  },
  {
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
  },
  {
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
  },
  {
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
  },
  {
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
  },
  {
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
  },
  {
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
  },
  {
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
  },
  {
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
  },
];
const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Меню</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Меню</IonTitle>
          </IonToolbar>
          <IonList style={{ marginTop: 15 }}>
            {menuItems &&
              menuItems.map((item) => {
                return (
                  <IonItem>
                    <IonAvatar slot="start">
                      <img src={item.img} />
                    </IonAvatar>
                    <IonLabel>{item.name}</IonLabel>
                    <IonButton color="success">+</IonButton>
                    <IonButton color="danger">-</IonButton>
                  </IonItem>
                );
              })}
          </IonList>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
