"use client";

import DashboardHeader from "@/components/reusable/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Badge } from "@/components/ui/badge";

// Define types for categories based on API response
interface SubCategory {
  id: string;
  subname: string;
  subslug: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  tamplate: string;
  createdAt: string;
  isDeleted: boolean;
  subCategories: SubCategory[];
}

// Sample data based on your API response
const sampleCategories: Category[] = [
  {
    id: "db4ac24c-2d66-4ded-96e1-72043e22a06f",
    tamplate: "string",
    name: "How to Build with NestJS",
    slug: "how-to-build-with-nestjs",
    createdAt: "2025-09-02T06:48:19.803Z",
    isDeleted: false,
    subCategories: [
      {
        id: "9975ddfe-f076-4a1f-9cf4-d6c912ce8e11",
        subname: "Industry & Finance",
        subslug: "industry-finance",
        categoryId: "db4ac24c-2d66-4ded-96e1-72043e22a06f",
      },
      {
        id: "d222ac99-3046-47d3-a74b-1c1b8032de15",
        subname: "Politics",
        subslug: "politics",
        categoryId: "db4ac24c-2d66-4ded-96e1-72043e22a06f",
      },
      {
        id: "bbfa8550-d5bc-461f-b7ec-8f825128f431",
        subname: "Education",
        subslug: "education",
        categoryId: "db4ac24c-2d66-4ded-96e1-72043e22a06f",
      },
    ],
  },
];

const CategoryManagement = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>(sampleCategories);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [newCategory, setNewCategory] = useState({
    name: "",
    tamplate: "",
    subnames: [""], // Array to handle multiple subcategories
  });

  const [editCategory, setEditCategory] = useState({
    name: "",
    tamplate: "",
    subnames: [""],
  });

  const toggleCardExpansion = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const handleAddNew = () => {
    setOpenAddModal(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setEditCategory({
      name: category.name,
      tamplate: category.tamplate,
      subnames: category.subCategories.map((sub) => sub.subname),
    });
    setOpenEditModal(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  };

  const handleSaveAdd = () => {
    // Generate slug from name
    const slug = newCategory.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Generate subcategories with slugs
    const subCategories = newCategory.subnames
      .filter((name) => name.trim() !== "")
      .map((subname) => ({
        id: `sub-${Math.random().toString(36).substr(2, 9)}`,
        subname,
        subslug: subname
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
        categoryId: `cat-${Math.random().toString(36).substr(2, 9)}`,
      }));

    const newCat: Category = {
      id: `cat-${Math.random().toString(36).substr(2, 9)}`,
      name: newCategory.name,
      slug,
      tamplate: newCategory.tamplate,
      createdAt: new Date().toISOString(),
      isDeleted: false,
      subCategories,
    };

    setCategories([...categories, newCat]);
    setOpenAddModal(false);
    setNewCategory({
      name: "",
      tamplate: "",
      subnames: [""],
    });
  };

  const handleSaveEdit = () => {
    if (!selectedCategory) return;

    const updatedCategories = categories.map((cat) => {
      if (cat.id === selectedCategory.id) {
        // Update subcategories
        const subCategories = editCategory.subnames
          .filter((name) => name.trim() !== "")
          .map((subname, index) => {
            // Preserve existing subcategory if possible
            if (selectedCategory.subCategories[index]) {
              return {
                ...selectedCategory.subCategories[index],
                subname,
                subslug: subname
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, ""),
              };
            }

            // Create new subcategory if needed
            return {
              id: `sub-${Math.random().toString(36).substr(2, 9)}`,
              subname,
              subslug: subname
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
              categoryId: selectedCategory.id,
            };
          });

        return {
          ...cat,
          name: editCategory.name,
          tamplate: editCategory.tamplate,
          subCategories,
        };
      }
      return cat;
    });

    setCategories(updatedCategories);
    setOpenEditModal(false);
  };

  const handleConfirmDelete = () => {
    if (!selectedCategory) return;

    const updatedCategories = categories.filter(
      (cat) => cat.id !== selectedCategory.id
    );

    setCategories(updatedCategories);
    setOpenDeleteModal(false);
  };

  const addSubcategoryField = (isEdit: boolean = false) => {
    if (isEdit) {
      setEditCategory({
        ...editCategory,
        subnames: [...editCategory.subnames, ""],
      });
    } else {
      setNewCategory({
        ...newCategory,
        subnames: [...newCategory.subnames, ""],
      });
    }
  };

  const removeSubcategoryField = (index: number, isEdit: boolean = false) => {
    if (isEdit) {
      const newSubnames = [...editCategory.subnames];
      newSubnames.splice(index, 1);
      setEditCategory({
        ...editCategory,
        subnames: newSubnames,
      });
    } else {
      const newSubnames = [...newCategory.subnames];
      newSubnames.splice(index, 1);
      setNewCategory({
        ...newCategory,
        subnames: newSubnames,
      });
    }
  };

  const handleSubnameChange = (
    index: number,
    value: string,
    isEdit: boolean = false
  ) => {
    if (isEdit) {
      const newSubnames = [...editCategory.subnames];
      newSubnames[index] = value;
      setEditCategory({
        ...editCategory,
        subnames: newSubnames,
      });
    } else {
      const newSubnames = [...newCategory.subnames];
      newSubnames[index] = value;
      setNewCategory({
        ...newCategory,
        subnames: newSubnames,
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <DashboardHeader title="All Categories" />
        <Button className="bg-accent-orange" onClick={handleAddNew}>
          <Plus className="text-white mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Category List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {categories.map((category) => {
          const isExpanded = expandedCards.has(category.id);
          return (
            <div
              key={category.id}
              className="border rounded-xl p-5 bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="mr-2">
                      {category.tamplate}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-blue-500"
                    onClick={() => handleEdit(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500"
                    onClick={() => handleDelete(category)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-600 break-words">
                  Slug: {category.slug}
                </p>
              </div>

              <div className="border-t pt-3">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleCardExpansion(category.id)}
                >
                  <h4 className="font-medium">
                    Sub-Categories ({category.subCategories.length})
                  </h4>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>

                {isExpanded && (
                  <ul className="mt-2 space-y-2">
                    {category.subCategories.map((sub) => (
                      <li
                        key={sub.id}
                        className="text-sm p-2 bg-gray-50 rounded-md"
                      >
                        <div className="font-medium">{sub.subname}</div>
                        <div className="text-xs text-gray-500">
                          Slug: {sub.subslug}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right">
                Category Name:
              </Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                placeholder="Enter category name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template" className="text-right">
                Template:
              </Label>
              <Select
                value={newCategory.tamplate}
                onValueChange={(value) =>
                  setNewCategory({ ...newCategory, tamplate: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select template" className="w-full" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NewsTemplate">NewsTemplate</SelectItem>
                  <SelectItem value="BusinessTemplate">
                    BusinessTemplate
                  </SelectItem>
                  <SelectItem value="string">Default Template</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-right">Sub-Categories:</Label>
              <div className="space-y-3">
                {newCategory.subnames.map((subname, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={subname}
                      onChange={(e) =>
                        handleSubnameChange(index, e.target.value)
                      }
                      placeholder={`Sub-category #${index + 1}`}
                      className="flex-1"
                    />
                    {newCategory.subnames.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeSubcategoryField(index)}
                        className="h-10 w-10"
                      >
                        −
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addSubcategoryField()}
                  className="mt-2"
                >
                  + Add Another Sub-category
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveAdd}>
              Save Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editName" className="text-right">
                Category Name:
              </Label>
              <Input
                id="editName"
                value={editCategory.name}
                onChange={(e) =>
                  setEditCategory({ ...editCategory, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editTemplate" className="text-right">
                Template:
              </Label>
              <Select
                value={editCategory.tamplate}
                onValueChange={(value) =>
                  setEditCategory({ ...editCategory, tamplate: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NewsTemplate">NewsTemplate</SelectItem>
                  <SelectItem value="BusinessTemplate">
                    BusinessTemplate
                  </SelectItem>
                  <SelectItem value="string">Default Template</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Sub-Categories:</Label>
              <div className="col-span-3 space-y-3">
                {editCategory.subnames.map((subname, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={subname}
                      onChange={(e) =>
                        handleSubnameChange(index, e.target.value, true)
                      }
                      placeholder={`Sub-category #${index + 1}`}
                      className="flex-1"
                    />
                    {editCategory.subnames.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeSubcategoryField(index, true)}
                        className="h-10 w-10"
                      >
                        −
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addSubcategoryField(true)}
                  className="mt-2"
                >
                  + Add Another Sub-category
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveEdit}>
              Save Changes
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
                {selectedCategory?.name || "Unknown"}
              </span>
              ? This will also delete all its sub-categories. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryManagement;
