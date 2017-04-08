import {Map} from 'immutable';

import {
    TEST_ACTION,
    TEST_ASYNC_ACTION_START,
    TEST_ASYNC_ACTION_ERROR,
    TEST_ASYNC_ACTION_SUCCESS,
    UPDATE_WINDOW_SIZE,
} from 'actions/app';

import {
    GET_LENSES,
    GET_LENSES_SUCCESS,
    GET_LENSES_ERROR,
} from 'actions/lens';

const initialState = Map({
    counter: 0,
    asyncLoading: false,
    asyncError: null,
    asyncData: null,
    lenses: [],
    window: null,
    account: null,
});

const actionsMap = {
    [UPDATE_WINDOW_SIZE]: (state, action) => {
        return state.merge({
            window: action.size,
        });
    },

    [TEST_ACTION]: (state) => {
        const counter = state.get('counter') + 1;
        return state.merge({
            counter,
        });
    },

    // Lens action
    [GET_LENSES]: (state) => {
        return state.merge({
            asyncLoading: true,
        });
    },

    [GET_LENSES_SUCCESS]: (state, action) => {
        return state.merge({
            asyncLoading: false,
            lenses: action.data,
        })
    },

    [GET_LENSES_ERROR]: (state, action) => {
        return state.merge({
            asyncLoading: false,
            lenses: action.data,
        })
    },

    // Async action
    [TEST_ASYNC_ACTION_START]: (state) => {
        return state.merge({
            asyncLoading: true,
            asyncError: null,
        });
    },
    [TEST_ASYNC_ACTION_ERROR]: (state, action) => {
        return state.merge({
            asyncLoading: false,
            asyncError: action.data,
        });
    },
    [TEST_ASYNC_ACTION_SUCCESS]: (state, action) => {
        return state.merge({
            asyncLoading: false,
            asyncData: action.data,
        });
    },


};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}
