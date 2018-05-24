import { Dispatch } from 'react-redux';
import { search } from '../Components/Request';
import { GET_FAVORITE_IDS } from './actionTypes';

import {
  AUTOCOMPLETE,
  GET_ALBUM_TRACKS,
  GET_ALBUMS,
  GET_ARTIST_ALBUMS,
  GET_ARTISTS,
  GET_FAVORITE_ALBUMS,
  GET_FAVORITE_ARTISTS,
  GET_FAVORITE_TRACKS,
  GET_TRACKS,
  GET_USER_DATA,
  SET_OPTIONS
} from './actionTypes';

function autocomplete(payload: { result: [any] }) {
  return {
    payload,
    type: AUTOCOMPLETE
  };
}

function getAlbums(payload: [any]) {
  return {
    payload,
    type: GET_ALBUMS
  };
}

function getArtists(payload: [any]) {
  return {
    payload,
    type: GET_ARTISTS
  };
}

function getTracks(payload: [any]) {
  return {
    payload,
    type: GET_TRACKS
  };
}

export function getFavoriteTracks(payload: any) {
  return {
    payload,
    type: GET_FAVORITE_TRACKS
  };
}
export function getFavoriteAlbums(payload: any) {
  return {
    payload,
    type: GET_FAVORITE_ALBUMS
  };
}
export function getFavoriteArtists(payload: any) {
  return {
    payload,
    type: GET_FAVORITE_ARTISTS
  };
}

export function getFavoriteIds(payload: any) {
  return {
    payload,
    type: GET_FAVORITE_IDS
  };
}

export function artistAlbums(payload: any) {
  return {
    payload,
    type: GET_ARTIST_ALBUMS
  };
}

export function albumTracks(payload: any) {
  return {
    payload,
    type: GET_ALBUM_TRACKS
  };
}

export function getUser(payload: { name: string; image: string; url: string }) {
  return {
    payload,
    type: GET_USER_DATA
  };
}

function setOptions(payload: any) {
  return { payload, type: SET_OPTIONS };
}
export function autocompleteAction(term: string, type: string) {
  return (dispatch: Dispatch) => {
    search(term, type, true)
      .then(response => {
        let result = [];
        if (response && response.data) {
          result = response.data;
        }
        if (type === 'Album') {
          result = result.albums.items.map((item: any) => {
            return item.name;
          });

          result = result.filter((item: any, i: number) => {
            if (i < 5) {
              return item;
            } else {
              return;
            }
          });
        }
        if (type === 'Artist') {
          result = result.artists.items.map((item: any) => {
            return item.name;
          });

          result = result.filter((item: any, i: number) => {
            if (i < 5) {
              return item;
            } else {
              return;
            }
          });
        }
        if (type === 'Track') {
          result = result.tracks.items.map((item: any) => {
            return item.name;
          });
          result = result.filter((item: any, i: number) => {
            if (i < 5) {
              return item;
            } else {
              return;
            }
          });
        }
        dispatch(autocomplete(result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getAlbumsAction(term: string) {
  return (dispatch: Dispatch) => {
    search(term, 'album')
      .then(response => {
        const albums = response.data.albums.items;
        const options = {
          limit: response.data.albums.limit,
          offset: response.data.albums.offset,
          searchMode: 'albums',
          total: response.data.albums.total
        };
        dispatch(getAlbums(albums));
        dispatch(setOptions(options));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getArtistsAction(term: string) {
  return (dispatch: Dispatch) => {
    search(term, 'artist')
      .then(response => {
        const artists = response.data.artists.items;
        const options = {
          limit: response.data.artists.limit,
          offset: response.data.artists.offset,
          searchMode: 'artists',
          total: response.data.artists.total
        };
        dispatch(getArtists(artists));
        dispatch(setOptions(options));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getTracksAction(term: string) {
  return (dispatch: Dispatch) => {
    search(term, 'track')
      .then(response => {
        const tracks = response.data.tracks.items;
        const options = {
          limit: response.data.tracks.limit,
          offset: response.data.tracks.offset,
          searchMode: 'tracks',
          total: response.data.tracks.total
        };
        dispatch(getTracks(tracks));
        dispatch(setOptions(options));
      })
      .catch(error => {
        throw error;
      });
  };
}
