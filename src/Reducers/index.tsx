import { combineReducers } from 'redux';
import * as ActionTypes from '../Actions/actionTypes';

const initialState = {
  autocomplete: [],
  searchOptions: {
    limit: 0,
    offset: 0,
    searchMode: 'album',
    total: 0
  },
  searchResults: {
    albums: [],
    artists: [],
    tracks: []
  },
  userData: {}
};

export interface IRootState {
  autocomplete: [any];
  searchOptions: {
    limit: 0;
    offset: 0;
    searchMode: string;
    total: 0;
  };
  searchResults: {
    albums: [any];
    artists: [any];
    tracks: [any];
  };
  userData: {};
}

// Reducer das ações relacionadas aos resultados das buscas
function searchReducer(
  state = initialState.searchResults,
  action: { payload: {}; type: string } | any
) {
  switch (action.type) {
    case ActionTypes.GET_ALBUMS:
      return Object.assign({}, state, {
        albums: action.payload
      });
    case ActionTypes.GET_ARTISTS:
      return Object.assign({}, state, {
        artists: action.payload
      });
    case ActionTypes.GET_TRACKS:
      return Object.assign({}, state, {
        tracks: action.payload
      });
    default:
      return state;
  }
}

// Reducer das ações relacionadas as opções de buscas
function searchOptionsReducer(
  state = initialState.searchOptions,
  action:
    | {
        payload: {
          limit: number;
          offset: number;
          searchMode: 'string';
          total: number;
        };
        type: string;
      }
    | any
) {
  switch (action.type) {
    case ActionTypes.SET_OPTIONS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

// Reducer das ações relacionadas a função autocomplete
function autocompleteReducer(
  state = initialState.autocomplete,
  action:
    | {
        payload: any;
        type: string;
      }
    | any
) {
  switch (action.type) {
    case ActionTypes.AUTOCOMPLETE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

// Reducer das ações relacionadas aos dados do usuário logado
function userDataReducer(
  state = initialState.userData,
  action:
    | {
        payload: any;
        type: string;
      }
    | any
) {
  switch (action.type) {
    case ActionTypes.GET_USER_DATA:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  autocompleteReducer,
  searchOptionsReducer,
  searchReducer,
  userDataReducer
});

export default rootReducer;