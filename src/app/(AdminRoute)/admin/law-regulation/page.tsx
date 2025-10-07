"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

import { toast } from "sonner";
import {
  useCreateLawMutation,
  useDeleteLawMutation,
  useGetAllLawsQuery,
} from "@/store/features/admin/llm.api";

interface Law {
  id: string;
  description: string;
  files?: { id: string; url: string }[];
}

const Page = () => {
  const [open, setOpen] = useState(false);
  const [newLaw, setNewLaw] = useState<{ name: string; files: File[] }>({
    name: "",
    files: [],
  });

  // RTK Query hooks
  const { data, isLoading, refetch } = useGetAllLawsQuery({});
  const [createLaw, { isLoading: isCreating }] = useCreateLawMutation();
  const [deleteLaw] = useDeleteLawMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewLaw({
        ...newLaw,
        files: Array.from(e.target.files),
      });
    }
  };

  const handleAddLaw = async () => {
    if (!newLaw.name || newLaw.files.length === 0) {
      toast.error("Please provide a law name and at least one file.");
      return;
    }

    const formData = new FormData();
    formData.append("description", newLaw.name);
    newLaw.files.forEach((file) => formData.append("files", file));

    try {
      const res = await createLaw(formData).unwrap();
      toast.success("Law added successfully!");
      setNewLaw({ name: "", files: [] });
      setOpen(false);
      refetch();
    } catch (err) {
      console.error("❌ Failed to add law:", err);
      toast.error("Failed to add law. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLaw(id).unwrap();
      toast.success("Law deleted successfully!");
      refetch();
    } catch (err) {
      console.error("❌ Delete failed:", err);
      toast.error("Failed to delete law.");
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-4 text-center md:text-left items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">
            Laws and Regulations
          </h2>
          <p className="text-sm text-gray-500">
            Add your laws so that the AI can identify the rules and regulations.
          </p>
        </div>
        <Button
          className="bg-orange-600 hover:bg-orange-700"
          onClick={() => setOpen(true)}
        >
          Add New +
        </Button>
      </div>

      {/* Laws List */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-sm font-medium mb-2">Laws</h3>

        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : (
          <div className="space-y-3">
            {data?.data?.map((law: any) => (
              <div
                key={law.id}
                className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-b pb-2 last:border-none"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-800">{law.description}</span>
                </div>
                <div className="flex items-center gap-3">
                  {law.files?.[0]?.url && (
                    <a
                      href={law.files[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm underline"
                    >
                      View File
                    </a>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(law.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}

            {data?.data?.length === 0 && (
              <p className="text-gray-500 text-sm">No laws found.</p>
            )}
          </div>
        )}
      </div>

      {/* Add New Law Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Law</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="lawName">Law Name / Description</Label>
              <Input
                id="lawName"
                placeholder="Enter law name"
                value={newLaw.name}
                onChange={(e) => setNewLaw({ ...newLaw, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="lawFile">Upload File(s)</Label>
              <Input
                id="lawFile"
                type="file"
                multiple
                onChange={handleFileChange}
              />
              {newLaw.files.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  {newLaw.files.length} file(s) selected
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-orange-600 hover:bg-orange-700"
              onClick={handleAddLaw}
              disabled={isCreating}
            >
              {isCreating ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
