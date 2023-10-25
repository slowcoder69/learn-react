interface ProductCategoryRowProps {
  title: string;
}

export function ProductCategoryRow({ title }: ProductCategoryRowProps) {
  return (
    <tr>
      <td colSpan={2}>{title}</td>
    </tr>
  );
}
