import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

/**
 * Creates the search bar used on the home page.
 * @param {string} props - to get the useState for SearchInput and setSearchInput from the Products function where this function is called.
 */
function SearchBar({ searchInput, onSearchInput }) {

  /**
   * Function that handles changes on search input 
   * @param {string} e - input information
   */
  function onInputChange(e) {
    onSearchInput(e.currentTarget.value)
  }

  function onFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'end' }} onSubmit={onFormSubmit}>
      <TextField id="searchbar" label="Search" variant="filled" size="small" InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }} sx={{ marginBottom: '10px', background: 'white', borderRadius: '5px' }} onChange={onInputChange} value={searchInput} />
    </Box>
  )
};

export default SearchBar;