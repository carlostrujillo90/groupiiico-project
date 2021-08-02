import React from "react";
import { useState, useEffect } from "react";

import Item from "./Item";
import "../styles/ItemList.css";

function ItemList() {
  const [ItemListData, setItemListData] = useState(null);

  useEffect(() => {
    fetch("https://rma.swissgear.com/api/interview-endpoint")
      .then((res) => res.json())
      .then(
        (result) => {
          setItemListData(result.data);
          console.log(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  if (!ItemListData) {
    return <h1>Loading...</h1>;
  }

  return (
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
  );
}

export default ItemList;
