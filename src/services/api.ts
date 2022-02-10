import axios from 'axios';

const api = axios.create({
    baseURL:'https://prodapro-pedido.herokuapp.com'
});

export {api};