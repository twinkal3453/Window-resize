import React, { useReducer, useEffect } from "react";
import { jsonData, sortedValue } from "./jsonData";
import { concernSectionReducer } from "./dataFunction";

const initialState = [
  {
    perspective: "",
    type: "",
    subType: "",
    value: "",
    date: "",
    id: "",
  },
];

const Menu = () => {
  const [data, setData] = useReducer(concernSectionReducer, initialState);

  useEffect(() => {
    console.log("Line 20", sortedValue);
    const filtered = [];

    sortedValue
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .forEach((item) => {
        if (!filtered.includes(item.perspective)) {
          filtered.push(item.perspective);
        }
      });

    const modifiedData = [];

    filtered.forEach((item) => {
      const filteredOne = sortedValue.filter((ite) => ite.perspective === item);
      const objData = {
        perspective: item,
        children: [...filteredOne],
        date: "",
      };
      modifiedData.push(objData);
    });
    console.log("Line 29", modifiedData);
  }, []);

  return <div>Menu</div>;
};

export default Menu;
