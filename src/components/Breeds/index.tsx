import React, { useState, useEffect, useRef } from "react";

import BreedsSearch from "./BreedsSearch";
import { breedsStyle, PAGE_SIZE, ROW_HEIGHT } from "./helper/config";
import { formatData } from "./helper/utils";

const Breeds = () => {
  const [data, setData] = useState<object[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const innerRef = useRef<HTMLDivElement>(null);
  /*
  const handleScroll: EventListener = (e: Event) => {
    const target = e.target as HTMLDivElement;
    if (target) {
      if (target.offsetHeight + target.scrollTop >= target.scrollHeight) {
        if (shouldLoadMore(currentPage)) {
          setCurrentPage(currentPage + 1);
        }
      }
    }
  };
  */
  const handleScroll: EventListener = () => {
    const div = innerRef.current;
    if (!!div) {
      if (div.scrollTop > (ROW_HEIGHT * currentPage * PAGE_SIZE - 2 * ROW_HEIGHT)) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const setListData = (breeds: object[]) => {
    const formatedData = formatData(breeds);
    setData((prevState) => [...prevState, ...formatedData]);
  };

  useEffect(() => {
    fetch(`/api/search?page=${currentPage}&limit=${PAGE_SIZE}`)
      .then((response) => response.json())
      .then((breeds) => {
        setListData(breeds);
      });
  }, [currentPage]);

  useEffect(() => {
    const div = innerRef.current;
    if (!!div) {
      div.addEventListener("scroll", handleScroll);
      return () => div.removeEventListener("scroll", handleScroll);
    }
  });

  return (
    <div className="breeds" style={breedsStyle} ref={innerRef}>
      <BreedsSearch
        data={data}
      />
    </div>
  );
};

export default Breeds;
