import { Plus } from "lucide-react";
import { useState } from "react";
import InputForm from "./InputForm";
import ListCard from "./ListCard";

export interface ListItemsType {
  itemName: string;
  quantity: string;
  price: number;
  completed: boolean;
}

function ListItem() {
  const [modal, setModal] = useState(false);
  const [inputValue, setInputValue] = useState<ListItemsType>({ itemName: "", quantity: "", price: 0, completed: false, });
  const [listItems, setListItems] = useState<ListItemsType[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Function: handleSubmit
  const handleSubmit = (newItems: ListItemsType) => {
    if (editIndex !== null) {
         setListItems((prevItems) => {
          return prevItems.map((item, index) => 
            index == editIndex ? { ...inputValue, itemName: inputValue.itemName.trim(), quantity: inputValue.quantity.trim() } : item
          )
        });
        setEditIndex(null);
    }else {
      setListItems((prevItems) => {
        return [...prevItems, newItems];
      });
    };
    setInputValue({ itemName: "", quantity: "", price: 0, completed: false, });
    }

  // Function: handleComplete
  const handleComplete = (indexToComplete: number) => {
      setListItems((prevItems) => {
       return prevItems.map((item, index) =>
          index == indexToComplete ? { ...item, completed: !item.completed } : item
        )
      })
  }

  // Function: handleEdit
  const handleEdit = (indexToEdit: number) => {
      setInputValue(listItems[indexToEdit]);
      setEditIndex(indexToEdit);
       setModal(true);
  }

  const handleDelete = (indexToDelete: number) => {
      setListItems((prevItems) => {
        return prevItems.filter((_, index) => {
          return index !== indexToDelete;
        })
      })
  }

  return (
    <>
      {/* Form Modal */}
      {modal && <InputForm setModal={setModal} onSubmit={handleSubmit} inputValue={inputValue} setInputValue={setInputValue} />}
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
                {listItems.map((item, index: number) => (
                  <ListCard key={index} item={item} index={index} handleComplete={handleComplete} handleEdit={handleEdit} handleDelete={handleDelete} />
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
