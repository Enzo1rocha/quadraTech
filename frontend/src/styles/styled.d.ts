import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            primaryHover: string;
            background: string;
            surface: string;
            text: string;
            textSecondary: string;
            success: string;
            danger: string;
            border: string;
        };
        breakpoints: {
            tablet: string;
            desktop: string;
        };
        borderRadius: string;

    }
}