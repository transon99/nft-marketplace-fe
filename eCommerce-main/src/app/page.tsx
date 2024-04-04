import { getBaseCategoryAction } from '@/action/CategoryAction';
import ProductReel from '@/components/ProductReel';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { HeroSections } from '@/components/Hero';
import { SubcribeSection } from '@/components/SubcribeSection';

interface ProductReel {
  title: string;
  href?: string;
  products?: ProductResponse[] | undefined;
}

export default async function Home() {
  const baseCatListRes = await getBaseCategoryAction();

  const productReels: ProductReel[] = baseCatListRes.data.map(
    (category: Category) => {
      return {
        title: category.name,
        href: `category/${category.name}?id=${category.id}`,
        products: category.products,
      };
    }
  );
  // const productReels: ProductReel[] = [
  //   {
  //     title: 'Arts',
  //     // href: `category/${category.name}?id=${category.id}`,
  //     href: `category/Arts`,
  //     products: undefined,
  //   },
  // ];

  return (
    <>
      <MaxWidthWrapper>
        <HeroSections />
        {productReels.map((item) => (
          <ProductReel
            key={item.title}
            title={item.title}
            href={item.href}
            products={item.products}
          />
        ))}
        <SubcribeSection />
      </MaxWidthWrapper>
    </>
  );
}
