"use client";

import { Button } from "@/components/ui/button";

type DeleteUserModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteUserModal = ({ open, onClose, onConfirm }: DeleteUserModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4 text-red-600">
          Confirm Delete
        </h2>
        <p className="mb-6">
          Are you sure you want to delete this user? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
