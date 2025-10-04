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

type AdPosition = "front-page" | "category-page";

interface Ad {
  id: number;
  title: string;
  subtitle: string;
  adPosition: AdPosition;
  link: string;
  image: string;
}

interface FormData {
  title: string;
  subtitle: string;
  adPosition: AdPosition;
  link: string;
  image: string;
}

const AdminAdManagement = () => {
  const [ads, setAds] = useState<Ad[]>([
    {
      id: 1,
      title: "Summer Sale",
      subtitle: "Up to 50% off!",
      link: "https://example.com/sale",
      image: "https://via.placeholder.com/150",
      adPosition: "front-page",
    },
    {
      id: 2,
      title: "New Collection",
      subtitle: "Check out the latest arrivals",
      link: "https://example.com/new",
      image: "https://via.placeholder.com/150",
      adPosition: "front-page",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    subtitle: "",
    link: "",
    image: "",
    adPosition: "front-page",
  });

  // open modal for create or edit
  const openModal = (ad?: Ad) => {
    if (ad) {
      setEditingAd(ad);
      setFormData({
        title: ad.title,
        subtitle: ad.subtitle,
        link: ad.link,
        image: ad.image,
        adPosition: ad.adPosition,
      });
    } else {
      setEditingAd(null);
      setFormData({
        title: "",
        subtitle: "",
        link: "",
        image: "",
        adPosition: "front-page",
      });
    }
    setIsModalOpen(true);
  };

  // handle input / textarea changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // save ad
  const handleSave = () => {
    if (!formData.title.trim()) return;

    if (editingAd) {
      setAds((prev) =>
        prev.map((ad) =>
          ad.id === editingAd.id ? { ...ad, ...formData } : ad
        )
      );
    } else {
      setAds((prev) => [...prev, { id: Date.now(), ...formData }]);
    }

    setIsModalOpen(false);
    setEditingAd(null);
    setFormData({
      title: "",
      subtitle: "",
      link: "",
      image: "",
      adPosition: "front-page",
    });
  };

  // delete ad
  const handleDelete = (id: number) => {
    setAds((prev) => prev.filter((ad) => ad.id !== id));
  };

  return (
    <div>
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

      <div className="space-y-4">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between bg-white shadow-sm px-4 py-3 rounded-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <img
                src={ad.image || "https://via.placeholder.com/150"}
                alt={ad.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold">{ad.title}</h3>
                <p className="text-sm text-gray-600">{ad.subtitle}</p>
                <div className="text-sm">
                  <a
                    href={ad.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {ad.link}
                  </a>
                </div>
                <div className="mt-1 text-xs inline-block px-2 py-1 rounded bg-gray-100 text-gray-700">
                  Position:{" "}
                  {ad.adPosition === "front-page"
                    ? "Front Page"
                    : "Category Page"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => openModal(ad)}>
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
        ))}
      </div>

      {/* Modal for Add/Edit */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingAd ? "Edit Ad" : "Add New Ad"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              name="title"
              placeholder="Title"
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
              placeholder="Link"
              value={formData.link}
              onChange={handleChange}
            />
            <Input
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
            />

            {/* ShadCN Select for adPosition */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Ad Position
              </label>
              <Select
                value={formData.adPosition}
                onValueChange={(value: AdPosition) =>
                  setFormData((prev) => ({ ...prev, adPosition: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="front-page">Front Page</SelectItem>
                  <SelectItem value="category-page">Category Page</SelectItem>
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
              className="bg-accent-orange hover:bg-orange-600"
            >
              {editingAd ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAdManagement;
