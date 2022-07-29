import axios from 'axios';

const api = axios.create({
    //baseURL:'https://prodapro-pedido.herokuapp.com'
    baseURL:'http://192.168.0.22:3333'
});

export {api};