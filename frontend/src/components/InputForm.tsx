import { Plus } from 'lucide-react';

function InputForm() {
  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl mt-5  ">
      <form className="space-y-5">
        <div className="grid grid-cols-2  gap-2 " >
        <input className="form-input col-span-2" type="text" placeholder="Add a new list" />
        <input className="form-input" type="number" placeholder="Quantity " />
        <input className="form-input" type="text"  placeholder="Price" />
        </div>
        <button className="w-full bg-btn-primary text-white p-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"> <Plus /> Create a new list</button>
      </form>
    </div>
  );
}

export default InputForm;
