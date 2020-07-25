import React, {useContext} from "react";
import Title from "./Title";
import {RoomContext} from "../context";

const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
}

export default function RoomsFilter({rooms}) {
    const context = useContext(RoomContext)
    const {
        handleChange, type, capacity, price, minPrice,
        maxPrice, minSize, maxSize, breakfast, pets
    } = context

    return (
        <section className="filter-container">
            <Title title="search rooms"/>
            <form action="" className="filter-form">
                {/*select type*/}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select name="type" id="type"
                            value={type}
                            className="form-control"
                            onChange={handleChange}>
                        <option value="all">all</option>
                        {getUnique(rooms, "type").map((type, idx) => {
                            return <option value={type} key={idx}>{type}</option>
                        })}
                    </select>
                </div>
                {/*end select type*/}
                {/*select capacity*/}
                <div className="form-group">
                    <label htmlFor="capacity">guests</label>
                    <select name="capacity" id="capacity"
                            value={capacity}
                            className="form-control"
                            onChange={handleChange}>
                        {getUnique(rooms, "capacity").map((capacity, idx) => {
                            return <option value={capacity} key={idx}>{capacity}</option>
                        })}
                    </select>
                </div>
                {/*end select capacity*/}
                {/*prices*/}
                <div className="form-group">
                    <label htmlFor="price">room price ${price}</label>
                    <input type="range" name="price" id="price"
                           min={minPrice} max={maxPrice} value={price}
                           onChange={handleChange} className="form-control"/>
                </div>
                {/*end prices*/}
                {/*size*/}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size"
                               value={minSize} onChange={handleChange} className="size-input"/>
                        <input type="number" name="maxSize" id="size"
                               value={maxSize} onChange={handleChange} className="size-input"/>
                    </div>
                </div>
                {/*end size*/}
                {/*extras*/}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast"
                               checked={breakfast} onChange={handleChange}/>
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets"
                               checked={pets} onChange={handleChange}/>
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
                {/*end extras*/}
            </form>
        </section>
    )
}
