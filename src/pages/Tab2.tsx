import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonPage,
  IonRow,
} from '@ionic/react';
import { useContext } from 'react';
import { Context } from '../defaults';
import './Tab2.css';

const Tab2: React.FC = () => {
  const { counter, menuItems } = useContext(Context);
  const order = [] as any;
  // @ts-ignore
  counter.forEach((el1) => {
    // @ts-ignore
    menuItems.forEach((el2) => {
      if (el1.id === el2.id) {
        order.push({ id: el1.id, name: el2.name, count: el1.count });
      }
    });
  });

  return (
    <IonPage>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Ваш заказ:</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {
            // @ts-ignore
            !!order &&
              // @ts-ignore
              order?.map((item: any, index) => {
                // @ts-ignore
                return (
                  <IonGrid key={index}>
                    <IonRow>
                      <IonCol style={{ width: 105 }}>
                        <h3>{item.name}</h3>
                      </IonCol>
                      <IonCol></IonCol>
                      <IonCol>
                        <div>
                          <b>{item.count}</b>
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                );
              })
          }
        </IonCardContent>
      </IonCard>
    </IonPage>
  );
};

export default Tab2;
