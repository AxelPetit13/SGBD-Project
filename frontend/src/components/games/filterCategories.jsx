import React, { useEffect, useState } from "react";
import SelectsMultiple from "../selectMultiple";

const FilterCategories = ({ data, categories, setCategories }) => {
  const [selectedCategories, setSelectedCategories] = useState(
    new Array(data.length).fill(false)
  );
  useEffect(() => {}, [categories]);
  return (
    <div>
      {data && (
        <SelectsMultiple
          data={data}
          selected={selectedCategories}
          setSelected={setSelectedCategories}
          items={categories}
          setItems={setCategories}
        />
      )}
    </div>
  );
};

export default FilterCategories;
