import React, { useEffect, useState } from "react";
import SelectsMultiple from "../selectMultiple";

const FilterThemes = ({ data, themes, setThemes }) => {
  const [selectedThemes, setSelectedThemes] = useState(
    new Array(data.length).fill(false)
  );
  useEffect(() => {}, [themes]);
  return (
    <div>
      {data && (
        <SelectsMultiple
          data={data}
          selected={selectedThemes}
          setSelected={setSelectedThemes}
          items={themes}
          setItems={setThemes}
        />
      )}
    </div>
  );
};

export default FilterThemes;
