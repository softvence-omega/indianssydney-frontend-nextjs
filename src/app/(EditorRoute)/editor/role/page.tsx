"use client";

import DashboardHeader from "@/components/reusable/DashboardHeader";
import DeleteUserModal from "@/components/reusable/DeleteUserModal";
import EditUserModal from "@/components/reusable/EditUserModal";
import UserTable from "@/components/reusable/UserTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import React, { useState } from "react";
import ContributorRequestTable from "./ContributorRequestTable";
import ViewUserModal from "./ViewUserModal";

export const data = [
  { id: "1", name: "John Doe", email: "a@a.com", role: "user" },
  { id: "2", name: "Jane Smith", email: "b@b.com", role: "contributor" },
  { id: "3", name: "Alice Johnson", email: "c@c.com", role: "user" },
  { id: "4", name: "Bob Lee", email: "d@d.com", role: "contributor" },
  { id: "5", name: "Eve White", email: "e@e.com", role: "user" },
];

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

const Page = () => {
  const [users, setUsers] = useState(data);

  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<"user" | "contributor" | "editor">(
    "user"
  );
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const [viewUser, setViewUser] = useState<UserData | null>(null);

  // Accept request → update role to contributor
  const handleAccept = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: "contributor" } : u))
    );
    toast.success("User accepted as contributor");
  };

  // Decline request → keep role as user
  const handleDecline = (id: string) => {
    toast.info("User request declined",);
    console.log("Declined Request", id);
  };

  // Open delete modal
  const openDeleteModal = (id: string) => setDeleteUserId(id);
  const confirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteUserId));
    toast.error("Deleted Successfully");
    setDeleteUserId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <DashboardHeader title="Contributor Management" />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <UserTable
            title="All Contributors"
            users={users.filter((u) => u.role === "contributor")}
            onEdit={(id) => setEditUserId(id)}
            onDelete={openDeleteModal}
          />
        </TabsContent>

        <TabsContent value="requests">
          <ContributorRequestTable
            title="All Requests"
            users={users.filter((u) => u.role === "user")}
            onAccept={handleAccept}
            onDecline={handleDecline}
            onView={(user) => setViewUser(user)} // pass user object directly
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <EditUserModal
        open={!!editUserId}
        newRole={newRole}
        setNewRole={setNewRole}
        onClose={() => setEditUserId(null)}
        onSave={() => setEditUserId(null)}
      />

      <DeleteUserModal
        open={!!deleteUserId}
        onClose={() => setDeleteUserId(null)}
        onConfirm={confirmDelete}
      />

      <ViewUserModal
        open={!!viewUser}
        onClose={() => setViewUser(null)}
        user={viewUser}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </div>
  );
};

export default Page;
