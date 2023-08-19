import React from "react";
import { Icon } from "../../type/types";
import { useAppDispatch } from "../../redux/hooks";
import { setCurrentIcon } from "../../redux/reducer";
import "./dragAndDropList.scss";

type Props = {
  list: Icon[];
};

const DraggableList: React.FC<Props> = ({ list }) => {
  const dispatch = useAppDispatch();

  const handleDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    index: number
  ) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLLIElement>,
    targetIndex: number
  ) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const updatedItems = [...list];
    const [movedItem] = updatedItems.splice(sourceIndex, 1);
    updatedItems.splice(targetIndex, 0, movedItem);
    dispatch(setCurrentIcon(updatedItems));
  };

  return (
    <ul className="draggable-list">
      {list.map((item, index) => (
        <li
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default DraggableList;
