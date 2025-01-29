import React, { useState } from "react"
import Cascading from "./components/filters/cascading"
import Table from "./components/tables/table"
import Chart from "./components/chart/chart";
import finalData from '../data.js'

export interface FilterType {
    type: string
    value: string
}
export interface ItemType {
    Month: string;
    Region: string;
    ProductCategory: string;
    SalesRep: string;
    SalesAmount: number;
}
export default function Dashboard() {
    const [filters, setFilters] = useState<FilterType[]>([])
    const [finalSelection, setFinalSelection] = useState<FilterType[]>([])
    
    const productCategories = Array.from(new Set(finalData.map(data => data.ProductCategory)));
    const region = Array.from(new Set(finalData.map(data => data.Region)));

    const toggleItem = (type: string, value: string) => {
        const index = filters.findIndex(item => item.type === type);
        let newItems = [...filters]
        if (index > -1) {
            newItems = newItems.filter(filterItem => filterItem.type != type)
        }
        setFilters([...newItems, { type, value }]);
    };

    function selectFinalRow(row: ItemType) {
        let selectedRow: FilterType[] = []
        for (const [key, value] of Object.entries(row)) {
            selectedRow = [...selectedRow, { type: key, value: value }]
        }

        setFinalSelection(selectedRow)
    }

    function filterData(filters: FilterType[]) {
        return finalData.filter(item => {
            return filters.every(filter => {
                // @ts-ignore
                return item[filter.type] === filter.value;
            });
        });
    }

    function uniqueRows(filterValues: ItemType[]) {
        const dataWithoutMonthAmount = filterValues.map(({ SalesAmount, Month, ...rest }) => rest)
        return Array.from(new Set(dataWithoutMonthAmount.map(a => JSON.stringify(a)))).map(e => JSON.parse(e));
    }

    return (
    <div className="p-2 h-screen">
        <div className="flex gap-4">
            <Cascading title="Product Category" items={productCategories} toggleItem={toggleItem} type='ProductCategory' />
            <Cascading title="Region" items={region} toggleItem={toggleItem} type='Region' />
        </div>
        <div className="flex pt-4 h-1/2">
            <Table data={uniqueRows(filterData(filters))} selectFinalRow={selectFinalRow} />
            <Chart data={finalSelection.length ? filterData(finalSelection) : []} />
        </div>

    </div>)
}