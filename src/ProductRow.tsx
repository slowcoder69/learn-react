import { Product } from "./types";

interface ProductRowProps {
  item: Product;
}

export function ProductRow({ item }: ProductRowProps) {
  const name = item.stocked ? (
    item.name
  ) : (
    <span style={{ color: "red" }}>{item.name}</span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{item.price}</td>
    </tr>
  );
}
