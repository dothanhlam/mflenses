export const GET_LENSES = 'LENS: GET_LENSES';
export const GET_LENSES_SUCCESS = 'LENS: GET_LENSES_SUCCESS';
export const GET_LENSES_ERROR = 'LENS: GET_LENSES_ERROR';

export function getLenses(params) {
    return {
        type: GET_LENSES,
        params
    }
}