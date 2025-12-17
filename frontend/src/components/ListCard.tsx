import { useState } from "react";
import type { ListItemsType } from "./ListItem";
import { Ellipsis, SquarePen, Trash } from "lucide-react";

interface ListCardProps {
  item: ListItemsType;
  index: number;
  handleComplete: (index: number) => void; // function type
  handleEdit: (index: number) => void;
  handleDelete: (index: number) => void;
}

function ListCard({ item, index, handleComplete, handleEdit, handleDelete }: ListCardProps) {
  const [dropDown, setDropDown] = useState(false);
  return (
    <div className="flex justify-between bg-white border border-gray-200 rounded-lg hover:shadow-md">
      {/* div1: Checkbox + List Details */}
      <div className="flex items-center p-5 gap-5 ">
        <input className="h-4 w-4 cursor-pointer" type="checkbox" checked = {item.completed} onChange={() => handleComplete(index)} />
        <div className= {`space-y-2 ${item.completed ? "line-through text-gray-500" : "none"}`} >
          <h2 className="text-lg  font-bold">{item.itemName} </h2>
          <p className="text-sm text-gray-500">Qty: {item.quantity} </p>
        </div>
      </div>
      {/* div2: Edit/Delete List */}
      <div className="relative flex flex-col justify-center items-end p-4 gap-3">
        <button
          className="cursor-pointer"
          onClick={() => setDropDown(!dropDown)}>
          {dropDown && (
            <ul className="absolute right-0 top-10 w-30 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <li onClick={() => handleEdit(index)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer">
                <SquarePen className="h-4 w-4" /> Edit
              </li>
              <li onClick={() =>handleDelete(index)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer">
                <Trash className="h-4 w-4" /> Delete
              </li>
            </ul>
          )}
          <Ellipsis />
        </button>
        <p className="text-gray-800 font-medium">Rs {item.price}/-</p>
      </div>
    </div>
  );
}

export default ListCard;
