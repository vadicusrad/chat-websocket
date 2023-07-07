
export const designTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette for light mode
            primary: {
              light: '#757ce8',
              main: '#3f50b5',
              dark: '#002884',
              myMessageBackground: 'green',
              otherMessageBackground: 'red',
              
            },
          }
        : {
            // palette for dark mode
            secondary: {
              light: '#ff7961',
              main: '#f44336',
              dark: '#ba000d',
              myMessageBackground: 'lime',
              otherMessageBackground: 'coral',
            },
          }),
    },
  });