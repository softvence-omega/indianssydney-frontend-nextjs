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

interface Law {
  id: number;
  name: string;
  file?: File | null;
}

const Page = () => {
  const [open, setOpen] = useState(false);
  const [laws, setLaws] = useState<Law[]>([
    { id: 1, name: "Racial Discrimination Act 1975" },
    { id: 2, name: "Sex Discrimination Act 1984" },
    { id: 3, name: "Australian Human Rights Commission Act 1986" },
  ]);

  const [newLaw, setNewLaw] = useState<{ name: string; file: File | null }>({
    name: "",
    file: null,
  });

  const handleAddLaw = () => {
    if (newLaw.name) {
      setLaws([...laws, { id: Date.now(), name: newLaw.name, file: newLaw.file }]);
      setNewLaw({ name: "", file: null });
      setOpen(false);
    }
  };

  const handleDelete = (id: number) => {
    setLaws(laws.filter((law) => law.id !== id));
  };

  return (
    <div className="">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-4 text-center md:text-left items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">Laws and Regulations</h2>
          <p className="text-sm text-gray-500">
            Add your laws so that the AI can identify the rules and regulations.
          </p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setOpen(true)}>
          Add New +
        </Button>
      </div>

      {/* Laws List */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-sm font-medium mb-2">Laws</h3>
        <div className="space-y-3">
          {laws.map((law) => (
            <div
              key={law.id}
              className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-b pb-2 last:border-none"
            >
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-gray-600" />
                <span className="text-gray-800">{law.name}</span>
              </div>
              <div>
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
        </div>
      </div>

      {/* Add New Law Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Law</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="lawName">Law Name</Label>
              <Input
                id="lawName"
                placeholder="Enter law name"
                value={newLaw.name}
                onChange={(e) => setNewLaw({ ...newLaw, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="lawFile">Upload File</Label>
              <Input
                id="lawFile"
                type="file"
                onChange={(e) =>
                  setNewLaw({ ...newLaw, file: e.target.files?.[0] || null })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-orange-600 hover:bg-orange-700"
              onClick={handleAddLaw}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
