import React, { useEffect, useState } from "react"
import CascadingDropdown from "./components/filters/cascading"
import Table from "./components/tables/table"
import Chart from "./components/chart/chart";
import axios from "axios";
import dummyData from '../data'
export interface FilterType {
    type: string
    value: string | number
}
export interface ItemType {
    Month: string;
    Region: string;
    ProductCategory: string;
    SalesRep: string;
    SalesAmount: number;
}

const ENDPOINT = 'https://dummyjson.com/products/search?'

export default function Dashboard() {
    const [finalData, setFinalData] = useState(dummyData)

    const [finalSelection, setFinalSelection] = useState<FilterType[]>([])
    const [selectedFilter, setSelectedFilter] = useState<Record<string, string>>({})

    function selectFinalRow(row: ItemType) {
        let selectedRow: FilterType[] = []
        for (const [key, value] of Object.entries(row)) {
            selectedRow = [...selectedRow, { type: key, value: value }]
        }

        setFinalSelection(selectedRow)
    }

    function uniqueRows(filterValues: ItemType[]) {
        const dataWithoutMonthAmount = filterValues.map(({ SalesAmount, Month, ...rest }) => rest)
        return Array.from(new Set(dataWithoutMonthAmount.map(a => JSON.stringify(a)))).map(e => JSON.parse(e));
    }
    const hierarchy = ['country', 'state', 'city'];

    const data = {
        country: [{ label: 'USA', value: 'usa' }, { label: 'Canada', value: 'canada' }],
        state: [{ label: 'California', value: 'california' }, { label: 'Texas', value: 'texas' }],
        city: [{ label: 'Los Angeles', value: 'losangeles' }, { label: 'San Francisco', value: 'sanfrancisco' }]
    };

    const handleSelectionChange = (selectedValues: Record<string, string>) => {
        console.log(selectedValues);
        setSelectedFilter(selectedValues);
    };

    useEffect(() => {
        async function getItems(selectedFilter: FilterType[]) {
            let query = Object.entries(selectedFilter).map(([key, value]) => `${key}=${value}`).join('&')
            try {
                const response = await axios.get(ENDPOINT + query);
                setFinalData(response.data.products)
            } catch (error) {
                console.error("Error:", error);
            }
        }

    }, [selectedFilter])
    return (
        <div className="p-2 h-screen">
            <div className="flex gap-4">
                <CascadingDropdown currentSelectedValues={selectedFilter} hierarchy={hierarchy} data={data} onSelectionChange={handleSelectionChange} />
            </div>
            <div className="pt-4 mx-auto h-1/2 max-w-7xl">
                <Chart data={finalData.slice(0, 10)} />
                <Table data={finalData.slice(0, 10)} selectFinalRow={selectFinalRow} />
            </div>
        </div>)
}