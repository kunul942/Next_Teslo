import { Typography } from '@mui/material';

import { useProducts } from '@/hooks';

import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';

const MenPage = () => {
    const { products, isLoading } = useProducts('/products?gender=men');

    return (
        <ShopLayout
            title={'Teslo-Shop - Men'}
            pageDescription={'Encuentra los mejores productos para hombres'}
        >
            <Typography variant='h1' component='h1'>
                Hombres
            </Typography>
            <Typography variant='h2' component='h2' sx={{ mb: 1 }}>
                Productos para hombres
            </Typography>

            {isLoading ? (
                <FullScreenLoading />
            ) : (
                <ProductList products={products} />
            )}
        </ShopLayout>
    );
};

export default MenPage;
