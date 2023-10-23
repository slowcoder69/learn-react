import './App.css'
import { useState } from "react"

function ProductCategoryRow({ title }) {
    return (
        <tr>
            <td colSpan={2}>
                {title}
            </td>
        </tr>
    )
}

function ProductRow({ item }) {
    const name = item.stocked ? item.name : (
        <span style={{ color: "red" }}>{item.name}</span>
    )
    return (
        <tr>
            <td>{name}</td>
            <td>{item.price}</td>
        </tr>
    )
}

function ProductTable({ data }) {
    const rows = []
    let lastCategory = ""

    data.forEach(i => {
        if (i.category !== lastCategory) {
            rows.push(<ProductCategoryRow key={i.category} title={i.category} />)
        }

        rows.push(<ProductRow key={i.name} item={i} />)

        lastCategory = i.category
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockChange }) {
    return (
        <form>
            <div>
                <input value={filterText} type="text" placeholder="Search..." onChange={e => onFilterTextChange(e.target.value)} />
            </div>
            <label htmlFor="in-stock">
                <input id="in-stock" checked={inStockOnly} type="checkbox" onChange={e => onInStockChange(e.target.checked)} />
                {' '}
                Only show products in stock
            </label>
        </form>
    )
}

function FilterableProductTable({ data }) {
    const [filterText, setFilterText] = useState("")
    const [inStockOnly, setInStockOnly] = useState(false)

    const filteredData = data.filter(item => {
        if (inStockOnly) {
            return item.stocked
        }
        return true
    }).filter(item => {
        if (filterText) {
            return item.name.toLowerCase().includes(filterText.toLowerCase())
        }
        return true
    })

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
    )
}

function App() {
    return (
        <FilterableProductTable data={PRODUCTS} />
    )
}

const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

export default App