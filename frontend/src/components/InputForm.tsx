import { Plus, CircleX } from "lucide-react";
import type { ListItemsType } from "./ListItem";
interface PropsType {
  setModal: (value: boolean) => void; 
  onSubmit: (item: ListItemsType) => void; 
  inputValue: ListItemsType;
  setInputValue: (value: ListItemsType | ((prev: ListItemsType) => ListItemsType )) => void;
}

function InputForm(props: PropsType) {

  // Function: handleChange (put input field data in a state variable) 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    props.setInputValue((prevData) => {
      return {
        ...prevData,
        [name]: name === "price" ? Number(value) : value,
      };
    });
  };

  // Function: HandleSubmit (Store only values of the key value pair data from state variable to an array using another state variable) 
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      itemName: props.inputValue.itemName.trim(),
      quantity: props.inputValue.quantity.trim(),
      price: props.inputValue.price,
      completed: props.inputValue.completed,
    };
    // call the function that adds the items &
    // Send data back to parent as an argument
    props.onSubmit(formData);
    // Reset the form fields.
    props.setInputValue({
      itemName: "",
      quantity: "",
      price: 0,
      completed: false,
    });
    // Close the modal after adding data
    props.setModal(false);
  };

  return (
    // Modal Overlay
    <div
      onClick={() => props.setModal(false)}
      className="fixed inset-0 z-50 bg-black/40 h-screen w-screen flex justify-center items-center"
    >
      {/* Modal Container */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="space-y-5 max-w-sm w-full p-6 bg-white shadow-lg rounded-2xl  "
      >
        {/* Modal Form Header */}
        <div className="relative">
          <h2 className="text-2xl font-bold text-center">New List</h2>
          <button
            onClick={() => {
              props.setModal(false);
              props.setInputValue({ itemName: "", quantity: "", price: 0, completed: false, });
            }}
            className="absolute top-0 right-0 bottom-0 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <CircleX />
          </button>
        </div>
        {/* Modal Form Input */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2  gap-2 ">
            <input
              className="form-input col-span-2"
              name="itemName"
              type="text"
              value={props.inputValue.itemName}
              onChange={handleChange}
              placeholder="Add a new list"
            />
            <input
              className="form-input"
              name="quantity"
              type="text"
              value={props.inputValue.quantity}
              onChange={handleChange}
              placeholder="Quantity"
            />
            <input
              className="form-input"
              name="price"
              type="number"
              value={props.inputValue.price == 0 ? "" : props.inputValue.price}
              onChange={handleChange}
              placeholder="Price"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 transition-colors hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            {" "}
            <Plus /> Create New List
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputForm;
