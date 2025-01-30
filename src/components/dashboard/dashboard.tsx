import React, { useEffect, useState } from "react"
import CascadingDropdown from "./filters/cascading"
import Table from "./tables/table"
import Chart from "./chart/chart";
import axios from "axios";
import dummyData from '../../data'
import { useSelector } from "react-redux";
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

const ENDPOINT = 'http://172.19.42.144:3001/api/cascading-dropdown?'

export default function Dashboard() {
    const [finalData, setFinalData] = useState(dummyData)
    const user = useSelector(state => state.user.value)

    console.log(user)

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
        // city: [{ label: 'Los Angeles', value: 'losangeles' }, { label: 'San Francisco', value: 'sanfrancisco' }]
    };

    const handleSelectionChange = (selectedValues: Record<string, string>) => {
        // console.log(selectedValues);
        setSelectedFilter(selectedValues);
    };

    useEffect(() => {
        async function getItems(selectedFilter: Record<string, string>) {
            let query = Object.entries(selectedFilter).map(([key, value]) => `${key}=${value}`).join('&')
            try {
                const response = await axios.get(ENDPOINT + query);
                console.log(response.data.data, ENDPOINT + query)
                setFinalData(response.data.data)
            } catch (error) {
                console.error("Error:", error);
            }
        }
        // getItems(selectedFilter)

    }, [selectedFilter])
    return (
        <div className="p-2">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold my-4">Dashboard</h1>
                <CascadingDropdown currentSelectedValues={selectedFilter} hierarchy={hierarchy} data={data} onSelectionChange={handleSelectionChange} />
            </div>
                <div className="pt-4 flex flex-col lg:flex-row gap-4 justify-center items-center mx-auto basis-full max-w-6xl">
                    <Table data={finalData.slice(0, 10)} selectFinalRow={selectFinalRow} />
                    <Chart data={finalData.slice(0, 10)} />
                </div>
        </div>)
}