import {
    IonContent,
    IonAvatar,
    IonPage,
    IonProgressBar,
    IonGrid,
    IonRow,
    IonCol
  } from '@ionic/react';
  import React, { useEffect } from 'react';
  import Edu from '../img/eduardo.png';
  import {  } from '@ionic/react';
  import '../styles/styles.css'
import { useLocation } from 'react-router-dom';
  
  const Home: React.FC = () => {
    const location = useLocation<{ userName: string }>();
    const userName = location.state?.userName || "Usuário";
     
    return (
      <>
        <IonPage>
          <IonContent className='white-index'>
            <div className="header">
              <div className='header-itens'>
  
                <div className='header-info'>
                  <IonAvatar>
                    <img alt="Silhouette of a person's head" className='user-foto' src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                  </IonAvatar>
                  <h1 className='inter-white-thin-12'>Olá,<br /><span className='inter-white-thin-18'><strong>{userName}</strong></span></h1>
                </div>
  
                <div className='header-notification'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="23" viewBox="0 0 18 23" fill="none" className='notification-item'>
                    <path d="M0 19.55V17.25H2.25V9.2C2.25 7.60917 2.71875 6.19563 3.65625 4.95937C4.59375 3.72312 5.8125 2.91333 7.3125 2.53V1.725C7.3125 1.24583 7.47656 0.838542 7.80469 0.503125C8.13281 0.167708 8.53125 0 9 0C9.46875 0 9.86719 0.167708 10.1953 0.503125C10.5234 0.838542 10.6875 1.24583 10.6875 1.725V2.53C12.1875 2.91333 13.4062 3.72312 14.3438 4.95937C15.2812 6.19563 15.75 7.60917 15.75 9.2V17.25H18V19.55H0ZM9 23C8.38125 23 7.85156 22.7748 7.41094 22.3244C6.97031 21.874 6.75 21.3325 6.75 20.7H11.25C11.25 21.3325 11.0297 21.874 10.5891 22.3244C10.1484 22.7748 9.61875 23 9 23ZM4.5 17.25H13.5V9.2C13.5 7.935 13.0594 6.85208 12.1781 5.95125C11.2969 5.05042 10.2375 4.6 9 4.6C7.7625 4.6 6.70312 5.05042 5.82187 5.95125C4.94062 6.85208 4.5 7.935 4.5 9.2V17.25Z" fill="white"/>
                  </svg>
                </div>
  
              </div>
  
              <div className='progression-tasks'>
                <p className='inter-white-thin-12'><strong>Progresso Diário</strong></p>
                <div className='progression-flex'>
                  <IonProgressBar className='progress-bar' value={0.25} buffer={100}></IonProgressBar>
                  <p className='inter-white-thin-12'>25%</p>
                </div>
              </div>
  
            </div>
  
            <main className='main-index'>
              <div className='weekly-tasks'>
                <p className='inter-black-normal-32'>89%</p>
                <div>
                  <p className='inter-black-normal-15'><strong>Progresso semanal</strong></p>
                  <p className='detail-cinza'><span className='inter-black-normal-15'><strong>26/32</strong></span> tasks concluídas</p>
                </div>
              </div>
            </main>
  
            <section className='tasks-groups'>
              <h1 className='inter-black-normal-15'>Tasks Mensais</h1>
  
              <IonGrid>
                <IonRow className='projects-grid'>
                  <IonCol size="5.5" size-md="4" size-lg="2" className='projects separator'>
                    <h3 className='inter-white-thin-12'><strong>68 projetos</strong></h3>
                    <p className='detail-cinza'>Todo</p>
                  </IonCol>
                  <IonCol size="5.5" size-md="4" size-lg="2" className='other-projects separator'>
                    <h3 className='inter-black-thin-12'><strong>36 projetos</strong></h3>
                    <p className='detail-cinza'>Completos</p>
                  </IonCol>
                  <IonCol size="5.5" size-md="4" size-lg="2" className='other-projects separator'>
                    <h3 className='inter-black-thin-12'><strong>11 projetos</strong></h3>
                    <p className='detail-cinza'>Em Trabalho</p>
                  </IonCol>
                  <IonCol size="5.5" size-md="4" size-lg="2" className='other-projects separator'>
                    <h3 className='inter-black-thin-12'><strong>3 projetos</strong></h3>
                    <p className='detail-cinza'>Cancelados</p>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </section>
  
            <section className='index-rest'>
              <div className='progresso-tarefas'>
                <h1 className='inter-black-normal-15'>Tasks Mensais</h1>
                <p className='detail-cinza-n'>Ver mais</p>
              </div>
            </section>
  
          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default Home;
  