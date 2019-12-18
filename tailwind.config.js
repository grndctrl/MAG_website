module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      fw: '1600px',
    },
    lineHeight: {
      none: 1,
      strict: 1.15,
      tight: 1.25,
      normal: 1.425,
      relaxed: 1.75,
      loose: 2,
    },
    fontFamily: {
      'sans': ['GT Pressura', 'sans-serif'],
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',    //16
      'lg': '1.3125rem', //21
      'xl': '1.75rem',   //28
      '2xl': '2.125rem', //34
      '3xl': '2.5rem',   //40
      '4xl': '3.75rem',  //60
      '5xl': '5rem',     //80
      '6xl': '8.75rem'   //140
    },
    colors: {
      'black': '#1F2A20',
      'green-black': '#1F2A20',
      'white': '#ffffff',
      'green-dark': '#091E0C',
      'green-light': '#E8F1ED',
      'green-lightest': '#F1F5F3',
      'grey': '#CCD9DA',
      'red': '#B34623',
      'transparent': 'transparent'
    },
    extend: {
      minHeight: {
        'screen-width': '100vw'
      },
      spacing: {
        '1/24': '4.166667%',
        '1/12': '8.33333%',
        '2/12': '16.66667%',
        '3/12': '25%',
        '4/12': '33.33333%',
        '5/12': '41.66667%',
        '6/12': '50%',
        '7/12': '58.33333%',
        '8/12': '66.66667%',
        '9/12': '75%',
        '10/12': '83.33333%',
        '11/12': '91.66667%',
        'full': '100%'
      }
    }
  },
  variants: {},
  plugins: []
}

