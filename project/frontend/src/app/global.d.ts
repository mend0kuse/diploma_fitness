import { AxiosError } from 'axios';

declare module '*.module.css' {
    const content: { [className: string]: string };
    export default content;
}

declare module '@tanstack/react-query' {
    interface Register {
        defaultError: AxiosError;
    }
}
