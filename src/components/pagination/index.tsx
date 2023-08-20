import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Icon } from "../../type/types";

import { useAppDispatch } from "../../redux/hooks";
import { setCurrentIcon } from "../../redux/reducer";
import { Button } from "../../ui/button";

import "./paginationStyle.scss";

type Props = {
  list: Icon[];
  itemsPerPage: number;
};

export const Pagination: React.FC<Props> = ({ list, itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const dispatch = useAppDispatch();

  const endOffset = itemOffset + itemsPerPage;
  const pageCount = Math.ceil(list.length / itemsPerPage);

  useEffect(() => {
    dispatch(setCurrentIcon(list.slice(itemOffset, endOffset)));
  }, [itemOffset, endOffset, list, dispatch]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % list.length;
    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<Button text="Next" />}
      onPageChange={handlePageClick}
      containerClassName="container_pagination"
      activeClassName="active"
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel={<Button text="Prev" />}
      renderOnZeroPageCount={null}
    />
  );
};
