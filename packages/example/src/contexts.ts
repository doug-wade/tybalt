import { createContext } from '@tybalt/core';

export const theme = createContext('theme', {
    primaryColor: 'rebeccapurple',
    secondaryColor: 'bisque',
    fontFamily: 'Consolas',
    linkColor: '#ffcc99',
    inverseFontColor: 'white',
    fontColor: 'black',
});
