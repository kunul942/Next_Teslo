import { GetServerSideProps } from 'next';

import { Box, Typography } from '@mui/material';

import { dbProducts } from '@/database';

import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products/';
import { IProduct } from '@/interfaces';

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

export default function SearchPage({ products, foundProducts, query }: Props) {
    return (
        <ShopLayout
            title={'Teslo-Shop - Search'}
            pageDescription={'Encuentra los mejores productos de Teslo'}
        >
            <Typography variant='h1' component={'h1'}>
                Buscar producto
            </Typography>
            {foundProducts ? (
                <Typography
                    variant='h2'
                    sx={{ mb: 2 }}
                    textTransform='capitalize'
                >
                    Termino: {query}
                </Typography>
            ) : (
                <Box sx={{ mb: 2 }} display='flex'>
                    <Typography variant='h2' sx={{ mb: 1 }}>
                        No encontramos ningún producto
                    </Typography>
                    <Typography
                        variant='h2'
                        sx={{ ml: 1 }}
                        color='secondary'
                        textTransform='capitalize'
                    >
                        {query}
                    </Typography>
                </Box>
            )}

            <ProductList products={products} />
        </ShopLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = '' } = params as { query: string };

    if (query.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            },
        };
    }

    //*Persona busca algo y no hay productos
    let products = await dbProducts.getProductsByTerm(query);
    const foundProducts = products.length > 0;

    //TODO: retornar otros productos
    if (!foundProducts) {
        products = await dbProducts.getAllProducts();
    }

    return {
        props: { products, foundProducts, query },
    };
};
