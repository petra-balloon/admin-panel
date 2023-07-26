import * as types from './types'

export const loadingState = (payload) => {
    return {
        type: types.TRIGGER_LOADER,
        value: payload
    }
}