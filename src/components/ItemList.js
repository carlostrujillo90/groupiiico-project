import React from "react";
import { useState, useEffect } from "react";

import Item from "./Item";
import "../styles/ItemList.css";

function ItemList() {
  const [Search, setSearch] = useState("");
  const [SortBy, setSortBy] = useState("name");
  const [ScrollPage, setScrollPage] = useState();
  const [Direction, setDirection] = useState("asc");
  const [ItemListData, setItemListData] = useState([]);
  const [PaginationBtn, setPaginationBtn] = useState();

  useEffect(() => {
    setScrollPage(1);
    setPaginationBtn(true);
    fetch(
      "https://rma.swissgear.com/api/interview-endpoint?q=" +
        Search +
        "&sortBy=" +
        SortBy +
        "&direction=" +
        Direction +
        "&page=" +
        ScrollPage
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setItemListData(result.data);
          if (result.data.length < 16) {
            setPaginationBtn(false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, [Search, SortBy, Direction]);

  useEffect(() => {
    if (ScrollPage != 1) {
      fetch(
        "https://rma.swissgear.com/api/interview-endpoint?q=" +
          Search +
          "&sortBy=" +
          SortBy +
          "&direction=" +
          Direction +
          "&page=" +
          ScrollPage
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setItemListData([...ItemListData, ...result.data]);
            console.log(result.data);
            if (result.data.length < 16) {
              setPaginationBtn(false);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [ScrollPage]);

  if (!ItemListData) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="ItemWrapper">
        <input
          className="SearchBar"
          type="text"
          placeholder="Search"
          value={Search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <form className="SortBy">
          <label>
            Sort By:
            <select value={SortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </label>
        </form>
        <form className="Direction">
          <label>
            Direction:
            <select
              value={Direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              <option value="asc">Ascendent</option>
              <option value="desc">Descendent</option>
            </select>
          </label>
        </form>
      </div>
      <ul className="ItemList">
        {ItemListData.map((item) => (
          <li key={item.sku}>
            <Item
              url={item.url}
              alt={item.name}
              name={item.name}
              price={item.price}
              src={item.base_image}
              hover_image={item.hover_image}
            />
          </li>
        ))}
      </ul>
      {PaginationBtn ? (
        <div className="PaginationBtn">
          <button
            onClick={() => {
              setScrollPage(ScrollPage + 1);
            }}
          >
            +
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ItemList;
