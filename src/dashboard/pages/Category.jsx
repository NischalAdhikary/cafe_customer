import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExampleUsage from "./components/Table";
import { format } from "date-fns";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryQuery,
} from "../../store/api/Category";
import { removeCategory } from "../../store/slice/Category";

import DeleteModal from "./components/deletetablemodel";
import { setCategory } from "../../store/slice/Category";
import { toast } from "react-toastify";
import AddCatogory from "./components/addcategory";
import Editcategory from "./components/editcategory";
import { updateCategory } from "../../store/slice/Category";

export default function Category() {
  const dispatch = useDispatch();
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const [editCategory, { isLoading: isEditing }] = useEditCategoryMutation();

  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [OpenCreateModal, setOpenCreateModal] = useState(false);
  const [newCategory, setNewCategory] = useState({});
  const [categoryName, setCategoryName] = useState(null);

  const { data: category } = useGetCategoryQuery();
  useEffect(() => {
    if (category?.data) {
      dispatch(setCategory(category?.data));
    }
  }, [category]);
  const categoryData = useSelector((state) => state.category.category);

  const columns = [
    {
      key: "createdat",
      title: "Created At",
      render: (value) => format(new Date(value), "MMMM dd, yyyy"),
    },
    { key: "categoryname", title: "Category Name" },
    {
      key: "status",
      title: "Status",
      render: (value) =>
        value === "active" ? (
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
  ];
  const onEdit = (categorydata) => {
    setCategoryName(categorydata);
    setOpenEditModal(true);
  };
  const onDelete = (categorydata) => {
    setCategoryName(categorydata);
    setOpenDeleteModal(true);
  };
  const finalizeDelelte = async () => {
    try {
      await deleteCategory(categoryName.categoryid).unwrap();
      setOpenDeleteModal(false);
      dispatch(removeCategory(categoryName));
      setCategoryName(null);
      toast.success("Category deleted successfully");
    } catch (e) {
      toast.error(e?.data?.message);
    }
  };
  const finalizeEdit = async () => {
    try {
      await editCategory({
        categoryid: categoryName.categoryid,
        categorybody: categoryName,
      }).unwrap();
      dispatch(updateCategory(categoryName));
      setOpenEditModal(false);
      setCategoryName(null);
      toast.success("Category updated successfully");
    } catch (e) {
      toast.error(e?.data?.message);
    }
  };
  const finalizeCreate = async () => {
    try {
      await createCategory(newCategory).unwrap();

      setOpenCreateModal(false);
      setNewCategory({});
      toast.success("Category created successfully");
    } catch (e) {
      toast.error("Category creation failed");
    }
  };
  return (
    <div className="w-full h-full relative">
      <ExampleUsage
        title={"Category Management"}
        button={"Create Category"}
        onButtonClick={() => setOpenCreateModal(true)}
        data={categoryData}
        columns={columns}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      {OpenDeleteModal && (
        <DeleteModal
          isOpen={OpenDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          dataName={categoryName.categoryname}
          onConfirm={finalizeDelelte}
        />
      )}
      {OpenCreateModal && (
        <AddCatogory
          isOpen={OpenCreateModal}
          data={newCategory}
          onClose={() => setOpenCreateModal(false)}
          onChange={(e) =>
            setNewCategory({ ...newCategory, [e.target.name]: e.target.value })
          }
          onSave={finalizeCreate}
        />
      )}
      {OpenEditModal && (
        <Editcategory
          isOpen={OpenEditModal}
          data={categoryName}
          onChange={(e) => {
            const { name, value } = e.target;
            setCategoryName((prev) => ({ ...prev, [name]: value }));
          }}
          onClose={() => setOpenEditModal(false)}
          onSave={finalizeEdit}
        />
      )}
    </div>
  );
}
