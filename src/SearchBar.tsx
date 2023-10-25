interface SearchBarProps {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (value: string) => void;
  onInStockChange: (value: boolean) => void;
}

export function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockChange,
}: SearchBarProps) {
  const handleFilterTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    onFilterTextChange(e.target.value);
  };

  const handleInStockChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    onInStockChange(e.target.checked);
  };

  return (
    <form>
      <div>
        <input
          value={filterText}
          type="text"
          placeholder="Search..."
          onChange={handleFilterTextChange}
        />
      </div>
      <label htmlFor="in-stock">
        <input
          id="in-stock"
          checked={inStockOnly}
          type="checkbox"
          onChange={handleInStockChange}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}
