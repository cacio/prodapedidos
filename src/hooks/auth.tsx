import React,{ createContext, ReactNode,useContext,useState,useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { database } from '../databases';
import { User as modelUser } from '../databases/model/User';
import { Clientes as modelCliente } from '../databases/model/Clientes';
const {CLIENT_ID}    = process.env;
const {REDIRECT_URI} = process.env;

interface AuthProviderProps{
    children:ReactNode;
}

interface User{
    id:string;
    user_id:string;
    name:string;
    email:string;
    photo?:string;
    codrepre:string;
    cnpj_emp:string;
    token:string;
}



interface SignInCredentials{
    email:string;
    password:string;
}
interface IAuthContextData{    
    user:User;
    signInWithGoogle():Promise<void>;
    signInWithApple():Promise<void>;
    signOut():Promise<void>;
    signIn(credentials:SignInCredentials):Promise<void>;    
    updateUser:(usuario:User)=>Promise<void>;
}

interface AuthorizationResponse{
    params:{
        access_token:string;        
    },
    type:string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({children}:AuthProviderProps){
    const [userData,setUserData] = useState<User>({} as User);
    const [userstorageLoading,setUserstorageLoading] = useState(true);
    const userStorageKey = '@prodapedidos:user';

    async function signInWithGoogle() {
        try {
            const RESPONSE_TYPE = 'token';
            const SCOP          = encodeURI('profile email');
            const AuthUrl       =  `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOP}`;
           
            const {params,type} = await AuthSession.startAsync({authUrl:AuthUrl}) as AuthorizationResponse;
            console.log(type);
            if(type === 'success'){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json(); 
                
                const userLogged= {
                      id:userInfo.id,
                      email:userInfo.email,
                      name:userInfo.given_name,
                      photo:userInfo.picture,
                      codrepre:''
                }
              
                //setUser(userLogged);

                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
            }

        } catch (error) {
            console.log(error);
            throw new Error(''+error+'');
            
        }
    }

    async function signInWithApple() {
        try {
            const credencial = await AppleAuthentication.signInAsync({
                requestedScopes:[
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });
            
            if(credencial){
                const name = credencial.fullName!.givenName!;
                const userLogged= {
                    id:String(credencial.user),
                    email:credencial.email!,
                    name,
                    photo:`https://ui-avatars.com/api/?name=${name}&length=1`,
                    codrepre:''
                }
                console.log(credencial);
                //setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged)); 
            }

        } catch (error) {
            throw new Error(''+error+'');
            
        }
    }

    async function signIn({email,password}:SignInCredentials) {

         try {
            
            const response = await api.post('/auth',{
                email:email,
                passwd:password
            });
            
            const {token,usuario } = response.data;
                        
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUserData({...usuario,token});
            
            const userConllection =  database.get<modelUser>('usuarios');

            await database.write(async () =>{
                await userConllection.create((newUser)=>{
                    console.log(usuario);
                    newUser.user_id  = usuario.id;
                    newUser.name     = usuario.name;
                    newUser.email    = usuario.email;
                    newUser.photo    = usuario.photo;
                    newUser.codrepre = usuario.codrepre;
                    newUser.cnpj_emp = usuario.cnpj_emp;
                    newUser.token    = token;
                })
            });

        } catch (error) {                    
            throw new Error(String(error));
        }

        
    }

    async function signOut() {

        try {
            const userConllection = database.get<modelUser>('usuarios');
            await database.write(async ()=>{
                const userSelected = await userConllection.find(userData.id)
                await userSelected.destroyPermanently();                
            });

             setUserData({} as User);
             await AsyncStorage.removeItem(userStorageKey);

        } catch (error) {
            throw new Error(''+error+'');
        }

    }

    async function updateUser(usuario:User){
        try {
            const userCollection = database.get<modelUser>('usuarios');
            await database.write(async ()=>{
                const userSelected = await userCollection.find(usuario.id);
                await userSelected.update((usuarioData)=>{
                    usuarioData.name = usuario.name;
                    usuarioData.codrepre = usuario.codrepre;
                    usuarioData.photo    = usuario.photo ? usuario.photo :'';
                })
            })
        } catch (error) { 
            console.log(error);           
            throw new Error(''+error+''); 
        }
    }

    useEffect(()=>{
        async function loadUserStoregeDate() {

                const userCollection = database.get<modelUser>('usuarios');
                const response = await userCollection.query().fetch();
                
                //console.log(response);
                if(response.length > 0){

                    const userData = response[0]._raw as unknown as User;
                    api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
                    //console.log(userData);
                    setUserData(userData);
                }

              //  console.log(response);
               /*const userStorage = await AsyncStorage.getItem(userStorageKey); 
                
               if(userStorage){
                   const userLogged = JSON.parse(userStorage) as User;
                   setUser(userLogged);
               }*/

               setUserstorageLoading(false);
        }
        loadUserStoregeDate();
    },[])

    return (
        <AuthContext.Provider value={{user:userData,signInWithGoogle,signInWithApple,signOut,signIn,updateUser}}>
            {children}
        </AuthContext.Provider>

    );

}

function useAuth(){
    const contex = useContext(AuthContext);
    return contex;
}

export {AuthProvider,useAuth}