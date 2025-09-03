import React, { useEffect } from "react";
import ExampleUsage from "./components/Table";
import {
  useDeleteUserMutation,
  useEditUserMutation,
  useGetAllCustomersQuery,
} from "../../store/api/User";
import { useDispatch, useSelector } from "react-redux";
import { editCustomer, setCustomers } from "../../store/slice/Customers";
import { format } from "date-fns";
import DeleteModal from "./components/deletetablemodel";
import { deleteCustomer } from "../../store/slice/Customers";
import { useCreateCustomerMutation } from "../../store/api/User";
import { addCustomer } from "../../store/slice/Customers";

import Editcustomer from "./components/editcustomer";
import AddCustomer from "./components/addcustomer";

export default function Customer() {
  const { data } = useGetAllCustomersQuery();
  const [OpenDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [OpenEditModal, setOpenEditModal] = React.useState(false);
  const [OpenCreateModal, setOpenCreateModal] = React.useState(false);
  const [NewCustomer, setNewCustomer] = React.useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
    createdat: new Date().toISOString(),
    updatedat: new Date().toISOString(),
  });

  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [editUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [createCustomer] = useCreateCustomerMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setCustomers(data?.data));
    }
  }, [data]);
  const customers = useSelector((state) => state.customers.customers);
  console.log("customers", customers);
  const columns = [
    {
      key: "name",
      title: "Username",
    },
    {
      key: "email",
      title: "Email",
    },
    {
      key: "phone",
      title: "Phone",
    },
    {
      key: "createdat",
      title: "Joined At",
      render: (value) => (
        <span>{format(new Date(value), "MMMM dd, yyyy")}</span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (value) => {
        if (value === "Active") {
          return (
            <span className="bg-green-500 rounded text-white  px-3 py-1">
              {value}
            </span>
          );
        }
        return (
          <span className="bg-red-500 rounded text-white  px-3 py-1 ">
            {value}
          </span>
        );
      },
    },
  ];
  const onEdit = (customer) => {
    setOpenEditModal(true);
    setSelectedCustomer(customer);
    console.log("this is clicked when pressing customers");
  };
  const onCreate = () => {
    setOpenCreateModal(true);
  };
  const onDelete = (customer) => {
    setOpenDeleteModal(true);
    setSelectedCustomer(customer);
  };
  const finalizeDelete = async () => {
    try {
      await deleteUser(selectedCustomer.userid).unwrap();
      dispatch(deleteCustomer(selectedCustomer.userid));

      setOpenDeleteModal(false);
      setSelectedCustomer(null);
    } catch (e) {}
  };
  const finalizeAdd = async () => {
    try {
      await createCustomer(NewCustomer).unwrap();
      dispatch(addCustomer(NewCustomer));
      setOpenCreateModal(false);
      setNewCustomer({
        name: "",
        email: "",
        phone: "",
        status: "Active",
      });
    } catch (e) {}
  };
  const finalizeEdit = async () => {
    try {
      await editUser(selectedCustomer).unwrap();
      dispatch(editCustomer(selectedCustomer));
      setOpenEditModal(false);
      setSelectedCustomer(null);
    } catch (e) {
      console.error("Error editing customer:", e);
    }
  };

  return (
    <div className="w-full h-full relative">
      <ExampleUsage
        title={"Customers Management"}
        onButtonClick={onCreate}
        button={"Add New Customer"}
        columns={columns}
        data={customers}
        onEdit={onEdit}
        onDelete={onDelete}
        searchable={true}
        sortable={false}
      />
      {OpenDeleteModal && (
        <DeleteModal
          isOpen={OpenDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          onConfirm={finalizeDelete}
          dataName={selectedCustomer?.name}
        />
      )}
      {OpenEditModal && (
        <Editcustomer
          onClose={() => setOpenEditModal(false)}
          data={selectedCustomer}
          onChange={(e) => {
            const { name, value } = e.target;
            setSelectedCustomer((prev) => ({ ...prev, [name]: value }));
          }}
          onSave={finalizeEdit}
        />
      )}
      {OpenCreateModal && (
        <AddCustomer
          onClose={() => setOpenCreateModal(false)}
          data={NewCustomer}
          onChange={(e) => {
            const { name, value } = e.target;
            setNewCustomer((prev) => ({ ...prev, [name]: value }));
          }}
          onSave={finalizeAdd}
        />
      )}
    </div>
  );
}
