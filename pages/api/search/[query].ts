import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { ProductModel } from '@/models';

type Data = { message: string } | IProduct[];

export default async function (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case 'GET':
            return searchProducts(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' });
    }
}
const searchProducts = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    let { query = '' } = req.query;

    if (query.length === 0) {
        return res.status(400).json({
            message: 'Se debe de especificar el query de busqueda',
        });
    }

    //*Cambiar la query a string y a todo minuscula
    query = query.toString().toLowerCase();

    await db.connect();
    const getProductsByTitleAndTag = await ProductModel.find({
        //*Buscar por el index de el model
        $text: { $search: query },
    })
        .select('title images price inStock tags slug -_id')
        .lean();

    await db.disconnect();

    return res.status(200).json(getProductsByTitleAndTag);
};
