import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { ProductModel } from '@/models';

import { IProduct } from '@/interfaces';

type Data = { message: string } | IProduct;

export default async function (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case 'GET':
            return getProductBySlug(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}

const getProductBySlug = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    const { slug } = req.query;

    db.connect();

    const getProductBySlug = await ProductModel.findOne({ slug }).lean();

    db.disconnect();

    if (!getProductBySlug) {
        return res.status(400).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(getProductBySlug);
};
