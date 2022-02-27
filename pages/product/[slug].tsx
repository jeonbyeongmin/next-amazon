import { useRouter } from "next/router";
import data from "../../utils/data";

export default function Detail() {
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((product) => product.slug === slug);

  if (!product) return <div>Product Not Found</div>;
  return <h1>{product.name}</h1>;
}
