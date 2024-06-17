import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonModal,
  IonPage,
  IonPopover,
  IonTitle,
  IonToast,
  IonAlert,
  IonToolbar,
} from '@ionic/react';
import { add, trashBin, ellipsisVertical, server, createOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { auth, db } from '../components/firebaseConfig';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Logo from '../img/logo.png';
import '../styles/styles.css';

const Tarefas: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [newTodoDueDate, setNewTodoDueDate] = useState<string | undefined>(undefined);
  const [todos, setTodos] = useState<any[]>([]);
  const [popoverState, setPopoverState] = useState<{ show: boolean, event: Event | undefined, selectedTodo: any }>({ show: false, event: undefined, selectedTodo: null });
  const [showToast, setShowToast] = useState<{ open: boolean, message: string }>({ open: false, message: '' });
  const [alertOpen, setAlertOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState<any>(null);

  const fetchTodos = async (userId: string) => {
    const q = query(collection(db, 'todos'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const todosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTodos(todosData);
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      fetchTodos(currentUser.uid);
    }
  }, []);

  const onWillDismiss = (ev: any) => {
    setIsModalOpen(false);
  };

  const addTodo = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error('Usuário não autenticado');
      return;
    }

    if (!newTodoTitle.trim() || !newTodoDescription.trim() || !newTodoDueDate) {
      console.error('Todos os campos são obrigatórios');
      return;
    }

    const newTodo = {
      title: newTodoTitle,
      description: newTodoDescription,
      dueDate: newTodoDueDate,
      userId: currentUser.uid,
    };

    try {
      const docRef = await addDoc(collection(db, 'todos'), newTodo);
      console.log('Documento adicionado com ID:', docRef.id);
      setTodos([...todos, { id: docRef.id, ...newTodo }]);
      setNewTodoTitle('');
      setNewTodoDescription('');
      setNewTodoDueDate(undefined);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao adicionar tarefa: ', error);
      if (error.code === 'permission-denied') {
        console.error('Erro de permissão: verifique as regras de segurança do Firestore.');
      }
    }
  };

  const handleOptionSelect = async (action: string) => {
    const { selectedTodo } = popoverState;
    setPopoverState({ show: false, event: undefined, selectedTodo: null });

    switch (action) {
      case 'edit':
        openEditModal(selectedTodo);
        break;
      case 'delete':
        // Exibir alerta de confirmação
        setTodoToDelete(selectedTodo);
        setAlertOpen(true);
        break;
      case 'complete':
        // Implementar a lógica de conclusão
        console.log('Concluir:', selectedTodo);
        try {
          await deleteDoc(doc(db, 'todos', selectedTodo.id));
          setTodos(todos.filter(todo => todo.id !== selectedTodo.id));
          setShowToast({ open: true, message: 'Tarefa concluída!' });
        } catch (error) {
          console.error('Erro ao concluir tarefa: ', error);
        }
        break;
      default:
        break;
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, 'todos', todoToDelete.id));
      setTodos(todos.filter(todo => todo.id !== todoToDelete.id));
      setShowToast({ open: true, message: 'Tarefa excluída!' });
      setTodoToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir tarefa: ', error);
    }
  };

  const openEditModal = (todo: any) => {
    setEditTodo(todo);
    setIsEditModalOpen(true);
  };

  const updateTodo = async () => {
    if (!editTodo.title.trim() || !editTodo.description.trim() || !editTodo.dueDate) {
      console.error('Todos os campos são obrigatórios');
      return;
    }

    try {
      const todoRef = doc(db, 'todos', editTodo.id);
      await updateDoc(todoRef, {
        title: editTodo.title,
        description: editTodo.description,
        dueDate: editTodo.dueDate
      });
      setTodos(todos.map(todo => (todo.id === editTodo.id ? editTodo : todo)));
      setIsEditModalOpen(false);
      setShowToast({ open: true, message: 'Tarefa atualizada!' });
    } catch (error) {
      console.error('Erro ao atualizar tarefa: ', error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <header className='header-tasks'>
          <div className='tasks-header'>
            <IonImg className='LogLogin' src={Logo}></IonImg>
            <h1 className='inter-white-strong-32'>SmartTask</h1>
          </div>
        </header>

        <section className='task-list'>
          {todos.map(todo => (
            <div className="task-item" key={todo.id}>
              <div className="task-icon">
                <IonIcon icon={server} />
              </div>
              <div className="task-content">
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
                <p>{new Date(todo.dueDate).toLocaleString()}</p>
              </div>
              <IonIcon className="task-options" icon={ellipsisVertical} onClick={(e: any) => setPopoverState({ show: true, event: e.nativeEvent, selectedTodo: todo })} />
            </div>
          ))}
        </section>

        <IonPopover
          isOpen={popoverState.show}
          event={popoverState.event}
          onDidDismiss={() => setPopoverState({ show: false, event: undefined, selectedTodo: null })}
        >
          <IonItem button onClick={() => handleOptionSelect('edit')}>
            <IonIcon icon={createOutline} slot="start" />
            Editar
          </IonItem>
          <IonItem button onClick={() => handleOptionSelect('delete')}>
            <IonIcon icon={trashBin} slot="start" />
            Excluir
          </IonItem>
          <IonItem button onClick={() => handleOptionSelect('complete')}>
            <IonIcon icon={checkmarkDoneOutline} slot="start" />
            Concluir
          </IonItem>
        </IonPopover>

        <IonModal isOpen={isModalOpen} onWillDismiss={onWillDismiss}>
          <header className='header-tasks'>
            <div className='tasks-header'>
              <IonImg className='LogLogin' src={Logo}></IonImg>
              <h1 className='inter-white-strong-32'>SmartTask</h1>
            </div>
          </header>

          <main className='add-task-itens'>
            <IonInput 
              label="Nova Tarefa" 
              labelPlacement="floating" 
              fill="outline" 
              placeholder="Adicione aqui uma nova tarefa" 
              value={newTodoTitle} 
              onIonChange={(e) => setNewTodoTitle(e.detail.value!)}
            />
            <IonInput 
              label="Descrição" 
              labelPlacement="floating" 
              fill="outline" 
              placeholder="Adicione a descrição da tarefa" 
              value={newTodoDescription} 
              onIonChange={(e) => setNewTodoDescription(e.detail.value!)}
            />
            <IonDatetime 
              value={newTodoDueDate} 
              onIonChange={(e) => setNewTodoDueDate(e.detail.value!)} 
              placeholder="Selecione a data e hora"
            />
          </main>

          <footer>
            <div className='buttons-tasks'>
              <IonIcon className='cancel-button' icon={trashBin} onClick={() => setIsModalOpen(false)}></IonIcon>
              <IonIcon className='confirm-button' icon={add} onClick={addTodo}></IonIcon>
            </div>
          </footer>
        </IonModal>

        <IonModal isOpen={isEditModalOpen} onDidDismiss={() => setIsEditModalOpen(false)}>
          <header className='header-tasks'>
            <div className='tasks-header'>
              <IonImg className='LogLogin' src={Logo}></IonImg>
              <h1 className='inter-white-strong-32'>SmartTask</h1>
            </div>
          </header>

          <main className='add-task-itens'>
            <IonInput 
              label="Editar Tarefa" 
              labelPlacement="floating" 
              fill="outline" 
              placeholder="Edite a tarefa" 
              value={editTodo?.title || ''} 
              onIonChange={(e) => setEditTodo({ ...editTodo, title: e.detail.value! })}
            />
            <IonInput 
              label="Descrição" 
              labelPlacement="floating" 
              fill="outline" 
              placeholder="Edite a descrição da tarefa" 
              value={editTodo?.description || ''} 
              onIonChange={(e) => setEditTodo({ ...editTodo, description: e.detail.value! })}
            />
            <IonDatetime 
              value={editTodo?.dueDate} 
              onIonChange={(e) => setEditTodo({ ...editTodo, dueDate: e.detail.value! })} 
              placeholder="Selecione a data e hora"
            />
          </main>

          <footer>
            <div className='buttons-tasks'>
              <IonIcon className='cancel-button' icon={trashBin} onClick={() => setIsEditModalOpen(false)}></IonIcon>
              <IonIcon className='confirm-button' icon={add} onClick={updateTodo}></IonIcon>
            </div>
          </footer>
        </IonModal>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setIsModalOpen(true)}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonToast
          isOpen={showToast.open}
          message={showToast.message}
          duration={2000}
          onDidDismiss={() => setShowToast({ open: false, message: '' })}
        />

        <IonAlert
          isOpen={alertOpen}
          onDidDismiss={() => setAlertOpen(false)}
          header={'Confirmar Exclusão'}
          message={'Você tem certeza que deseja excluir esta tarefa permanentemente?'}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                setAlertOpen(false);
              }
            },
            {
              text: 'Excluir',
              handler: () => {
                confirmDelete();
                setAlertOpen(false);
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tarefas;
