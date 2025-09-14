"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Pencil } from "lucide-react";

interface PrivacySection {
  id: number;
  title: string;
  content: string;
}

const AdminPrivacyPolicy = () => {
  const [sections, setSections] = useState<PrivacySection[]>([
    { id: 1, title: "What we need from you", content: "Lorem Ipsum..." },
    { id: 2, title: "How we protect your data", content: "Lorem Ipsum..." },
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PrivacySection | null>(null);

  const [form, setForm] = useState({ title: "", content: "" });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Section
  const handleSave = () => {
    if (editing) {
      setSections((prev) =>
        prev.map((sec) =>
          sec.id === editing.id ? { ...sec, title: form.title, content: form.content } : sec
        )
      );
    } else {
      setSections((prev) => [
        ...prev,
        { id: Date.now(), title: form.title, content: form.content },
      ]);
    }
    setForm({ title: "", content: "" });
    setEditing(null);
    setOpen(false);
  };

  // Delete section
  const handleDelete = (id: number) => {
    setSections((prev) => prev.filter((sec) => sec.id !== id));
  };

  // Open edit modal
  const handleEdit = (section: PrivacySection) => {
    setEditing(section);
    setForm({ title: section.title, content: section.content });
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
                  <p className="text-sm text-gray-600">{section.content}</p>
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
              value={form.content}
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
