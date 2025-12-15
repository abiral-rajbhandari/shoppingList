import { Plus } from "lucide-react";
import { useState } from "react";
import InputForm from "./InputForm";
import ListCard from "./ListCard";

export interface ListItemsType {
  itemName: string;
  quantity: string;
  price: number;
}

function ListItem() {
  const [modal, setModal] = useState(false);
  const [listItems, setListItems] = useState<ListItemsType[]>([]);

  const addListItems = (newItems: ListItemsType) => {
    setListItems((prevItems) => {
      return [...prevItems, newItems];
    });
  };

  return (
    <>
      {/* Form Modal */}
      {modal && <InputForm setModal={setModal} onSubmit={addListItems} />}
      <div className="space-y-5 ">
        {/* HEADER */}
        <div className="flex justify-between items-center mt-6 p-6 rounded-lg shadow-sm bg-white border-gray-300">
          <p className="text-xl font-bold">
            {" "}
            Total Cost: Rs 5000 /-
          </p>
          <button
            onClick={() => setModal(!modal)}
            className="flex justify-center items-center gap-2 py-2 px-4 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer "
          >
            <Plus /> Add New List
          </button>
        </div>

        <div className="space-y-5 p-6 bg-white rounded-lg shadow-sm ">
          {/* TABS */}
          <div className="space-x-2">
            <button className="py-2 px-4 text-sm rounded-lg border bg-blue-600 text-white cursor-pointer ">
              All List (0)
            </button>
            <button className="py-2 px-4 text-sm rounded-lg border bg-white cursor-pointer">
              Pending (0)
            </button>
            <button className="py-2 px-4 text-sm rounded-lg border bg-white cursor-pointer">
              Completed (0)
            </button>
          </div>

          {/* LISTS */}
          <div className="min-h-[calc(100vh-350px)]  ">
            {listItems.length === 0 ? (
              <div className="min-h-[calc(100vh-350px)] text-lg text-gray-400 flex justify-center items-center ">
                List is currenty empty
              </div>
            ) : (
              <div className="space-y-5">
                {listItems.map((items, index: number) => (
                  <ListCard key={index} items={items} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListItem;
