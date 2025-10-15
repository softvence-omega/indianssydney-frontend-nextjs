"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import {
  useCreateNewAdMutation,
  useDeleteAdMutation,
  useGetAllAdQuery,
  useUpdateAdMutation,
} from "@/store/features/ad-management/ad-management.api";

type AdPosition = "FRONTPAGE" | "CATEGORYPAGE";

interface FormData {
  title: string;
  subtitle: string;
  link: string;
  adsposition: AdPosition;
  file: File | null;
}

const AdminAdManagement = () => {
  // ✅ Fetch all ads
  const { data: adData, isLoading, refetch } = useGetAllAdQuery({});

  const [createAd, { isLoading: creating }] = useCreateNewAdMutation();
  const [updateAd] = useUpdateAdMutation();
  const [deleteAd] = useDeleteAdMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<any | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    subtitle: "",
    link: "",
    adsposition: "FRONTPAGE",
    file: null,
  });

  // ✅ Open modal for create or edit
  const openModal = (ad?: any) => {
    if (ad) {
      setEditingAd(ad);
      setFormData({
        title: ad.title,
        subtitle: ad.subtitle,
        link: ad.link,
        adsposition: ad.adsposition || "FRONTPAGE",
        file: null,
      });
    } else {
      setEditingAd(null);
      setFormData({
        title: "",
        subtitle: "",
        link: "",
        adsposition: "FRONTPAGE",
        file: null,
      });
    }
    setIsModalOpen(true);
  };

  // ✅ Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  // ✅ Handle create/update ad
  const handleSave = async () => {
    if (!formData.title || !formData.link) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const body = new FormData();
      body.append("title", formData.title);
      body.append("subtitle", formData.subtitle);
      body.append("link", formData.link);
      body.append("adsposition", formData.adsposition);
      if (formData.file) {
        body.append("file", formData.file);
      }

      if (editingAd) {
        await updateAd({ id: editingAd.id, data: body }).unwrap();
        toast.success("Ad updated successfully!");
      } else {
        await createAd(body).unwrap();
        toast.success("Ad created successfully!");
      }

      refetch();
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Internal server error — check server logs"
      );
    }
  };

  // ✅ Handle delete ad
  const handleDelete = async (id: string) => {
    try {
      await deleteAd(id).unwrap();
      toast.success("Ad deleted successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete ad");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <div>
          <h2 className="text-lg font-semibold">Ad Management</h2>
          <p className="text-sm text-gray-500 mb-2">
            Create, edit, or delete ads for your site.
          </p>
        </div>

        <Button
          onClick={() => openModal()}
          className="bg-accent-orange hover:bg-orange-600"
        >
          <Plus size={16} className="mr-2" /> Add New Ad
        </Button>
      </div>

      {/* Ads List */}
      <div className="space-y-4">
        {isLoading ? (
          <p>Loading ads...</p>
        ) : adData?.data?.length ? (
          adData.data.map((ad: any) => (
            <div
              key={ad.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between bg-white shadow-sm px-4 py-3 rounded-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <img
                  src={ad.adsimage || "https://via.placeholder.com/150"}
                  alt={ad.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{ad.title}</h3>
                  <p className="text-sm text-gray-600">{ad.subtitle}</p>
                  <a
                    href={ad.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm"
                  >
                    {ad.link}
                  </a>
                  <div className="mt-1 text-xs inline-block px-2 py-1 rounded bg-gray-100 text-gray-700">
                    Position:
                    {ad.adsposition === "FRONTPAGE"
                      ? "Front Page"
                      : "Category Page"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openModal(ad)}
                >
                  <Pencil size={14} className="mr-1" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(ad.id)}
                >
                  <Trash2 size={14} className="mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No ads found</p>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingAd ? "Edit Ad" : "Add New Ad"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              name="title"
              placeholder="Title *"
              value={formData.title}
              onChange={handleChange}
            />
            <Textarea
              name="subtitle"
              placeholder="Subtitle"
              value={formData.subtitle}
              onChange={handleChange}
            />
            <Input
              name="link"
              placeholder="Link *"
              value={formData.link}
              onChange={handleChange}
            />
            <Input type="file" accept="image/*" onChange={handleFileChange} />

            {/* Select Position */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Ad Position *
              </label>
              <Select
                value={formData.adsposition}
                onValueChange={(value: AdPosition) =>
                  setFormData((prev) => ({ ...prev, adsposition: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FRONTPAGE">Front Page</SelectItem>
                  <SelectItem value="CATEGORYPAGE">Category Page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={creating}
              className="bg-accent-orange hover:bg-orange-600"
            >
              {creating ? "Saving..." : editingAd ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAdManagement;
