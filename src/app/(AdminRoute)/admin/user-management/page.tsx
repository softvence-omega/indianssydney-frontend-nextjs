"use client";

import React, { useState } from "react";

import DashboardHeader from "@/components/reusable/DashboardHeader";
import { toast } from "sonner";
import UserTable from "@/components/reusable/UserTable";
import EditUserModal from "@/components/reusable/EditUserModal";
import DeleteUserModal from "@/components/reusable/DeleteUserModal";

export const data = [
  { id: "1", name: "John Doe", email: "a@a.com", role: "user" },
  { id: "2", name: "Jane Smith", email: "b@b.com", role: "contributor" },
  { id: "3", name: "Alice Johnson", email: "c@c.com", role: "user" },
  { id: "4", name: "Bob Lee", email: "d@d.com", role: "contributor" },
  { id: "5", name: "Eve White", email: "e@e.com", role: "editor" },
];

const UserManagement = () => {
  const [users, setUsers] = useState(data);

  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<"user" | "contributor" | "editor">(
    "user"
  );
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  // Open edit modal
  const openEditModal = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setEditUserId(id);
      setNewRole(user.role as "user" | "contributor" | "editor");
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

  // Open delete modal
  const openDeleteModal = (id: string) => {
    setDeleteUserId(id);
  };

  // Confirm delete
  const confirmDelete = () => {
    setUsers((prev) => prev.filter((user) => user.id !== deleteUserId));
    toast.error("Deleted Successfully");
    setDeleteUserId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <DashboardHeader title="User & Role Management" />
      </div>

      <UserTable
        title="Contributor Management"
        users={users.filter((u) => u.role === "contributor")}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      <UserTable
        title="Editor Management"
        users={users.filter((u) => u.role === "editor")}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      {/* Modals */}
      <EditUserModal
        open={!!editUserId}
        newRole={newRole}
        setNewRole={setNewRole}
        onClose={() => setEditUserId(null)}
        onSave={handleEditSave}
      />

      <DeleteUserModal
        open={!!deleteUserId}
        onClose={() => setDeleteUserId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default UserManagement;
