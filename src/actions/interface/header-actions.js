/**
 * @file header-actions.js
 * Actions for the app's header/title bar.
 *
 */
export const RESET_MENU_EXPAND = 'RESET_MENU_EXPAND';
export const TOGGLE_MENU = 'TOGGLE_MENU';

export const resetMenuExpand = () => {

    return {
        type: RESET_MENU_EXPAND,
    };
};

export const toggleMenu = () => {

    return {

        type: TOGGLE_MENU,
    };
};

