import { IonContent, IonPage, IonImg, IonButton, IonCheckbox } from '@ionic/react';
import React, { useState } from 'react';
import Logo from '../img/logo.png';
import Google from '../img/google.png';
import '../styles/styles.css';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../components/firebaseConfig';
import { useHistory } from 'react-router';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const history = useHistory();

    const validateFields = () => {
        if (!email) return "O e-mail é obrigatório";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "O e-mail não é válido";
        if (!password) return "A senha é obrigatória";
        return null;
    };

    const doLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        const validationError = validateFields();
        if (validationError) {
            alert(validationError);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            const user = userCredential.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            history.push('app/home', { userName: user.displayName });
        } catch (error) {
            console.error(error);
            alert("Erro ao logar: " + error.message);
        }
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            const firstName = user.displayName ? user.displayName.split(' ')[0] : '';
            history.push('/app/home', { userName: firstName });
        } catch (error) {
            console.error(error);
            alert("Erro ao logar com Google: " + error.message);
        }
    };

    return (
        <IonPage>
            <IonContent>
                <div>
                    <div className="login-title ion-padding">
                        <IonImg className='LogoLogin' src={Logo} alt="Logo"></IonImg>
                        <h1 className="inter-black-strong-32">SmartTask</h1>
                    </div>
                    <p className="login-title inter-grey-14"></p>

                    <form action="" onSubmit={doLogin}>
                        <div className='register-itens-centered'>
                            <div>
                                <p className="inter-black-thin-12">Seu e-mail</p>
                                <input className="inter-black-thin-12 loginInput"
                                    type="email"
                                    placeholder='smarttask@smarttask.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                
                                <p className='inter-black-thin-12'>Sua senha</p>
                                <input className='inter-black-thin-12 loginInput'
                                    type="password"
                                    placeholder='******************'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='checkbox-login-container'>
                            <div className='checkbox-login'>
                                <IonCheckbox className='checkbox'
                                    checked={rememberMe}
                                    onIonChange={(e) => setRememberMe(e.detail.checked)}
                                />
                                <p className='inter-black-thin-12'>Lembrar de mim</p>
                            </div>
                            <div>
                                <p className='inter-black-thin-12'>Esqueceu a senha?</p>
                            </div>
                        </div>
                        <IonButton className='login-button' type='submit' expand='block'>Logar</IonButton>
                    </form>
                    <div className='login-separator'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="144" height="2" viewBox="0 0 144 2" fill="none">
                            <path d="M143 1.5C143.276 1.5 143.5 1.27614 143.5 1C143.5 0.723858 143.276 0.5 143 0.5V1.5ZM0 1.5H143V0.5H0V1.5Z" fill="#BDBDBD" />
                        </svg>
                        <p className='inter-black-thin-12'>ou</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="145" height="2" viewBox="0 0 145 2" fill="none">
                            <path d="M144 1.49999C144.276 1.49999 144.5 1.27613 144.5 0.999987C144.5 0.723845 144.276 0.499987 144 0.499987L144 1.49999ZM4.34078e-08 1.5L144 1.49999L144 0.499987L-4.34078e-08 0.5L4.34078e-08 1.5Z" fill="#BDBDBD" />
                        </svg>
                    </div>

                    <IonButton className='google-button' onClick={loginWithGoogle} expand='block'>
                        <img src={Google} alt="" />
                        <p style={{ marginLeft: '14px' }}>Logar com o Google</p>
                    </IonButton>

                    <p className='login-final inter-black-thin-12'>Não tem uma conta? <span className='detail'>Cadastre-se</span></p>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Login;
