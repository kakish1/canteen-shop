import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const menuItems = [
  {
    id: 1,
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
    desc: 'Its cool meal',
    price: '100tg',
  },
  {
    id: 2,
    img: 'https://img.buzzfeed.com/video-api-prod/assets/7500687a06b34ee29c84a044861a01fc/BFV9770_DoubleCheeseburgerasmadebyErikAnderson-Thumb1080SQ.jpg?output-format=auto&output-quality=auto',
    name: 'Double Cheese Burger ',
    desc: 'Its a mutherfucing BURGEEEEEEEEEEEEEEEEEEEER',
    price: '100tg',
  },
  {
    id: 3,
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
    desc: 'Its cool meal',
    price: '100tg',
  },
  {
    id: 4,
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
    desc: 'Its cool meal',
    price: '100tg',
  },
  {
    id: 5,
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
    desc: 'Its cool meal',
    price: '100tg',
  },
  {
    id: 6,
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
    desc: 'Its cool meal',
    price: '100tg',
  },
  {
    id: 7,
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
    desc: 'Its cool meal',
    price: '100tg',
  },
  {
    id: 8,
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
    desc: 'Its cool meal',
    price: '100tg',
  },
  {
    id: 9,
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
    desc: 'Its cool meal',
    price: '100tg',
  },
  {
    id: 10,
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
    desc: 'Its cool meal',
    price: '100tg',
  },
  {
    id: 11,
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
    desc: 'Its cool meal',
    price: '100tg',
  },
  {
    id: 12,
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
    desc: 'Its cool meal',
    price: '100tg',
  },

  {
    id: 13,
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
    desc: 'Its cool meal',
    price: '100tg',
  },
  {
    id: 14,
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
    desc: 'Its cool meal',
    price: '100tg',
  },
  {
    id: 15,
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
    desc: 'Its cool meal',
    price: '100tg',
  },
  {
    id: 16,
    img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
    name: 'Pizza',
    desc: 'Its cool meal',
    price: '100tg',
  },
];

const Tab1: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<any>();

  const modalAction = (id: any) => {
    setShowModal(true);
    setCurrentMenu(menuItems.find((el) => el.id == id));
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Меню</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonModal isOpen={showModal} cssClass="my-custom-class">
          {showModal && (
            <>
              <IonCard>
                <img src={currentMenu.img} />
                <IonCardHeader>
                  <IonCardSubtitle>Из чего состоит</IonCardSubtitle>
                  <IonCardTitle>{currentMenu.name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>{currentMenu.desc}</IonCardContent>
              </IonCard>
              <IonButton color="secondary" size="default" onClick={() => setShowModal(false)}>
                Закрыть
              </IonButton>
            </>
          )}
        </IonModal>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Меню</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList style={{ marginTop: 15 }} lines="inset">
          {menuItems &&
            menuItems.map((item, index) => {
              return (
                <IonItem key={index}>
                  <IonAvatar slot="start">
                    <img src={item.img} />
                  </IonAvatar>
                  <IonLabel onClick={() => modalAction(item.id)}>
                    <h3>
                      {item.name} {item.price}
                    </h3>
                    <p>{item.desc}</p>
                  </IonLabel>
                  <IonButton color="success">
                    <IonIcon icon={addCircleOutline} />
                  </IonButton>
                  <IonButton color="danger">
                    <IonIcon icon={removeCircleOutline} />
                  </IonButton>
                </IonItem>
              );
            })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
