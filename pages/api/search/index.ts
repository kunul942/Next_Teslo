import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    message: string;
};

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    return res
        .status(400)
        .json({ message: 'Debe especificar el query de busqueda' });
}
