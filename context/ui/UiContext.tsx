import { createContext } from 'react';

interface ContextProps {
    isMenuSideOpen: boolean;

    //*Methods
    toggleSideMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);
