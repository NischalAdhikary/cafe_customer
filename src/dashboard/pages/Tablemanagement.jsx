import ExampleUsage from "./components/Table";

import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useState } from "react";
import DeleteModal from "./components/deletetablemodel";
import { createTable } from "../../store/slice/Table";
import { useCreateTableAdminMutation } from "../../store/api/Table";

import { useDispatch } from "react-redux";
import { deleteTable, updateTable } from "../../store/slice/Table";
import { useDeleteTableAdminMutation } from "../../store/api/Table";
import { useEditTableAdminMutation } from "../../store/api/Table";
import Edittablemodal from "./components/edittablemodal";
import AddTableModal from "./components/addtable";

export default function Tablemanagement() {
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newTable, setNewTable] = useState({
    tablename: "",
    type: "",
    status: "Active",
    createdat: new Date().toISOString(),
    updatedat: new Date().toISOString(),
  });

  const [selectedTable, setSelectedTable] = useState(null);

  const [deleteTableAdmin] = useDeleteTableAdminMutation();
  const [editTableAdmin] = useEditTableAdminMutation();
  const [createTableAdmin] = useCreateTableAdminMutation();

  const tables = useSelector((state) => state.table.table);
  const handleDelete = async (table) => {
    setOpenDeleteModal(true);
    setSelectedTable(table);
  };
  const handleEdit = (table) => {
    setOpenEditModal(true);
    setSelectedTable(table);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedTable((prev) => ({ ...prev, [name]: value }));
  };
  const finalizeDelete = async () => {
    if (selectedTable) {
      await deleteTableAdmin(selectedTable.tableid).unwrap();
      dispatch(deleteTable(selectedTable));
      setOpenDeleteModal(false);
      setSelectedTable(null);
    }
  };
  const finalizeEdit = async () => {
    if (selectedTable) {
      await editTableAdmin(selectedTable).unwrap();
      dispatch(updateTable(selectedTable));

      setSelectedTable(null);
    }
  };
  const finalizeAdd = async () => {
    await createTableAdmin(newTable).unwrap();
    console.log("Table created:", newTable);
    dispatch(createTable(newTable));
    setOpenCreateModal(false);
    setNewTable({
      tablename: "",
      type: "",
      status: "Active",
    });
  };
  const columns = [
    {
      key: "createdat",
      title: "Created At",
      render: (value) => format(new Date(value), "MMMM dd, yyyy"),
    },
    {
      key: "tablename",
      title: "Table Name",
    },
    {
      key: "type",
      title: "Table Type",
    },
    {
      key: "updatedat",
      title: "Updated At",
      render: (value) => format(new Date(value), "MMMM dd, yyyy"),
    },
    {
      key: "status",
      title: "Status",
      render: (value) => {
        if (value === "Active") {
          return (
            <span className="bg-green-500 text-white px-3 py-1 rounded-xl">
              Vacant
            </span>
          );
        } else if (value === "Inactive") {
          return (
            <span className="bg-red-500 px-3 py-1 text-white rounded-xl">
              Inactive
            </span>
          );
        } else {
          return (
            <span className="bg-orange-500 px-3 py-1 text-white rounded-xl">
              Occupied
            </span>
          );
        }
      },
    },
  ];

  return (
    <div>
      <ExampleUsage
        title="Table Management"
        button="Add Table"
        onButtonClick={() => setOpenCreateModal(true)}
        data={tables}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable={true}
        sortable={false}
      />
      {openDeleteModal && (
        <DeleteModal
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          onConfirm={finalizeDelete}
          dataName={selectedTable?.tablename}
        />
      )}
      {openEditModal && (
        <Edittablemodal
          data={selectedTable}
          onChange={handleChange}
          isOpen={openEditModal}
          onClose={() => setOpenEditModal(false)}
          tableData={selectedTable}
          onSave={finalizeEdit}
        />
      )}
      {openCreateModal && (
        <AddTableModal
          data={newTable}
          onChange={(e) =>
            setNewTable({ ...newTable, [e.target.name]: e.target.value })
          }
          isOpen={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          onSave={finalizeAdd}
        />
      )}
    </div>
  );
}
