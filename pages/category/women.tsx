import { Typography } from '@mui/material';

import { useProducts } from '@/hooks';

import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';

const WomenPage = () => {
    const { products, isLoading } = useProducts('/products?gender=women');
    return (
        <ShopLayout
            title={'Teslo-Shop - Women'}
            pageDescription={'Encuentra los mejores productos para mujeres'}
        >
            <Typography variant='h1' component='h1'>
                Mujeres
            </Typography>
            <Typography variant='h2' component='h2' sx={{ mb: 1 }}>
                Productos para mujeres
            </Typography>

            {isLoading ? (
                <FullScreenLoading />
            ) : (
                <ProductList products={products} />
            )}
        </ShopLayout>
    );
};

export default WomenPage;
