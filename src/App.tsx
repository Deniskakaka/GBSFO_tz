import React, { useMemo } from "react";
import { actionFetchIcons } from "./redux/actions";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

import { Pagination } from "./components/pagination";
import DraggableList from "./components/dragAndDrabList";
import { Loader } from "./ui/loader";
import { AnyAction } from "@reduxjs/toolkit";
import { Button } from "./ui/button";

import "./main.scss";

function App() {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.listIcons);
  const currentList = useAppSelector((state) => state.currentIcons);
  const load = useAppSelector((state) => state.loader);
  const error = useAppSelector((state) => state.error);

  const FetchIcons = () => {
    dispatch(actionFetchIcons() as unknown as AnyAction);
  };

  const renderContent = useMemo(() => {
    if (error) {
      return <h1>Something went wrong, try again a little later.</h1>;
    } else {
      if (load) {
        return <Loader />;
      } else {
        return (
          <>
            <DraggableList list={currentList} />
            <Pagination list={list} itemsPerPage={20} />
          </>
        );
      }
    }
  }, [currentList, error, list, load]);

  return (
    <div className="content">
      {!list.length && <Button text="Load Icons" func={FetchIcons} />}
      {renderContent}
    </div>
  );
}

export default App;
