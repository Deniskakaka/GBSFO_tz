import React, { useEffect, useMemo } from "react";
import { actionFetchIcons } from "./redux/actions";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { Pagination } from "./components/pagination";
import DraggableList from "./components/dragAndDrabList";
import "./main.scss";
import { Loader } from "./ui/loader";

function App() {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.listIcons);
  const currentList = useAppSelector((state) => state.currentIcons);
  const load = useAppSelector((state) => state.loader);
  const error = useAppSelector((state) => state.error);

  useEffect(() => {
    dispatch(actionFetchIcons() as any);
  }, []);

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

  return <div className="content">{renderContent}</div>;
}

export default App;
