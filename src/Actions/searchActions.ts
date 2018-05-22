import { Dispatch } from 'react-redux';
import { albumData, artistData, search } from '../Components/Request';
import {
  // GET_ALBUM_TRACKS,
  // GET_ARTIST_ALBUMS,
  GET_USER_DATA
} from './actionTypes';
import {
  AUTOCOMPLETE,
  GET_ALBUMS,
  GET_ARTISTS,
  GET_TRACKS,
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

// function artistAlbums(payload: [any]) {
//   return {
//     payload,
//     type: GET_ARTIST_ALBUMS
//   };
// }

// function albumTracks(payload: [any]) {
//   return {
//     payload,
//     type: GET_ALBUM_TRACKS
//   };
// }

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
        if (type === 'album') {
          result = response.data.albums.items.map((item: any) => {
            return item.name;
          });
        }
        if (type === 'artist') {
          result = response.data.artists.items.map((item: any) => {
            return item.name;
          });
        }
        if (type === 'track') {
          result = response.data.tracks.items.map((item: any) => {
            return item.name;
          });
        }
        dispatch(autocomplete({ result }));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getAlbumsAction(term: string) {
  return (dispatch: Dispatch) => {
    search(term, 'album').then(response => {
      const albums = response.data.albums.items;
      const options = {
        limit: response.data.albums.limit,
        offset: response.data.albums.offset,
        searchMode: 'albums',
        total: response.data.albums.total
      };
      dispatch(getAlbums(albums));
      dispatch(setOptions(options));
    });
  };
}

export function getAlbumTracksAction(id: string) {
  return (dispatch: Dispatch) => {
    console.log(id);
    albumData(id).then(response => {
      console.log(response);
      // const tracks = response.data.artists.items;

      // dispatch(setOptions(options));
    });
  };
}

export function getArtistAlbumsAction(id: string) {
  return (dispatch: Dispatch) => {
    artistData(id).then(response => {
      console.log(response);
      // const tracks = response.data.artists.items;

      // dispatch(setOptions(options));
    });
  };
}

// TODO
export function getArtistsAction(term: string) {
  return (dispatch: Dispatch) => {
    search(term, 'artist').then(response => {
      const artists = response.data.artists.items;
      const options = {
        limit: response.data.artists.limit,
        offset: response.data.artists.offset,
        searchMode: 'artists',
        total: response.data.artists.total
      };
      dispatch(getArtists(artists));
      dispatch(setOptions(options));
    });
  };
}

// TODO
export function getTracksAction(term: string) {
  return (dispatch: Dispatch) => {
    search(term, 'track').then(response => {
      const tracks = response.data.tracks.items;
      const options = {
        limit: response.data.tracks.limit,
        offset: response.data.tracks.offset,
        searchMode: 'tracks',
        total: response.data.tracks.total
      };
      dispatch(getTracks(tracks));
      dispatch(setOptions(options));
    });
  };
}

// export function getUserAction() {
//   return (dispatch: Dispatch) => {
//     userData().then(response => {
//       const result = {
//         image: response.data.images.url,
//         name: response.data.display_name,
//         url: response.data.href
//       };
//       dispatch(getUser(result));
//     });
//   };
// }
