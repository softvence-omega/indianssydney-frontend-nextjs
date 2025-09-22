"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserProfile } from "./ContributorRequestTable";

type ViewUserModalProps = {
  open: boolean;
  onClose: () => void;
  user: UserProfile | null;
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
            <p className="font-medium ">User Name: {user?.fullName}</p>
          </div>
          <div>
            <p className="font-medium">User Email: {user.email}</p>
          </div>
          <div>
            <p className="font-medium">
              Status: <span className="capitalize">{user?.status}</span>
            </p>
          </div>
          <div>
            <p className="font-medium">Application Details:</p>
            <p className="text-sm text-black p-3 rounded mt-2 bg-gray-100">
              {user?.about}
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
