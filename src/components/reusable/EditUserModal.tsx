"use client";

import { Button } from "@/components/ui/button";

type EditUserModalProps = {
  open: boolean;
  newRole: "user" | "contributor" | "editor";
  setNewRole: (role: "user" | "contributor" | "editor") => void;
  onClose: () => void;
  onSave: () => void;
};

const EditUserModal = ({
  open,
  newRole,
  setNewRole,
  onClose,
  onSave,
}: EditUserModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Edit User Role</h2>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Select Role:</label>
          <select
            className="w-full border border-gray-300 rounded p-2"
            value={newRole}
            onChange={(e) =>
              setNewRole(e.target.value as "user" | "contributor" | "editor")
            }
          >
            <option value="user">User</option>
            <option value="contributor">Contributor</option>
            <option value="editor">Editor</option>
          </select>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
