import { FC, useReducer } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
    isMenuSideOpen: boolean;
}

export interface ChildrenProp {
    children: JSX.Element | JSX.Element[];
}

const UI_INITIAL_STATE: UiState = {
    isMenuSideOpen: false,
};

export const UiProvider: FC<ChildrenProp> = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - toggleSideMenu' });
    };

    return (
        <UiContext.Provider
            value={{
                ...state,

                //*Methods
                toggleSideMenu,
            }}
        >
            {children}
        </UiContext.Provider>
    );
};
