import { Plus } from "lucide-react";
import { useState } from "react";
import InputForm from "./InputForm";
import ListCard from "./ListCard";
import { toast } from "react-hot-toast";

export interface ListItemsType {
  itemName: string;
  quantity: number;
  price: number;
  completed: boolean;
}

function ListItem() {
  const [modal, setModal] = useState(false);
  const [inputValue, setInputValue] = useState<ListItemsType>({
    itemName: "",
    quantity: 0,
    price: 0,
    completed: false,
  });
  const [listItems, setListItems] = useState<ListItemsType[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("All List");

  // Counts of: All List, Pending List & Completed List
  const allCount = listItems.length;
  const pendingCount = listItems.filter((item) => !item.completed).length;
  const completedCount = listItems.filter((item) => item.completed).length;

  // Filtered Items:
  const filteredItems = listItems.filter((item) => {
    if (activeTab === "Pending") {
      return !item.completed; // Pending Items
    } else if (activeTab === "Completed") {
      return item.completed; // Completed Items
    } else {
      return item; // All Items
    }
  });

  // Total Cost Calculation:
  // returns items that is not completed and the item that is completed, it will not return that
  const totalCost = listItems
    .filter((item) => !item.completed)
    .reduce((accumulator, item) => {
      const sum = Number(item.quantity) || 0;
      return accumulator + item.price * sum;
    }, 0);

  // Function: handleSubmit
  const handleSubmit = (items: ListItemsType) => {
    if (editIndex !== null) {
      setListItems((prevItems) => {
        return prevItems.map((item, index) => {
          // If this index is being edited, replace the item with the updated input value; otherwise keep the existing item
          // Entire inputs of item will be updated
          return index == editIndex ? inputValue : item;
        });
      });
      toast.success("List updated.")
      setEditIndex(null);
    } else {
      setListItems((prevItems) => {
        return [...prevItems, items];
      });
      toast.success("New list added.")
    }
    // Clear Input Fields
    setInputValue({ itemName: "", quantity: 0, price: 0, completed: false });
  };

  // Function: handleComplete
  const handleComplete = (indexToComplete: number) => {
    setListItems((prevItems) => {
      return prevItems.map((item, index) =>
        index == indexToComplete
          ? { ...item, completed: !item.completed }
          : item
      );
    });
  };

  // Function: handleEdit
  const handleEdit = (indexToEdit: number) => {
    setInputValue(listItems[indexToEdit]); // Sets the input field which matches this edit index
    setEditIndex(indexToEdit); // Tracks which index to edit
    setModal(true);
  };

  // Function: handleDelete
  const handleDelete = (indexToDelete: number) => {
    setListItems((prevItems) => {
      return prevItems.filter((_, index) => {
        return index !== indexToDelete;
      });
    });
    toast.success("List deleted.")
  };

  return (
    <>
      {/* Form Modal */}
      {modal && (
        <InputForm
          setModal={setModal}
          onSubmit={handleSubmit}
          inputValue={inputValue}
          setInputValue={setInputValue}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
        />
      )}
      <div className="space-y-5 ">
        {/* HEADER */}
        <div className="flex justify-between items-center mt-6 p-6 rounded-lg shadow-sm bg-white border-gray-300">
          <p className="text-xl font-bold"> Total Cost: Rs {totalCost} </p>
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
            <button
              onClick={() => setActiveTab("All List")}
              className={`py-2 px-4 text-sm rounded-lg border hover:bg-background-page transition-colors cursor-pointer ${
                activeTab == "All List" &&
                "bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              }`}
            >
              All List ({allCount})
            </button>
            <button
              onClick={() => setActiveTab("Pending")}
              className={`py-2 px-4 text-sm rounded-lg border hover:bg-background-page transition-colors cursor-pointer ${
                activeTab == "Pending" &&
                "bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setActiveTab("Completed")}
              className={`py-2 px-4 text-sm rounded-lg border hover:bg-background-page transition-colors cursor-pointer ${
                activeTab == "Completed" &&
                "bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>

          {/* LISTS */}
          <div className="min-h-[calc(100vh-350px)]  ">
            {filteredItems.length === 0 ? (
              <div className="min-h-[calc(100vh-350px)] text-lg text-gray-400 flex justify-center items-center ">
                List is currenty empty
              </div>
            ) : (
              <div className="space-y-5">
                {filteredItems.map((item) => {
                  const originalIndex = listItems.indexOf(item);
                  return (
                    <ListCard
                      key={originalIndex}
                      item={item}
                      index={originalIndex}
                      handleComplete={handleComplete}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListItem;
