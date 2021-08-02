import React from "react";

import "../styles/Item.css";

function Item(props) {
  return (
    <div className="Item">
      <a href={props.url}>
        <img
          src={props.src}
          alt={props.alt}
          onMouseOut={(e) => (e.currentTarget.src = props.src)}
          onMouseEnter={(e) => (e.currentTarget.src = props.hover_image)}
        />
      </a>
      <a href={props.url}>{props.name}</a>
      <span>${props.price}</span>
    </div>
  );
}

export default Item;
