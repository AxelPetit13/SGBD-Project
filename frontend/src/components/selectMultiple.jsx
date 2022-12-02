import * as React from "react";
import PropTypes from "prop-types";
import MultiSelectUnstyled from "@mui/base/MultiSelectUnstyled";
import { selectUnstyledClasses } from "@mui/base/SelectUnstyled";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "rgb(26, 28, 33)",
};

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
  min-height: 2rem;
  min-width: 320px;
  padding: 0px;
  border-radius: 12px;
  text-align: left;
  line-height: 1;
  background: ${grey[900]};
  border: none;
  color: white;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${grey[800]};
  }

 

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${grey[900]};
  border: 1px solid ${grey[500]};
  color: ${grey[100]};
  box-shadow: 0px 4px 5px ${grey[500]};
  `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${grey[700]};
    color: ${grey[100]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${grey[700]};
    color: ${grey[100]};
  }


  &.${optionUnstyledClasses.disabled} {
    color: ${grey[700]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${grey[700]};
    color: ${grey[100]};
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1000;
`;

const CustomMultiSelect = React.forwardRef(function CustomMultiSelect(
  props,
  ref
) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <MultiSelectUnstyled {...props} ref={ref} slots={slots} />;
});

CustomMultiSelect.propTypes = {
  /**
   * The components used for each slot inside the MultiSelect.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
    popper: PropTypes.func,
    root: PropTypes.elementType,
  }),
};

export default function SelectsMultiple({
  data,
  selected,
  setSelected,
  items,
  setItems,
}) {
  return (
    <CustomMultiSelect>
      {data.map((item, idx) => (
        <div
          key={idx}
          onClick={() => {
            let newSelected = selected;
            newSelected[idx] = !selected[idx];
            setSelected(newSelected);
            let newItems = items;
            if (newSelected[idx]) {
              newItems.push(data[idx]);
            } else {
              let index = newItems.indexOf(data[idx]);
              if (index > -1) {
                newItems.splice(index, 1);
              }
            }

            setItems(items);
            console.log("items : ", items);
            console.log("selected : ", selected);
          }}
        >
          <StyledOption value={10 * idx}>{item.name}</StyledOption>
        </div>
      ))}
    </CustomMultiSelect>
  );
}
