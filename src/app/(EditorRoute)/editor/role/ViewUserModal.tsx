"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ViewUserModalProps = {
  open: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
};

const ViewUserModal: React.FC<ViewUserModalProps> = ({
  open,
  onClose,
  user,
  onAccept,
  onDecline,
}) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose} >
      <DialogContent className="rounded-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl"> Application Details </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="font-medium ">User Name: {user.name}</p>
          </div>
          <div>
            <p className="font-medium">User Email: {user.email}</p>
          </div>
          <div>
            <p className="font-medium">
              Role: <span className="capitalize">{user.role}</span>
            </p>
          </div>
          <div>
            <p className="font-medium">Application Details:</p>
            <p className="text-sm text-black p-3 rounded mt-2 bg-gray-100">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a
              placeholder for the applicant’s motivation statement.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            onClick={() => {
              onDecline(user.id);
              onClose();
            }}
          >
            Decline
          </Button>
          <Button
            onClick={() => {
              onAccept(user.id);
              onClose();
            }}
            className="bg-orange-600 hover:bg-orange-500"
          >
            Accept
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserModal;
