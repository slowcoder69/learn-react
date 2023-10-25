import { useState } from "react";
import { Product } from "./types";
import { SearchBar } from "./SearchBar";
import { ProductTable } from "./ProductTable";

interface FilterableProductTableProps {
  data: Array<Product>;
}

export function FilterableProductTable({ data }: FilterableProductTableProps) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredData = data
    .filter((item) => {
      if (inStockOnly) {
        return item.stocked;
      }
      return true;
    })
    .filter((item) => {
      if (filterText) {
        return item.name.toLowerCase().includes(filterText.toLowerCase());
      }
      return true;
    });

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockChange={setInStockOnly}
      />
      <ProductTable data={filteredData} />
    </div>
  );
}
