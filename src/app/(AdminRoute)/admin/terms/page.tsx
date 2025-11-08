"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";
import {
  useGetAllTermsQuery,
  useCreateTermsMutation,
  useUpdateTermsMutation,
  useDeleteTermsMutation,
} from "@/store/features/site/terms.api";
import { Editor } from "primereact/editor";

interface TermsSection {
  id: string;
  title: string;
  content: string;
}

const AdminTerms = () => {
  const { data, refetch } = useGetAllTermsQuery(undefined);
  const [createTerms] = useCreateTermsMutation();
  const [updateTerms] = useUpdateTermsMutation();
  const [deleteTerms] = useDeleteTermsMutation();

  const [sections, setSections] = useState<TermsSection[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TermsSection | null>(null);
  const [form, setForm] = useState({ title: "", content: "" });

  // Delete modal
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<TermsSection | null>(
    null
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load data
  useEffect(() => {
    if (data?.data) {
      setSections(data.data);
    }
  }, [data]);

  // Handle title
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle editor text
  const handleEditorChange = (e: any) => {
    setForm({ ...form, content: e.htmlValue });
  };

  // Handle save
  const handleSave = async () => {
    try {
      if (editing) {
        const res = await updateTerms({
          id: editing.id,
          data: form,
        }).unwrap();
        if (res?.success) toast.success("Section updated successfully");
      } else {
        const res = await createTerms({ data: form }).unwrap();
        if (res?.success) toast.success("Section added successfully");
      }

      setForm({ title: "", content: "" });
      setEditing(null);
      setOpen(false);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save section");
    }
  };

  // Confirm delete
  const confirmDelete = (section: TermsSection) => {
    setSectionToDelete(section);
    setDeleteDialogOpen(true);
  };

  // Delete section
  const handleDelete = async () => {
    if (!sectionToDelete) return;
    try {
      const res = await deleteTerms(sectionToDelete.id).unwrap();
      if (res?.success) {
        toast.success("Section deleted successfully");
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete section");
    } finally {
      setDeleteDialogOpen(false);
      setSectionToDelete(null);
    }
  };

  // Edit section
  const handleEdit = (section: TermsSection) => {
    setEditing(section);
    setForm({ title: section.title, content: section.content });
    setOpen(true);
  };

  // Image upload handler for editor
  const handleImageUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const uploadImageToServer = async (file: File): Promise<string | null> => {
    try {
      // Example Cloudinary upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_preset"); // 🔸 replace with your Cloudinary preset

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/upload`, // 🔸 replace with your Cloudinary name
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.secure_url || null;
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await uploadImageToServer(file);
      if (imageUrl) {
        const newContent =
          form.content + `<img src="${imageUrl}" alt="uploaded image" />`;
        setForm({ ...form, content: newContent });
      }
    }
  };

  const toolbarTemplate = {
    container: [
      ["bold", "italic", "underline", "strike"],
      [{ header: [1, 2, 3, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "code-block"],
      ["clean"],
    ],
    handlers: {
      image: handleImageUpload,
    },
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Terms & Conditions</h1>
        <Button
          className="bg-accent-orange hover:bg-orange-600"
          onClick={() => {
            setForm({ title: "", content: "" });
            setEditing(null);
            setOpen(true);
          }}
        >
          + Add Section
        </Button>
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.id} className="shadow-sm">
            <CardContent>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                  <div
                    className="text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
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
                    onClick={() => confirmDelete(section)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
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
            <Editor
              value={form.content}
              onTextChange={handleEditorChange}
              headerTemplate={undefined}
              style={{ height: "320px" }}
              modules={toolbarTemplate}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-accent-orange hover:bg-orange-600"
            >
              {editing ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Modal */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Section</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{sectionToDelete?.title}</span>?
            This action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTerms;
