import React, { useState } from "react";
import ExampleUsage from "./components/Table";
import {
  useEditFoodMutation,
  useGetFoodItemsQuery,
} from "../../store/api/FoodItem";
import { format } from "date-fns";
import DeleteModal from "./components/deletetablemodel";
import { useDeleteFoodMutation } from "../../store/api/FoodItem";
import { toast } from "react-toastify";
import AddFooditem from "../components/addfooditem";
import { useCreateFoodMutation } from "../../store/api/FoodItem";
import Editfooditem from "../components/editfooditem";

export default function Fooditempage() {
  const { data, isLoading: loading } = useGetFoodItemsQuery();
  const [deleteFood, { isLoading: deleting }] = useDeleteFoodMutation();
  const [createFood, { isLoading: creating }] = useCreateFoodMutation();
  const [editFood, { isLoading: editing }] = useEditFoodMutation();

  const [OpenDeleteModal, setDeleteModal] = useState(false);
  const [OpenCreateModal, setOpenCreateModal] = useState(false);
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [newFood, setNewFood] = useState({});
  const [selectedFood, setSelectedFood] = useState(null);

  const columns = [
    {
      key: "createdat",
      title: "Created At",
      render: (value) => format(new Date(value), "MMMM dd, yyyy"),
    },
    {
      key: "foodname",
      title: "Food Name",
    },
    {
      key: "price",
      title: "Price",
    },
    {
      key: "description",
      title: "Description",
    },
    {
      key: "imageurl",
      title: "Image",
      render: (value) =>
        value ? (
          <div className="w-15 h-15">
            <img
              src={`http://localhost:9000/uploads/${value}`}
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="w-15 h-15 bg-gray-200 "></div>
        ),
    },
    {
      key: "availability",
      title: "Status",
      render: (value) =>
        value === true ? (
          <span className="bg-green-500 text-white p-2 rounded">Active</span>
        ) : (
          <span className="bg-red-500 text-white p-2 rounded">Inactive</span>
        ),
    },
    {
      key: "updatedat",
      title: "Updated At",
      render: (value) => format(new Date(value), "MMMM dd, yyyy"),
    },
    {
      key: "is_veg",
      title: "Is Veg",
      render: (value) => (value === true ? "Yes" : "No"),
    },
  ];

  const onDelete = (food) => {
    setSelectedFood(food);
    setDeleteModal(true);
  };
  const onEdit = (food) => {
    setSelectedFood(food);
    setOpenEditModal(true);
  };
  const finalizeDelete = async () => {
    try {
      await deleteFood({ foodid: selectedFood?.foodid, selectedFood }).unwrap();
      setDeleteModal(false);
      setSelectedFood(null);
      toast.success("Food Deleted Successfully");
    } catch (e) {
      toast.error("Failed to delete food");
    }
  };
  const finalizeAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("foodname", newFood?.foodname);
      formData.append("price", newFood?.price);
      formData.append("description", newFood?.description);
      formData.append("availability", newFood?.availability);
      formData.append("is_veg", newFood?.is_veg);
      if (newFood?.image) formData.append("image", newFood?.image);
      console.log(newFood);

      await createFood(formData).unwrap();
      setOpenCreateModal(false);
      setNewFood({});
      toast.success("Food Added Successfully");
    } catch (e) {
      next(e);
    }
  };
  const finalizeEdit = async () => {
    try {
      const formData = new FormData();
      console.log("selected food", selectedFood);
      formData.append("foodid", selectedFood?.foodid);
      formData.append("foodname", selectedFood?.foodname);
      formData.append("price", selectedFood?.price);
      formData.append("description", selectedFood?.description);
      formData.append("availability", selectedFood?.availability);
      formData.append("is_veg", selectedFood?.is_veg);
      if (selectedFood?.image) formData.append("image", selectedFood?.image);
      console.log("fromdata", formData);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      await editFood(formData).unwrap();
      setOpenEditModal(false);
      setSelectedFood(null);
      toast.success("Food Updated Successfully");
    } catch (e) {
      next(e);
    }
  };
  return (
    <div className="w-full h-full relative">
      <ExampleUsage
        title={"Food Items Management"}
        columns={columns}
        button={"Add FoodItem"}
        onButtonClick={() => setOpenCreateModal(true)}
        data={data?.data}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      {OpenDeleteModal && (
        <DeleteModal
          isOpen={OpenDeleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={finalizeDelete}
          dataName={selectedFood?.foodname}
        />
      )}
      {OpenCreateModal && (
        <AddFooditem
          isOpen={OpenCreateModal}
          data={newFood}
          onClose={() => {
            setOpenCreateModal(false);
            setNewFood({});
          }}
          onSave={finalizeAdd}
          onChange={(e) => {
            const value =
              e.target.value === "true"
                ? true
                : e.target.value === "false"
                ? false
                : e.target.value;
            setNewFood({ ...newFood, [e.target.name]: value });
          }}
        />
      )}
      {OpenEditModal && (
        <Editfooditem
          onClose={() => setOpenEditModal(false)}
          data={selectedFood}
          onChange={(e) => {
            const { value, name } = e.target;
            const parsedValue =
              value === "true" ? true : value === "false" ? false : value;

            setSelectedFood({
              ...selectedFood,
              [name]: parsedValue,
            });
          }}
          onSave={finalizeEdit}
        />
      )}
    </div>
  );
}
