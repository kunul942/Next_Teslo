import type { NextApiRequest, NextApiResponse } from 'next';
import { db, SHOP_CONSTANTS } from '@/database';
import { ProductModel } from '@/models';

import { IProduct } from '@/interfaces';

type Data = { message: string } | IProduct[];

export default async function (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case 'GET':
            return getProducts(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { gender = 'all' } = req.query;

    let conditionals = {};

    if (
        gender !== 'all' &&
        SHOP_CONSTANTS.validGenders.includes(gender.toString())
    ) {
        conditionals = { gender };
    }

    await db.connect();

    const products = await ProductModel.find(conditionals)
        .select('title images price inStock slug -_id') //*Seleccionar specific data
        .lean();

    await db.disconnect();

    return res.status(200).json(products);
};
