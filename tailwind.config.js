const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './src/app/**/*.{js,jsx,ts,tsx}',
        './src/app/**/**/*.{js,jsx,ts,tsx}',
        './src/components/**/*.{js,jsx,ts,tsx}',
    ],
    // darkMode: false,
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1500px',
            '3xl': '1780px',
        },
        extend: {
            fontFamily: {
                marker: ['Permanent Marker', 'cursive'],
                'element-hybrid': ['Montserrat', 'sans-serif'],
            },
            colors: {
                body: '#5A5A5A',
                heading: '#212121',
                input: '#1D1E1F',
                white: {
                    DEFAULT: '#fff',
                    coolpc: '#bfbfbf',
                },
                linen: '#FBF1E9',
                linenSecondary: '#ECE7E3',
                olive: '#3D9970',
                maroon: '#B03060',
                brown: '#C7844B',
                placeholder: '#707070',
                borderBottom: '#f7f7f7',
                facebook: '#4267B2',
                facebookHover: '#395fad',
                google: '#4285F4',
                googleHover: '#307bf9',

                // coolpc
                blue: {
                    coolpc: '#5bc8c4',
                    buttomStart: '#5486e9',
                    buttomEnd: '#043595',
                    coolpcLink: '#1694F5',
                },
                red: {
                    coolpc: '#fe1b1b',
                    coolpcHover: '#E61B1B',
                },
                pink: {
                    coolpc: '#fff3f3',
                },
                gray: {
                    50: '#FBFBFB',
                    100: '#F1F1F1',
                    150: '#F4F4F4',
                    200: '#F9F9F9',
                    300: '#E6E6E6',
                    350: '#E9ECEF',
                    400: '#999999',
                    500: '#D8D8D8',
                    600: '#3A3A3A',
                    700: '#292929',
                    800: '#707070',
                    900: '#343D48',
                    ...colors.gray,
                    coolpc: '#f8f8f8',
                    coolpcText: '#444444',
                    input: '#999999',
                    light: '#dddddd',
                    faq: '#4d5357',
                    border: '#cccccc',
                },
                black: {
                    DEFAULT: '#212529',
                    ...colors.black,
                    coolpc: '#1d1d1f',
                },
                yellow: {
                    coolpcLight: '#fffff1',
                    coolpc: '#ffea28',
                },
            },
            fontSize: {
                '10px': '.625rem',
            },
            spacing: {
                '430px': '430px',
                '450px': '450px',
                '500px': '500px',
                '64vh': '64vh',
            },
            minHeight: {
                '50px': '50px',
            },
            scale: {
                80: '0.8',
                85: '0.85',
                300: '3',
                400: '4',
            },
            animation: {
                shine: 'shine 1s',
                shineRTL: 'shineRTL 1s',
                dropdown: 'dropdown 0.3s',
                fadeInRight: 'fadeInRight 0.2s',
                fadeInLeft: 'fadeInLeft 0.2s',
                overlay: 'overlay 0.5s',
            },
            keyframes: {
                shine: {
                    '100%': { left: '125%' },
                },
                shineRTL: {
                    '100%': { right: '125%' },
                },
            },
            backgroundImage: {
                'app-pattern': "url('/assets/images/app-pattern.png')",
            },
        },
        boxShadow: {
            DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
            '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
            inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
            none: '0 0 #0000',
            cart: '0 3px 6px rgba(0,0,0,0.12)',
            product: '0 6px 12px rgba(0,0,0,.08)',
            listProduct: '0 2px 4px rgba(0,0,0,.08)',
            navigation: '0 3px 6px rgba(0, 0, 0, 0.16)',
            navigationReverse: '0 -3px 6px rgba(0, 0, 0, 0.16)',
            header: '0 2px 3px rgba(0, 0, 0, 0.08)',
            vendorCard: '1px 1px 4px rgba(0, 0, 0, 0.12)',
            vendorCardHover: '0 6px 18px rgba(0, 0, 0, 0.12)',
            subMenu: '1px 2px 3px rgba(0, 0, 0, 0.08)',
            bottomNavigation: '0 -2px 3px rgba(0, 0, 0, 0.06)',
            cookies: '0 -2px 3px rgba(0, 0, 0, 0.04)',
            avatar: '0px 15px 30px rgba(0, 0, 0, 0.16)',
            buttonRed: '0px 5px 13px 1px rgba(253,32,32,0.5)',
            buttonRedDark: '0px 10px 13px 1px rgba(181,15,25,0.75)',
            buttonDark: '0px 1px 5px 2px rgba(0,0,0,0.15)',
            buttonLight: '0px 1px 5px 2px rgba(255,255,255,0.5)',
            productCard: '0px 0px 20px #00000029',
            bottom: '0px 3px 6px rgb(0 0 0 / 0.1)',
            bottom5pxGray: '0 2px 5px -2px #8d8a8a',
            dropdown: '0px 0px 6px #00000029',
        },
        keyframes: {
            fadeInRight: {
                from: { transform: 'translateX(100%)' },
                to: { transform: 'translateX(0)' },
            },
            fadeInLeft: {
                from: { transform: 'translateX(-100%)' },
                to: { transform: 'translateX(0)' },
            },
            dropdown: {
                '0%': { transform: 'scaleY(0)' },
                '100%': { transform: 'scaleY(1)' },
            },
            overlay: {
                from: { opacity: 0 },
                to: { opacity: 1 },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ],
};
