"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

import DashboardHeader from "@/components/reusable/DashboardHeader";
import DeleteUserModal from "@/components/reusable/DeleteUserModal";
import EditUserModal from "@/components/reusable/EditUserModal";
import UserTable from "@/components/reusable/UserTable";
import { useGetAllUserQuery, useUpdateUserRoleMutation } from "@/store/features/admin/admin.api";
import { toast } from "sonner";


type User = {
  id: string;
  email: string;
  fullName: string | null;
  bio: string | null;
  profilePhoto: string | null;
  role: "USER" | "ADMIN" | "CONTIBUTOR" | "SUPER_ADMIN";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};


const UserManagement = () => {
  const { data } = useGetAllUserQuery(undefined);
  const [updateRole] = useUpdateUserRoleMutation()
  const users = data?.data as User[]

  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<"USER" | "ADMIN" | "CONTIBUTOR">(
    "USER"
  );
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  // Open edit modal
  const openEditModal = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setEditUserId(id);
      setNewRole(user.role as "USER" | "ADMIN" | "CONTIBUTOR");
    }
  };

  // Save changes from edit modal
  const handleEditSave = async () => {
    const toastId = toast.loading("Updating...");
    try {
      const res = await updateRole({
        id: editUserId as string,
        data: { role: newRole },
      }).unwrap()
      if (res?.message) {
        toast.success("Role updated successfully", { id: toastId });
      }
    } catch (error) {
      toast.error((error as any)?.data?.message, { id: toastId });
    }


    setEditUserId(null);
  };

  // Open delete modal
  const openDeleteModal = (id: string) => {
    setDeleteUserId(id);
  };

  // Confirm delete
  const confirmDelete = () => {
    toast.error("Deleted Successfully");
    setDeleteUserId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <DashboardHeader title="User & Role Management" />
      </div>

      {/* Tabs for role management */}
      <Tabs defaultValue="contributors" className="w-full">
        <TabsList>
          <TabsTrigger value="contributors">Contributors</TabsTrigger>
          <TabsTrigger value="editors">Editors</TabsTrigger>
          <TabsTrigger value="user">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="contributors">
          <UserTable
            title="Contributor Management"
            users={(users as any)?.filter((u: any) => u.role === "CONTIBUTOR")}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        </TabsContent>

        <TabsContent value="editors">
          <UserTable
            title="Editor Management"
            users={(users as any)?.filter((u: any) => u.role === "ADMIN")}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        </TabsContent>
        <TabsContent value="user">
          <UserTable
            title="User Management"
            users={(users as any)?.filter((u: any) => u.role === "USER")}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <EditUserModal
        open={!!editUserId}
        newRole={newRole}
        setNewRole={setNewRole}
        onClose={() => setEditUserId(null)}
        onSave={handleEditSave}
      />

      <DeleteUserModal
        open={deleteUserId as string}
        onClose={() => setDeleteUserId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default UserManagement;
