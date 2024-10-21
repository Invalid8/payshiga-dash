import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { v4 as uuidv4 } from "uuid";
import { showNotification } from "@/utils/showNotification";

const AddBusinessDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state?.user.user?.id);

  const [form, setForm] = useState({
    type: "",
    name: "",
    industry: "",
    size: "",
    annualVolume: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
      showNotification("error", "top-right", undefined, {
        message: "Please log in to create a business.",
      });
      return;
    }
    const newBusiness = {
      id: uuidv4(),
      ...form,
      userId, // Attach to logged-in user
    };
    dispatch(newBusiness); // Dispatch business creation
    onClose(); // Close the drawer
  };

  return (
    isOpen && (
      <div className="drawer">
        <h2>Add New Business</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Business Type"
          />
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Business Name"
          />
          <input
            name="industry"
            value={form.industry}
            onChange={handleChange}
            placeholder="Business Industry"
          />
          <input
            name="size"
            value={form.size}
            onChange={handleChange}
            placeholder="Company Size"
          />
          <input
            name="annualVolume"
            value={form.annualVolume}
            onChange={handleChange}
            placeholder="Estimated Annual Volume"
          />
          <button type="submit">Create Business</button>
        </form>
      </div>
    )
  );
};

export default AddBusinessDrawer;
