import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import {
    AppBar,
    Toolbar,
    Link,
    Typography,
    Box,
    Button,
    IconButton,
    Badge,
    Input,
    InputAdornment,
} from '@mui/material';

import {
    ClearOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from '@mui/icons-material';

import { UiContext } from '@/context';

export const Navbar = () => {
    const { pathname, push } = useRouter();
    const { toggleSideMenu } = useContext(UiContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setisSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        push(`/search/${searchTerm}`);
    };

    return (
        <AppBar>
            <Toolbar>
                <Link
                    display='flex'
                    alignItems='center'
                    component={NextLink}
                    href='/'
                    passHref
                >
                    <Typography variant='h6'>Teslo |</Typography>
                    <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                </Link>

                <Box flex={1} />

                <Box
                    sx={{
                        display: isSearchVisible
                            ? 'none'
                            : { xs: 'none', sm: 'block' },
                    }}
                    className='fadeIn'
                >
                    <Link
                        component={NextLink}
                        href='/category/men'
                        passHref
                        prefetch={false}
                    >
                        <Button
                            color={
                                pathname === '/category/men'
                                    ? 'primary'
                                    : 'info'
                            }
                        >
                            Hombres
                        </Button>
                    </Link>
                    <Link
                        component={NextLink}
                        href='/category/women'
                        passHref
                        prefetch={false}
                    >
                        <Button
                            color={
                                pathname === '/category/women'
                                    ? 'primary'
                                    : 'info'
                            }
                        >
                            Mujeres
                        </Button>
                    </Link>
                    <Link
                        component={NextLink}
                        href='/category/kid'
                        passHref
                        prefetch={false}
                    >
                        <Button
                            color={
                                pathname === '/category/kid'
                                    ? 'primary'
                                    : 'info'
                            }
                        >
                            Niños
                        </Button>
                    </Link>
                </Box>
                <Box flex={1} />

                {/* Desktop */}
                {isSearchVisible ? (
                    <Input
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                        className='fadeIn'
                        autoFocus
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyUp={(e) =>
                            e.key === 'Enter' ? onSearchTerm() : null
                        }
                        type='text'
                        placeholder='Buscar...'
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    onClick={() => setisSearchVisible(false)}
                                >
                                    <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                ) : (
                    <IconButton
                        className='fadeIn'
                        onClick={() => setisSearchVisible(true)}
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                    >
                        <SearchOutlined />
                    </IconButton>
                )}

                {/* Mobile */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={toggleSideMenu}
                >
                    <SearchOutlined />
                </IconButton>

                <Link component={NextLink} href='/cart' passHref>
                    <IconButton>
                        <Badge badgeContent={2} color='secondary'>
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>
                <Button onClick={toggleSideMenu}>Menu</Button>
            </Toolbar>
        </AppBar>
    );
};
