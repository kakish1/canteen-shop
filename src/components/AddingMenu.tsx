import {
  IonContent,
  IonHeader,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonItem,
  IonText,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from '@ionic/react';
import { useState, useEffect } from 'react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { camera } from 'ionicons/icons';
import './AddingMenu.css';

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  const takePhoto = async () => {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });
    console.log(cameraPhoto);

    const fileName = new Date().getTime() + '.jpeg';
    const newPhotos = [
      {
        filepath: fileName,
        webviewPath: cameraPhoto.base64String,
      },
      ...photos,
    ];
    setPhotos(newPhotos);
  };
  return {
    takePhoto,
    photos,
  };
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

const AddingMenu: React.FC = () => {
  const { photos, takePhoto } = usePhotoGallery();
  console.log(photos);
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/admin" />
          </IonButtons>
          <IonTitle>Добавить меню:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen slot="fixed">
        <div>
          {photos.length > 0 && <img src={`data:image/png;base64, ${photos[0].webviewPath}`}></img>}
        </div>
        <div className="photoBlock">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </div>
        <div></div>
      </IonContent>
    </IonPage>
  );
};

export default AddingMenu;
