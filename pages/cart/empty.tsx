import NextLink from 'next/link';

import { Box, Link, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';

const EmptyPage = () => {
    return (
        <ShopLayout
            title='Carrito Vacio'
            pageDescription='No hay artículos en el carrito de compras'
        >
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                border='-moz-initial'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
                <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography>Su carrito está vacio</Typography>
                    <Link
                        typography='h4'
                        color='secondary'
                        component={NextLink}
                        href='/'
                        passHref
                    >
                        Regresar
                    </Link>
                </Box>
            </Box>
        </ShopLayout>
    );
};

export default EmptyPage;
