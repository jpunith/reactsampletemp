import React, { useState } from "react";
import CascadingDropdown from "./filters/cascading";
import Table from "./tables/table";
import Chart from "./chart/chart";
import useItems from "./hooks/useItems";
import useOpenAi from "./socket/socket";
import Markdown from "react-markdown";

export interface FilterType {
  type: string;
  value: string | number;
}
export interface ItemType {
  Month: string;
  Region: string;
  ProductCategory: string;
  SalesRep: string;
  SalesAmount: number;
}

export default function Dashboard() {

  const { isLoading, onGenerateCode, searchText, updateSearchText } = useOpenAi()

  const [filters, setFilters] = useState<Record<string, string>>(
    {},
  );

  const [message, setMessage] = useState('')

  const { data: finalData } = useItems(filters)

  // const { newMessage, updateMessage, sendMessage } = useSocket()

  const hierarchy = ["country", "state", "city"];

  const data = {
    country: [
      { label: "USA", value: "usa" },
      { label: "Canada", value: "canada" },
    ],
    state: [
      { label: "California", value: "california" },
      { label: "Texas", value: "texas" },
    ],
    // city: [{ label: 'Los Angeles', value: 'losangeles' }, { label: 'San Francisco', value: 'sanfrancisco' }]
  };

  const handleSelectionChange = (selectedValues: Record<string, string>) => {
    setFilters(selectedValues);
  };


  return (
    <div className="p-2">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="text-4xl font-extrabold my-4">Dashboard</h1>
        <div className="flex gap-4">
          <input
            value={searchText}
            onChange={e => updateSearchText(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input input-bordered input-warning w-full max-w-xs"
          />
          <button disabled={isLoading} onClick={async () => setMessage(await onGenerateCode())} className={`btn ${isLoading && 'disabled'} btn-warning capitalize text-white`}>generate code</button>
        </div>
        {/* <CascadingDropdown
          currentSelectedValues={filters}
          hierarchy={hierarchy}
          data={data}
          onSelectionChange={handleSelectionChange}
        /> */}
        <div className="text-xl">
          <Markdown>
            {message}

          </Markdown>
        </div>
      </div>
      <div className="pt-4 flex flex-col lg:flex-row gap-4 justify-center items-center mx-auto basis-full max-w-6xl">
        {/* <Table data={finalData.slice(0, 10)} selectFinalRow={selectFinalRow} /> */}
        {/* <div className="card w-full bg-base-100 card-xs shadow-sm">
          <div className="card-body">
            <Chart data={finalData.slice(0, 10)} />
          </div>
        </div> */}
      </div>
    </div>
  );
}
