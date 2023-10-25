import { ProductCategoryRow } from "./ProductCategoryRow";
import { ProductRow } from "./ProductRow";
import { Product } from "./types";

interface ProductTableProps {
  data: Array<Product>;
}

export function ProductTable({ data }: ProductTableProps) {
  const rows: Array<JSX.Element> = [];
  let lastCategory = "";

  data.forEach((i) => {
    if (i.category !== lastCategory) {
      rows.push(<ProductCategoryRow key={i.category} title={i.category} />);
    }

    rows.push(<ProductRow key={i.name} item={i} />);

    lastCategory = i.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
