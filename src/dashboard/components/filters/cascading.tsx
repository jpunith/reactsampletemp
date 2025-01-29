import React from "react"

export default function Cascading({ title, items, toggleItem, type }: { title: string, items: string[], type: string, toggleItem: (type: string, value: string) => void }) {
    return <>
        <label className="form-control w-full max-w-sm">
            <div className="label">
                <span className="label-text font-bold">{title}</span>
            </div>
            <select onChange={e => toggleItem(type, e.target.value)} className="select select-primary select-bordered">
                <option disabled selected>Pick one</option>
                {
                    items.map((item, index) => <option key={index}>{item}</option>)
                }
            </select>
        </label>
    </>

}