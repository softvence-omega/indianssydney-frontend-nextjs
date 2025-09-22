"use client";

import { Button } from "@/components/ui/button";



export type UserProfile = {
  id: string;
  about: string;
  email: string;
  fullName: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  status: "PENDING" | "APPROVED" | "REJECTED";
  userId: string;
  user: {
    id: string;
    fullName: string | null;
    email: string;
    profilePhoto: string | null;
  };
  role: "USER" | "ADMIN" | "CONTIBUTOR" | "SUPER_ADMIN";
};

type ContributorRequestTableProps = {
  title?: string;
  users: UserProfile[];
  changeStatus: (id: string, status: string) => void;
  onView: (user: UserProfile) => void;
};

const ContributorRequestTable = ({
  title,
  users,
  changeStatus,
  onView
}: ContributorRequestTableProps) => {
  return (
    <div className="mt-5">
      {title && (
        <h2 className="font-medium text-ink-black text-xl mb-4">{title}</h2>
      )}
      <div className="overflow-x-auto p-4 bg-white shadow rounded-lg mt-2">
        <table className="w-full table-auto text-left min-w-[400px]">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="p-3 text-sm font-medium text-gray-600 min-w-[200px]">Name</th>
              <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[150px]">Email</th>
              <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[150px]">Status</th>
              <th className="p-3 text-sm font-medium text-gray-600 text-center min-w-[150px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3 text-sm">{item?.fullName}</td>
                <td className="p-3 text-sm text-gray-600 text-center">{item.email}</td>
                <td className="p-3 text-sm text-gray-600 text-center capitalize">
                  <span className="border px-2 py-1 rounded-2xl bg-accent-orange text-white border-accent-orange">
                    {item?.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-600 text-center flex justify-center items-center gap-4">
                  <Button onClick={() => changeStatus(item.id, "APPROVED")} variant="outline">
                    Accept
                  </Button>
                  <Button onClick={() => changeStatus(item.id, "REJECTED")} variant="destructive">
                    Decline
                  </Button>
                  <Button onClick={() => onView(item)} variant="outline">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContributorRequestTable;
