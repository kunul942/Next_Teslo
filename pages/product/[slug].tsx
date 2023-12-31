import React from 'react';
import {
    NextPage,
    GetServerSideProps,
    GetStaticProps,
    GetStaticPaths,
} from 'next';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';

import { ItemCounter } from '../../components/ui';
import { IProduct } from '@/interfaces';
import { dbProducts } from '@/database';

// import { initialData } from '@/database/products';
// const product = initialData.products[0];

interface Props {
    product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
    //*Una forma de hacerlo
    // const router = useRouter();
    // const { products: product, isLoading } = useProducts(
    //     `/products/${router.query.slug}`
    // );

    return (
        <ShopLayout title={product.title} pageDescription={product.description}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <ProductSlideshow images={product.images} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>
                        {/* Titles */}
                        <Typography variant='h1' component='h1'>
                            {product.title}
                        </Typography>

                        {/* Price */}
                        <Typography variant='subtitle1' component='h2'>
                            {`$${product.title}`}
                        </Typography>

                        {/* Cantidad */}
                        <Box sx={{ my: 2 }}>
                            <Typography variant='subtitle2'>
                                Cantidad
                            </Typography>
                            <ItemCounter />
                            <SizeSelector
                                // selectedSize={product.sizes[0]}
                                sizes={product.sizes}
                            />
                        </Box>
                        {/* Agregar al carrito */}
                        <Button color='secondary' className='circular-btn'>
                            Agregar al carrito
                        </Button>

                        {/* <Chip
                            label='No hay disponibles'
                            color='error'
                            variant='outlined'
                        /> */}

                        {/* Descripcion */}
                        <Box sx={{ mt: 3 }}>
                            <Typography variant='subtitle2'>
                                Descripcion
                            </Typography>
                            <Typography variant='body2'>
                                {product.description}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

//*No usar esto.... SSR
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//     const { slug } = params as { slug: string };

//     const productBySlug = await getProductBySlug(slug);

//     if (!productBySlug) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         };
//     }

//     return {
//         props: { product: productBySlug },
//     };
// };

//*getStaticPaths....
//*blocking

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const products = await dbProducts.getAllProductSlugs();
    const productBySlug = products.map((product) => product.slug);

    return {
        paths: productBySlug.map((product) => ({
            params: {
                slug: product,
            },
        })),
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug = '' } = params as { slug: string };

    const productBySlug = await dbProducts.getProductBySlug(slug);

    if (!productBySlug) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { product: productBySlug },
        revalidate: 86400,
    };
};

//*getStaticProps...
//* revalidar cada 24 horas

export default ProductPage;
