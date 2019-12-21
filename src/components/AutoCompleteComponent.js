import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";



export default function AutoCompleteSearch(props) {
  return (
    <>
      <Autocomplete
        id="highlights-demo"
        style={{ width: 350,color:'pink' }}
        options={props.booksInventory}
        getOptionLabel={option => option.name}
        renderInput={params => (
          <TextField
            {...params}
            label="Search Books by Name or Author"
            fullWidth
            margin="normal"
          />
        )}
        renderOption={(option, { inputValue }) => {
          const matches = match(option.name, inputValue);
          const parts = parse(option.name, matches);

          return (
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          );
        }}
      />
    </>
  );
}
