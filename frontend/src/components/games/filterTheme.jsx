import React, { useState } from "react";
import SelectsMultiple from "../selectMultiple";

const FilterTheme = ({ data }) => {
  const [selectedThemes, setSelectedThemes] = useState(
    new Array(data.length).fill(false)
  );

  return (
    <div>
      {data && (
        <SelectsMultiple
          data={data}
          selected={selectedThemes}
          setSelected={setSelectedThemes}
        />
      )}
    </div>
  );
};

export default FilterTheme;
