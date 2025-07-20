import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilterDramaTwoToneIcon from "@mui/icons-material/FilterDramaTwoTone";

const Navbar = ({ onSearch }) => {
  const [searchCity, setSearchCity] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      onSearch(searchCity);
    }
  };

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-3 w-full bg-gray-800 text-white gap-2 sm:gap-4 shadow-md rounded-b-xl">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <FilterDramaTwoToneIcon className="text-2xl text-blue-300" />
        <p className="text-xl font-semibold">SkyCast</p>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto"
      >
        <TextField
          variant="outlined"
          placeholder="Search city e.g. 'London'"
          size="small"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="bg-white rounded-full w-full sm:w-[18rem]"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          className="!rounded-md !bg-gray-600 hover:!bg-gray-700 text-white"
        >
          Search
        </Button>
      </form>
    </nav>
  );
};

export default Navbar;
