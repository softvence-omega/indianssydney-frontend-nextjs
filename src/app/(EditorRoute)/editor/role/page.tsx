"use client";

import DashboardHeader from "@/components/reusable/DashboardHeader";
import DeleteUserModal from "@/components/reusable/DeleteUserModal";
import EditUserModal from "@/components/reusable/EditUserModal";
import UserTable from "@/components/reusable/UserTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetPendingContributorsRequestQuery,
  useUpdateContributorRequestStatusMutation,
} from "@/store/features/user/user.api";
import { useState } from "react";
import { toast } from "sonner";
import ContributorRequestTable, {
  UserProfile,
} from "./ContributorRequestTable";
import ViewUserModal from "./ViewUserModal";

export const userdata = [
  { id: "1", name: "John Doe", email: "a@a.com", role: "user" },
  { id: "2", name: "Jane Smith", email: "b@b.com", role: "contributor" },
  { id: "3", name: "Alice Johnson", email: "c@c.com", role: "user" },
  { id: "4", name: "Bob Lee", email: "d@d.com", role: "contributor" },
  { id: "5", name: "Eve White", email: "e@e.com", role: "user" },
];

const Page = () => {
  const { data } = useGetPendingContributorsRequestQuery(undefined);
  const [updateUserStatus] = useUpdateContributorRequestStatusMutation();
  const [users, setUsers] = useState(userdata);

  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<"user" | "contributor" | "editor">(
    "user"
  );
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const [viewUser, setViewUser] = useState<UserProfile | null>(null);

  // Accept request → update role to contributor
  const handleAccept = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: "contributor" } : u))
    );
    toast.success("User accepted as contributor");
  };

  // Decline request → keep role as user
  const handleDecline = (id: string) => {
    toast.info("User request declined");
    console.log("Declined Request", id);
  };
  const handleStatusChange = async (id: string, status: string) => {
    const toastId = toast.loading("Updating...");
    try {
      const result = await updateUserStatus({
        id: id,
        status: status,
      }).unwrap();
      if (result) {
        toast.success("Status updated successfully", { id: toastId });
        setDeleteUserId(null);
      }
    } catch (error) {
      toast.error((error as any)?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  // Open delete modal
  const openDeleteModal = (id: string) => setDeleteUserId(id);

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
            users={data?.filter((u: UserProfile) => u?.status === "APPROVED")}
            onEdit={(id) => setEditUserId(id)}
            onDelete={openDeleteModal}
          />
        </TabsContent>

        <TabsContent value="requests">
          <ContributorRequestTable
            title="All Requests"
            users={data?.filter((u: UserProfile) => u.status === "PENDING")}
            changeStatus={handleStatusChange}
            onView={(user) => setViewUser(user)} // pass user object directly
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <EditUserModal
        open={!!editUserId}
        newRole={newRole as any}
        setNewRole={setNewRole as any}
        onClose={() => setEditUserId(null)}
        onSave={() => setEditUserId(null)}
      />

      <DeleteUserModal
        open={deleteUserId as string}
        onClose={() => setDeleteUserId(null)}
        onConfirm={handleStatusChange}
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
