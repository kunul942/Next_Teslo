import { ProductModel } from '@/models';
import { db } from '.';
import { IProduct } from '@/interfaces';

//*obtener solo un producto por el slug
export const getProductBySlug = async (
    slug: string
): Promise<IProduct | null> => {
    await db.connect();
    const product = await ProductModel.findOne({ slug }).lean();

    await db.disconnect();

    if (!product) {
        return null;
    }

    return JSON.parse(JSON.stringify(product));
};

interface ProductSlug {
    slug: string;
}

//*Obtener todos los productos de el slug
export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
    db.connect();

    const slugs = await ProductModel.find().select('slug -_id').lean();

    db.disconnect();

    return slugs;
};

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
    term = term.toString().toLowerCase();

    await db.connect();
    const productByTerm = await ProductModel.find({
        $text: { $search: term },
    })
        .select('title images price inStock tags slug -_id')
        .lean();

    await db.disconnect();

    return productByTerm;
};

export const getAllProducts = async () => {
    db.connect();
    const allProducts = await ProductModel.find().lean();

    db.disconnect();

    return JSON.parse(JSON.stringify(allProducts));
};
