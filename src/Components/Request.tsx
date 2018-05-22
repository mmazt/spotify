import axios from 'axios';

import { albumTracks, artistAlbums, getUser } from '../Actions/searchActions';
import env from '../config/envSelector';
import * as Index from '../index';

// Constrói a chamada basica de busca de dados na api do Spotify
export const search = (term: string, type: string, autocomplete?: boolean) => {
  const token = window.localStorage.getItem('token');
  const url = autocomplete
    ? env().api +
      '/search/?q=' +
      type +
      ':' +
      term +
      '*' +
      '&type=' +
      type +
      '&market=from_token'
    : env().api + '/search/?q=' + term + '&type=' + type + '&market=from_token';
  return axios({
    headers: {
      Authorization: 'Bearer ' + token
    },
    method: 'get',
    url
  }).catch((error: any) => {
    console.log(error);
    clearData();
    return error;
  });
};

export const getData = (id: string, type: string) => {
  const token = window.localStorage.getItem('token');
  const url =
    type === 'album'
      ? env().api + '/albums/' + id + '/tracks'
      : env().api + '/artists/' + id + '/albums';
  return axios({
    headers: {
      Authorization: 'Bearer ' + token
    },
    method: 'get',
    url
  })
    .then(response => {
      const items = response.data.items;
      if (type === 'album') {
        Index.store.dispatch(albumTracks(items));
      } else {
        Index.store.dispatch(artistAlbums(items));
      }
      return true;
    })
    .catch((error: any) => {
      console.log(error);
      clearData();
      return error;
    });
};

// Busca informações do usuário na base do Spotify e envia ao Redux para uso imediato e localStorage para próximas sessões
export const userData = () => {
  const token = window.localStorage.getItem('token');
  const url = env().api + '/me';
  return axios({
    headers: {
      Authorization: 'Bearer ' + token
    },
    method: 'get',
    url
  })
    .then(response => {
      const result = {
        country: response.data.country,
        image: response.data.images[0].url,
        name: response.data.display_name,
        url: response.data.href
      };
      window.localStorage.setItem('user', JSON.stringify(result));
      Index.store.dispatch(getUser(result));
    })
    .catch((error: any) => {
      console.log(error);
      clearData();
      return error;
    });
};

// Chama o endpoint de autorização da API do Spotify
export const authorize = () => {
  return (
    'https://accounts.spotify.com/authorize/?client_id=' +
    env().client_id +
    '&response_type=token&redirect_uri=' +
    env().url +
    '&scope=user-read-private'
  );
};

// Extrai o token  e sua data de expiração do retorno do callback e os salvam para uso em chamadas futuras
export const saveToken = (token: string) => {
  const expires =
    Date.now() +
    parseInt(
      token.slice(token.indexOf('&expires_in=')).replace('&expires_in=', ''),
      10
    ) *
      1000;
  const accessToken = token
    .slice(0, token.indexOf('&token'))
    .replace('#access_token=', '');
  window.localStorage.setItem('token', accessToken);
  window.localStorage.setItem('expire_date', expires.toString());
  userData();
};

// Checa a existência de um token e se o mesmo ainda não expirou
export const checkAuthorization = async () => {
  const token = window.localStorage.getItem('token');
  const expires = window.localStorage.getItem('expire_date');
  if (token && expires && parseInt(expires, 10) > Date.now()) {
    const user = window.localStorage.getItem('user');
    if (user) {
      Index.store.dispatch(getUser(JSON.parse(user)));
    } else {
      userData();
    }
    return true;
  } else {
    clearData();
    return false;
  }
};

// Limpa os dados do usuário em caso de logout ou expiração do token
export const clearData = () => {
  window.localStorage.clear();
  Index.store.dispatch(getUser({ name: '', image: '', url: '' }));
};
