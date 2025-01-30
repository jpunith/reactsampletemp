import React from "react"
import { ItemType } from "../../dashboard"
export default function Table({ data, selectFinalRow }: { data: ItemType[], selectFinalRow: (row: ItemType) => void }) {
  return (
      <table className="table">
        <thead>
          <tr>
            <th>Region</th>
            <th>ProductCategory</th>
            <th>SalesRep</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => <tr key={index} onClick={() => selectFinalRow(item)} className="hover cursor-pointer">
              <th>{item.Region}</th>
              <td>{item.ProductCategory}</td>
              <td>{item.SalesRep}</td>
            </tr>)
          }
        </tbody>
      </table>
  )
}