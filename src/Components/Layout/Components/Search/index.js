import React, { useEffect, useRef, useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Wrapper as PopperWrapper } from "../../../Popper";
import AccountItem from "../../../AccountItem";
import { SearchIcon } from "../../../Icons";
import { useDebounce } from "../../../../hooks";
import * as searchService from "../../../../apiServices/searchServices";
import styles from "./Search.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const debounce = useDebounce(searchValue, 500);

  const inputRef = useRef();

  useEffect(() => {
    if (!debounce.trim()) {
      setSearchResults([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      const result = await searchService.search(debounce);

      setSearchResults(result);
      setLoading(false);
    };

    fetchApi();
  }, [debounce]);

  const handleClear = () => {
    setSearchValue("");
    setSearchResults([]);
    inputRef.current.focus();
  };

  const handleHiddenResults = () => {
    setShowResults(false);
  };

  const handleChangeInput = (e) => {
    const _searchValue = e.target.value;
    if (!_searchValue.startsWith(" ")) {
      setSearchValue(_searchValue);
    }
  };

  return (
    <div>
      <HeadlessTippy
        interactive
        visible={showResults && searchResults.length > 0}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx("search-title")}>Account</h4>
              {searchResults.map((result) => {
                return <AccountItem key={result.id} data={result} />;
              })}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHiddenResults}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            type="text"
            placeholder="Search accounts and videos"
            spellCheck={false}
            onChange={handleChangeInput}
            onFocus={() => setShowResults(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx("clear")} onClick={handleClear}>
              {/* Clear */}
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {/* Loading */}
          {loading && (
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
          )}

          <button
            className={cx("search-btn")}
            onMouseDown={(e) => e.preventDefault()}
          >
            {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
};

export default Search;
