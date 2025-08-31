"use client";

import DashboardHeader from "@/components/reusable/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export const data = [
  {
    id: "1",
    name: "John Doe",
    email: "a@a.com",
    role: "user",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "b@b.com",
    role: "contributor",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "c@c.com",
    role: "user",
  },
  {
    id: "4",
    name: "Bob Lee",
    email: "d@d.com",
    role: "contributor",
  },
  {
    id: "5",
    name: "Eve White",
    email: "e@e.com",
    role: "user",
  },
];

const Page = () => {
  const [users, setUsers] = useState(data);

  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<"user" | "contributor">("user");

  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  // Open edit modal
  const openEditModal = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setEditUserId(id);
      setNewRole(user.role as "user" | "contributor");
    }
  };

  // Save changes from edit modal
  const handleEditSave = () => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === editUserId ? { ...user, role: newRole } : user
      )
    );
    toast.success("Role updated successfully");
    setEditUserId(null);
  };

  // Open delete confirmation modal
  const openDeleteModal = (id: string) => {
    setDeleteUserId(id);
  };

  // Confirm delete action
  const confirmDelete = () => {
    setUsers((prev) => prev.filter((user) => user.id !== deleteUserId));
    toast.error("Deleted Successfully");
    setDeleteUserId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <DashboardHeader title="Contributor Management" />
        <Button className="bg-accent-orange ">
          <Plus className="text-white" />
          Add New
        </Button>
      </div>

      <div className="overflow-x-auto p-4 bg-white shadow rounded-lg mt-4 md:mt-6">
        <table className="w-full table-auto text-left min-w-[400px]">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="p-3 text-sm font-medium text-gray-600 min-w-[200px]">
                Name
              </th>
              <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[150px]">
                Email
              </th>
              <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[150px]">
                Role
              </th>
              <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[150px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3 text-sm">{item.name}</td>
                <td className="p-3 text-sm text-gray-600 text-center">
                  {item.email}
                </td>
                <td className="p-3 text-sm text-gray-600 text-center capitalize">
                  <span className="border px-2 py-1 rounded-2xl bg-accent-orange text-white border-accent-orange">
                    {item.role}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-600 text-center capitalize flex justify-center items-center gap-4">
                  <Button onClick={() => openEditModal(item.id)} variant={"outline"}>
                    Edit
                  </Button>
                  <Button onClick={() => openDeleteModal(item.id)} variant={"destructive"}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Role Modal */}
      {editUserId && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Edit User Role</h2>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Select Role:</label>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={newRole}
                onChange={(e) =>
                  setNewRole(e.target.value as "user" | "contributor")
                }
              >
                <option value="user">User</option>
                <option value="contributor">Contributor</option>
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setEditUserId(null)}>
                Cancel
              </Button>
              <Button onClick={handleEditSave}>Save</Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteUserId && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4 text-red-600">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setDeleteUserId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
