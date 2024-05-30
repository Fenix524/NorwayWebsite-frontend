import { ChoiceField } from "../FieldsFolder/ChoiceField/ChoiceField";
import { SearchField } from "../FieldsFolder/SearchField/SearchField";
import css from "./FilterBar.module.css";

const FilterBar = (searchParams, setSearchParams) => {
  // const [searchParams, setSearchParams] = useSearchParams();

  const options = [
    { label: "За назвою a-z", value: "1" },
    { label: "За назвою z-a", value: "-1" },
    { label: "Нічого", value: "0" },
  ];

  const handleSearchChange = (value) => {
    try {
      setSearchParams({ ...Object.fromEntries(searchParams), search: value });
    } catch (error) {
      return;
    }
  };

  const handleSortChange = (value) => {
    try {
      setSearchParams({ ...Object.fromEntries(searchParams), order: value });
    } catch (error) {
      return;
    }
  };

  return (
    <div className={css.filterBox}>
      <div className={css.searchBox}>
        <SearchField onChange={handleSearchChange} />
      </div>
      <div className={css.selectBox}>
        <ChoiceField options={options} onChange={handleSortChange} />
      </div>
    </div>
  );
};

export default FilterBar;
