import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  basketOutline,
  cardOutline,
  ellipse,
  personCircleOutline,
  square,
  triangle,
} from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { Context } from './defaults';
import { useState } from 'react';
import Login from './pages/Login';

const App: React.FC = () => {
  const [role, setRole] = useState('student');
  return (
    <IonApp>
      <IonReactRouter>
        <Context.Provider
          value={{
            role: null,
            basket: null,
          }}>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/menu">
                <Tab1 />
              </Route>
              <Route exact path="/order">
                <Tab2 />
              </Route>
              <Route path="/profile">
                <Tab3 />
              </Route>
              <Route exact path="/">
                <Redirect to="/menu" />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="menu" href="/menu">
                <IonIcon icon={basketOutline} />
                <IonLabel>Меню</IonLabel>
              </IonTabButton>
              <IonTabButton tab="order" href="/order">
                <IonIcon icon={cardOutline} />
                <IonLabel>Корзина</IonLabel>
              </IonTabButton>
              {role === 'admin' && (
                <IonTabButton tab="order" href="/order">
                  <IonIcon icon={cardOutline} />
                  <IonLabel>Корзина</IonLabel>
                </IonTabButton>
              )}
              <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={personCircleOutline} />
                <IonLabel>Профиль</IonLabel>
              </IonTabButton>

              <IonTabButton tab="login" href="/login">
                <IonIcon icon={personCircleOutline} />
                <IonLabel>Login</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </Context.Provider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
