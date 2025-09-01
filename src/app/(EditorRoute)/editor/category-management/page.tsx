"use client";

import DashboardHeader from "@/components/reusable/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Define types for categories
interface Category {
  id: number;
  mainCategory: string;
  subCategories: string[];
}

const categories: Category[] = [
  {
    id: 1,
    mainCategory: "News & Current Affairs",
    subCategories: [
      "National Headlines",
      "Politics & Policy",
      "Multicultural News",
      "Immigration & Citizenship",
      "Indigenous Affairs",
    ],
  },
  {
    id: 2,
    mainCategory: "Business & Innovation",
    subCategories: [
      "National Headlines",
      "Politics & Policy",
      "Multicultural News",
      "Immigration & Citizenship",
      "Indigenous Affairs",
    ],
  },
  {
    id: 3,
    mainCategory: "Culture & Arts",
    subCategories: [
      "National Headlines",
      "Politics & Policy",
      "Multicultural News",
      "Immigration & Citizenship",
      "Indigenous Affairs",
    ],
  },
];

const CategoryManagement = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Proper typing
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [newCategory, setNewCategory] = useState({ main: "", sub: "" });
  const [editCategory, setEditCategory] = useState({ main: "", sub: "" });

  const handleAddNew = () => {
    setOpenAddModal(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setEditCategory({
      main: category.mainCategory,
      sub: category.subCategories[0] || "",
    });
    setOpenEditModal(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  };

  const handleSaveAdd = () => {
    console.log("Adding new category:", newCategory);
    setOpenAddModal(false);
    setNewCategory({ main: "", sub: "" });
  };

  const handleSaveEdit = () => {
    if (!selectedCategory) return;
    console.log("Editing category:", { ...selectedCategory, ...editCategory });
    setOpenEditModal(false);
  };

  const handleConfirmDelete = () => {
    if (!selectedCategory) return;
    console.log("Deleting category:", selectedCategory);
    setOpenDeleteModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <DashboardHeader title="All Categories" />
        <Button className="bg-accent-orange" onClick={handleAddNew}>
          <Plus className="text-white" />
          Add New
        </Button>
      </div>

      {/* Category List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Main Category:</h3>
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-500"
                  onClick={() => handleEdit(category)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500"
                  onClick={() => handleDelete(category)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <p>{category.mainCategory}</p>
            <h4 className="font-semibold mt-2">Sub-Categories:</h4>
            <ul className="list-decimal list-inside">
              {category.subCategories.map((sub, index) => (
                <li key={index}>{sub}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mainCategory" className="text-right">
                Category Name:
              </Label>
              <Input
                id="mainCategory"
                value={newCategory.main}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, main: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subCategory" className="text-right">
                Sub-Category Name:
              </Label>
              <Input
                id="subCategory"
                value={newCategory.sub}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, sub: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveAdd}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editMainCategory" className="text-right">
                Category Name:
              </Label>
              <Input
                id="editMainCategory"
                value={editCategory.main}
                onChange={(e) =>
                  setEditCategory({ ...editCategory, main: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editSubCategory" className="text-right">
                Sub-Category Name:
              </Label>
              <Input
                id="editSubCategory"
                value={editCategory.sub}
                onChange={(e) =>
                  setEditCategory({ ...editCategory, sub: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveEdit}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <AlertDialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the category{" "}
              <span className="font-semibold">
                {selectedCategory?.mainCategory || "Unknown"}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryManagement;
