import { IProduct } from '@/interfaces';
import useSWR, { SWRConfiguration } from 'swr';

//*Se puede utilizar este fetcher y mandarlo despues de el url
// const fetcher = (...args: [key: string]) =>
//     fetch(...args).then((res) => res.json());

//*Puedo definir el fetcher en el _app.tsx

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
    // const { data, error } = useSWR<IProduct[]>(`/api/${url}`, fetcher, config);
    const { data, error } = useSWR<IProduct[]>(`/api/${url}`, config);

    return {
        products: data || [],
        isLoading: !data && !error,
        isError: error,
    };
};
