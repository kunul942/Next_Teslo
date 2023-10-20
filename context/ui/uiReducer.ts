import { UiState } from './';

type UiActionType = { type: '[UI] - toggleSideMenu' };

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
    switch (action.type) {
        case '[UI] - toggleSideMenu':
            return {
                ...state,
                isMenuSideOpen: !state.isMenuSideOpen,
            };

        default:
            return state;
    }
};
