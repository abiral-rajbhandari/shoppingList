import { Plus, CircleX } from "lucide-react";
import { useState } from "react";
interface PropsType {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (item: {
    itemName: string;
    quantity: string;
    price: number;
  }) => void;
}
interface FormType {
  itemName: string;
  quantity: string;
  price: number | string;
}

function InputForm(props: PropsType) {
  const [inputValue, setInputValue] = useState<FormType>({
    itemName: "",
    quantity: "",
    price: "",
  });

  // Handle Change: put input field data in a state variable
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputValue((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // Handle Submit: Store only values of the key value pair data from state variable to an array using another state variable
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      itemName: inputValue.itemName.trim(),
      quantity: inputValue.quantity.trim(),
      // quantity: Number(inputValue.quantity),
      price: Number(inputValue.price),
    };
    // call the function that adds the items &
    // Send data back to parent as an argument
    props.onSubmit(formData);
    // Reset the form fields.
    setInputValue({
      itemName: "",
      quantity: "",
      price: "",
    });
    // Close the modal after adding data
    props.setModal(false);
  };

  return (
    // Overlay Body
    <div
      onClick={() => props.setModal(false)}
      className="fixed inset-0 z-50 bg-black/40 h-screen w-screen flex justify-center items-center"
    >
      {/* Container */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="space-y-5 max-w-sm w-full p-6 bg-white shadow-lg rounded-2xl  "
      >
        {/* Form Header */}
        <div className="relative">
          <h2 className="text-2xl font-bold text-center">New List</h2>
          <button
            onClick={() => props.setModal(false)}
            className="absolute top-0 right-0 bottom-0 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <CircleX />
          </button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2  gap-2 ">
            <input
              className="form-input col-span-2"
              name="itemName"
              type="text"
              value={inputValue.itemName}
              onChange={handleChange}
              placeholder="Add a new list"
            />
            <input
              className="form-input"
              name="quantity"
              type="text"
              value={inputValue.quantity}
              onChange={handleChange}
              placeholder="Quantity"
            />
            <input
              className="form-input"
              name="price"
              type="number"
              value={inputValue.price}
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
