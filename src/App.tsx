import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, checkbox, calendarNumber, person } from 'ionicons/icons';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Tarefas from './pages/Tarefas';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/app">
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/app/home">
                <Home />
              </Route>
              <Route exact path="/app/tarefas">
                <Tarefas />
              </Route>
              <Route exact path="/app/calendario">
                {/* Componente Calendário */}
              </Route>
              <Route exact path="/app/perfil">
                {/* Componente Perfil */}
              </Route>
              <Route exact path="/app">
                <Redirect to="/app/home" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/app/home">
                <IonIcon icon={home} />
                <IonLabel>Início</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Tarefas" href="/app/tarefas">
                <IonIcon icon={checkbox} />
                <IonLabel>Tarefas</IonLabel>
              </IonTabButton>
              <IonTabButton tab="library" href="/app/calendario">
                <IonIcon icon={calendarNumber} />
                <IonLabel>Calendário</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
