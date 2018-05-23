import axios from 'axios';

import {
  albumTracks,
  artistAlbums,
  getFavoriteAlbums,
  getFavoriteArtists,
  getFavoriteTracks,
  getUser
} from '../Actions/searchActions';
import env from '../config/envSelector';
import * as Index from '../index';

// Constrói a chamada basica de busca de dados na api do Spotify
export const search = async (
  term: string,
  type: string,
  autocomplete?: boolean
) => {
  const token = await getStorageString('token');
  const url = await Promise.resolve(
    autocomplete
      ? env().api +
        '/search/?q=' +
        type +
        ':' +
        term +
        '*' +
        '&type=' +
        type +
        '&market=from_token'
      : env().api +
        '/search/?q=' +
        term +
        '&type=' +
        type +
        '&market=from_token'
  );
  return axios({
    headers: {
      Authorization: 'Bearer ' + token
    },
    method: 'get',
    url
  }).catch((error: any) => {
    if (error.response.status === 401 || error.response.status === '401') {
      clearToken();
      window.location.href = '/';
    }
    return error;
  });
};

// Função que busca dados específicas de um album ou um artista no servidor
export const getData = async (id: string, type: string) => {
  const token = await getStorageString('token');
  const url = await Promise.resolve(
    type === 'album'
      ? env().api + '/albums/' + id + '/tracks'
      : env().api + '/artists/' + id + '/albums'
  );
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
      if (error.response.status === 401 || error.response.status === '401') {
        clearToken();
        window.location.href = '/';
      }
      return error;
    });
};

// Busca informações do usuário na base do Spotify e envia ao Redux para uso imediato e localStorage para próximas sessões
export const userData = async () => {
  const token = await getStorageString('token');
  const url = env().api + '/me';
  try {
    const response = await axios({
      headers: {
        Authorization: 'Bearer ' + token
      },
      method: 'get',
      url
    });
    const result = {
      country: response.data.country,
      image: response.data.images[0].url,
      name: response.data.display_name,
      url: response.data.href
    };
    await Promise.all([
      saveStorageData('user', result),
      Promise.resolve(Index.store.dispatch(getUser(result)))
    ]);
  } catch (error) {
    console.log(error);
  }
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
export const saveToken = async (token: string) => {
  const expires = await Promise.resolve(
    Date.now() +
      parseInt(
        token.slice(token.indexOf('&expires_in=')).replace('&expires_in=', ''),
        10
      ) *
        1000
  );
  const accessToken = await Promise.resolve(
    token.slice(0, token.indexOf('&token')).replace('#access_token=', '')
  );
  await Promise.all([
    saveStorageString('token', accessToken),
    saveStorageString('expire_date', expires.toString())
  ]);
  await userData();
};

// Checa a existência de um token e se o mesmo ainda não expirou
export const checkAuthorization = async () => {
  const token = await getStorageString('token');
  const expires = await getStorageString('expire_date');
  if (token && expires && parseInt(expires, 10) > Date.now()) {
    const user = await getStorageData('user');
    if (user) {
      Index.store.dispatch(getUser(user));
    } else {
      userData();
    }
    return true;
  } else {
    clearToken();
    return false;
  }
};

// Limpa os dados do usuário em caso de logout ou expiração do token
export const clearToken = () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('expire_date');
  window.localStorage.removeItem('user');
  Index.store.dispatch(getUser({ name: '', image: '', url: '' }));
};

// Busca os dados de todos os favoritos, das três categorias
export const getAllFavorites = async () => {
  console.log('teste');
  try {
    Promise.all([
      getFavoritesData('albums'),
      getFavoritesData('artists'),
      getFavoritesData('tracks')
    ]);
  } catch (error) {
    console.log(error);
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
};

// Busca os favoritos de um tipo de dado a partir dos ids salvos no storage no servidor Spotify e salva na store do Redux
const getFavoritesData = async (type: string) => {
  const favorites = await getFavorites();
  if (favorites[type]) {
    const token = await getStorageString('token');
    const list = await Promise.resolve(
      favorites[type].reduce((item1: string, item2: string) => {
        return item1 + ',' + item2;
      })
    );
    const url = env().api + '/' + type + '/?ids=' + list;
    axios({
      headers: {
        Authorization: 'Bearer ' + token
      },
      method: 'get',
      url
    }).then(response => {
      const result = response.data[type][type].data;
      console.log(result);
      if (type === 'albums') {
        Index.store.dispatch(getFavoriteAlbums(result));
      } else if (type === 'artists') {
        Index.store.dispatch(getFavoriteArtists(result));
      } else {
        Index.store.dispatch(getFavoriteTracks(result));
      }
    });
  }
};

// Função que salva o id de um favorito no localStorage, criptografado, identificado por usuário
export const saveToFavorites = async (id: string, type: string) => {
  const user = await getStorageData('user');
  const favorites: any = await getFavorites(type);
  favorites[type].push(id);

  return saveStorageData('favorites_' + user.name, favorites);
};

// Função que retorna os favoritos do usuário, e, caso não existam, cria arrays vazias para receber dados
const getFavorites: any = async () => {
  const user = await getStorageData('user');
  const favorites = await getStorageData('favorites_' + user.name);
  if (favorites) {
    return Promise.resolve(favorites);
  } else {
    return Promise.resolve({ tracks: [], albums: [], artists: [] });
  }
};

// Função simples de salvar dados criptografados no localStorage
const saveStorageData = (name: string, data: any) => {
  return Promise.resolve(
    window.localStorage.setItem(name, encrypt(JSON.stringify(data)))
  );
};

// Função simples de salvar strings criptografadas no localStorage
const saveStorageString = (name: string, data: string) => {
  return Promise.resolve(window.localStorage.setItem(name, encrypt(data)));
};

// Função simples que lê dados complexos criptografados no localStorage
const getStorageData = async (name: string) => {
  const data = await Promise.resolve(window.localStorage.getItem(name));

  if (data) {
    const newData = await Promise.resolve(decrypt(data));
    return Promise.resolve(JSON.parse(newData));
  } else {
    return Promise.resolve('');
  }
};

// Função simples que lê strings simples criptografadas no localStorage
const getStorageString = async (name: string) => {
  const data = await Promise.resolve(window.localStorage.getItem(name));
  if (data) {
    return Promise.resolve(decrypt(data));
  } else {
    return Promise.resolve('');
  }
};

// Função simples de encriptação
const encrypt = (data: any) => {
  return btoa(data);
};

// Função simples de desencriptação
const decrypt = (data: any) => {
  return atob(data);
};
