"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  useCreatePrivacyPolicyMutation,
  useDeletePrivacyPolicyMutation,
  useGetAllPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} from "@/store/features/site/privacy.api";
import { Pencil, Trash2 } from "lucide-react";
import { Editor } from "primereact/editor";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface PrivacySection {
  id: string;
  title: string;
  subtext: string;
}

const AdminPrivacyPolicy = () => {
  const { data, refetch } = useGetAllPrivacyPolicyQuery(undefined);
  const [createPrivacyPolicy] = useCreatePrivacyPolicyMutation();
  const [updatePrivacyPolicy] = useUpdatePrivacyPolicyMutation();
  const [deletePrivacyPolicy] = useDeletePrivacyPolicyMutation();
  
  const [sections, setSections] = useState<PrivacySection[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PrivacySection | null>(null);
  const [form, setForm] = useState({ title: "", subtext: "" });

  // Delete modal
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<PrivacySection | null>(null);

  // Load data
  useEffect(() => {
    if (data?.data) {
      setSections(data.data);
    }
  }, [data]);

  console.log(data);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Upload Image Function
  const uploadImageToServer = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok && result?.url) {
        toast.success("Image uploaded successfully");
        return result.url;
      } else {
        toast.error(result?.message || "Image upload failed");
        return null;
      }
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Failed to upload image");
      return null;
    }
  };

  // Handle image insert (convert base64 → URL)
  const handleEditorChange = async (e: any) => {
    const html = e.htmlValue || "";
    setForm({ ...form, subtext: html });

    // Detect base64 image
    const regex = /<img[^>]+src="data:image\/([^;]+);base64,([^"]+)"/g;
    const matches = html.matchAll(regex);

    for (const match of matches) {
      const base64 = match[0];
      const src = match[0].match(/src="([^"]+)"/)?.[1];
      if (src && src.startsWith("data:")) {
        const file = base64ToFile(src);
        const imageUrl = await uploadImageToServer(file);
        if (imageUrl) {
          // Replace base64 with uploaded URL
          const updatedHtml = html.replace(src, imageUrl);
          setForm({ ...form, subtext: updatedHtml });
        }
      }
    }
  };

  // Convert base64 → File
  const base64ToFile = (base64: string): File => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], `upload_${Date.now()}.png`, { type: mime });
  };

  // Save handler
  const handleSave = async () => {
    try {
      if (!form.title.trim()) {
        toast.error("Title cannot be empty");
        return;
      }
      
      if (!form.subtext.trim()) {
        toast.error("Content cannot be empty");
        return;
      }

      if (editing) {
        const res = await updatePrivacyPolicy({
          id: editing.id,
          data: form,
        }).unwrap();
        if (res?.success) toast.success("Section updated successfully");
      } else {
        const res = await createPrivacyPolicy({
          data: form,
        }).unwrap();
        if (res?.success) toast.success("Section created successfully");
      }

      setForm({ title: "", subtext: "" });
      setEditing(null);
      setOpen(false);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save section");
    }
  };

  // Confirm delete
  const confirmDelete = (section: PrivacySection) => {
    setSectionToDelete(section);
    setDeleteDialogOpen(true);
  };

  // Delete handler
  const handleDelete = async () => {
    if (!sectionToDelete) return;
    try {
      const res = await deletePrivacyPolicy(sectionToDelete.id).unwrap();
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
  const handleEdit = (section: PrivacySection) => {
    setEditing(section);
    setForm({ title: section.title, subtext: section.subtext });
    setOpen(true);
  };

  // Add new section
  const handleAdd = () => {
    setForm({ title: "", subtext: "" });
    setEditing(null);
    setOpen(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Privacy Policy</h1>
        <Button
          className="bg-accent-orange hover:bg-orange-600"
          onClick={handleAdd}
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
                <div className="w-full">
                  <h2 className="text-lg font-semibold mb-2">
                    {section.title}
                  </h2>
                  <div
                    className="text-sm text-gray-700 prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: section.subtext }}
                  />
                </div>
                <div className="flex gap-2 ml-4">
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
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Section" : "Add New Section"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <Input
              name="title"
              placeholder="Section Title"
              value={form.title}
              onChange={handleChange}
            />
            <Editor
              value={form.subtext}
              onTextChange={handleEditorChange}
              style={{ height: "450px" }}
              placeholder="Write or paste your content here..."
            />
          </div>

          <DialogFooter className="mt-4">
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
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Section</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{sectionToDelete?.title}</span>? 
            This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
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

export default AdminPrivacyPolicy;