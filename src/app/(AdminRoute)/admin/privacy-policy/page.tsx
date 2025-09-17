"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDeletePrivacyPolicyMutation, useGetAllPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } from "@/store/features/site/site.api";
import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface PrivacySection {
  id: string;
  title: string;
  subtext: string;
}

const AdminPrivacyPolicy = () => {
  const { data } = useGetAllPrivacyPolicyQuery(undefined);
  const [updatePrivacyPolicy] = useUpdatePrivacyPolicyMutation();
  const [deletePrivacyPolicy] = useDeletePrivacyPolicyMutation();
  const [sections, setSections] = useState<PrivacySection[]>([]);

  useEffect(() => {
    if (data) {
      setSections(data?.data)
    }
  }, [data])

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PrivacySection | null>(null);

  const [form, setForm] = useState({ title: "", subtext: "" });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Section
  const handleSave = async () => {
    if (editing) {
      const res = await updatePrivacyPolicy({ data: form, id: editing.id }).unwrap()
      console.log(res)
    } else {

    }
    setForm({ title: "", subtext: "" });
    setEditing(null);
    setOpen(false);
  };

  // Delete section
  const handleDelete = async (id: string) => {
    console.log(id)
    const res = await deletePrivacyPolicy(id).unwrap();
    if (res?.success) toast.success("Section deleted successfully");
  };

  // Open edit modal
  const handleEdit = (section: PrivacySection) => {
    setEditing(section);
    setForm({ title: section.title, subtext: section.subtext });
    setOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Privacy Policy</h1>
        <Button className="bg-accent-orange hover:bg-orange-600" onClick={() => setOpen(true)}>+ Add Section</Button>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                  <p className="text-sm text-gray-600">{section.subtext}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(section)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(section.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add / Edit Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Section" : "Add New Section"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="title"
              placeholder="Section Title"
              value={form.title}
              onChange={handleChange}
            />
            <Textarea
              name="content"
              placeholder="Section Content"
              value={form.subtext}
              onChange={handleChange}
              rows={5}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-accent-orange hover:bg-orange-600">
              {editing ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPrivacyPolicy;
