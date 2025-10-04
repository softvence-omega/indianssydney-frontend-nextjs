"use client";

import DashboardHeader from "@/components/reusable/DashboardHeader";
import SkeletonLoader from "@/components/reusable/SkeletonLoader";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  useCreateNewCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
} from "@/store/features/category/category.api";
import { ChevronDown, ChevronUp, Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  subnames?: string[];
}

const CategoryManagement = () => {
  const { data, isLoading, isFetching, isSuccess } = useGetAllCategoryQuery({});
  const [createNewCategory, { isLoading: isCreating }] =
    useCreateNewCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategoryById, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const categories = data?.data || [];

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

  const handleSaveAdd = async () => {
    try {
      const newCat: Partial<Category> = {
        name: newCategory.name,
        tamplate: newCategory.tamplate,
        subnames: newCategory.subnames,
      };
      const result = await createNewCategory(newCat)?.unwrap();
      if (result?.success) {
        toast.success(result.message);
        setOpenAddModal(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedCategory) return;

    const toastId = toast.loading("Creating category...");

    try {
      const payload = {
        name: editCategory.name,
        tamplate: editCategory.tamplate,
        subnames: editCategory.subnames.filter((s) => s.trim() !== ""),
      };

      const result = await updateCategory({
        id: selectedCategory.id,
        data: payload,
      }).unwrap();

      if (result?.success) {
        toast.success(result.message || "Category updated successfully", {
          id: toastId,
        });
        setOpenEditModal(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update category", {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    if (!openAddModal) {
      setNewCategory({ name: "", tamplate: "", subnames: [""] });
    }
    if (!openEditModal) {
      setEditCategory({ name: "", tamplate: "", subnames: [""] });
      setSelectedCategory(null);
    }
  }, [openAddModal, openEditModal]);

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;

    // Start loading toast
    const toastId = toast.loading("Deleting category...");

    try {
      const result = await deleteCategoryById(selectedCategory?.id)?.unwrap();

      if (result?.success) {
        toast.success("Category deleted successfully", { id: toastId });
      } else {
        toast.error("Failed to delete category", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setOpenDeleteModal(false);
    }
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

      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="grid gap-6 mt-6">
          {categories?.map((category: any) => {
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
                      {category?.subCategories?.map((sub: any) => (
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
      )}
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
                  <SelectValue
                    placeholder="Select template"
                    className="w-full"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EducationTemplate">
                    Education Template
                  </SelectItem>
                  <SelectItem value="FoodTemplate">Food Template</SelectItem>
                  <SelectItem value="BusinessTemplate">
                    Business Template
                  </SelectItem>
                  <SelectItem value="NewsTemplate">Default Template</SelectItem>
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
            <Button type="submit" onClick={handleSaveAdd} disabled={isCreating}>
              {isCreating ? (
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
              ) : null}
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
            <div className=" items-center gap-4">
              <Label htmlFor="editName" className="text-right">
                Category Name:
              </Label>
              <Input
                id="editName"
                value={editCategory.name}
                onChange={(e) =>
                  setEditCategory({ ...editCategory, name: e.target.value })
                }
                className="mt-2"
              />
            </div>
            <div className=" items-center gap-4">
              <Label htmlFor="editTemplate" className="text-right">
                Template:
              </Label>
              <Select
                value={editCategory.tamplate}
                onValueChange={(value) =>
                  setEditCategory({ ...editCategory, tamplate: value })
                }
              >
                <SelectTrigger className="mt-2">
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

            <div className=" items-center gap-4">
              <Label className="text-right ">Sub-Categories:</Label>
              <div className="space-y-2 mt-2">
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
                  onClick={() => addSubcategoryField(true)}
                  className="mt-2 bg-accent-orange"
                >
                  + Add Another Sub-category
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleSaveEdit}
              className="bg-green-600"
            >
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
