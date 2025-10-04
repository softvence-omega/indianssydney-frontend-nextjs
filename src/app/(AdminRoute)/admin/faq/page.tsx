"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Pencil, Plus } from "lucide-react";
import {
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
  useGetAllFAQQuery,
} from "@/store/features/site/faq.api";

// Types
interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

interface FAQSection {
  id?: string;
  sectionTitle: string;
  faqs: FAQItem[];
}

const AdminFAQ = () => {
  const { data, refetch } = useGetAllFAQQuery({});
  const [createFAQ] = useCreateFAQMutation();
  const [updateFAQ] = useUpdateFAQMutation();
  const [deleteFAQ] = useDeleteFAQMutation();

  const [faqSections, setFaqSections] = useState<FAQSection[]>([]);
  useEffect(() => {
    if (data) setFaqSections(data?.data);
  }, [data]);

  // Dialog State
  const [open, setOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<FAQSection | null>(null);

  // Confirm Delete State
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form state
  const [sectionTitle, setSectionTitle] = useState("");
  const [faqs, setFaqs] = useState<FAQItem[]>([{ question: "", answer: "" }]);

  // Handlers for dynamic faqs
  const handleFaqChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    setFaqs((prev) =>
      prev.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq))
    );
  };

  const handleAddFaqField = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleRemoveFaqField = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  // Save section with faqs
  const handleSave = async () => {
    try {
      if (editingSection?.id) {
        await updateFAQ({
          id: editingSection.id,
          data: { sectionTitle, faqs },
        }).unwrap();
      } else {
        await createFAQ({
          data: { sectionTitle, faqs },
        }).unwrap();
      }
      await refetch();
    } catch (err) {
      console.error("❌ Error saving FAQ:", err);
    }
    resetDialog();
  };

  // Delete section
  const confirmDelete = (id: string | number) => {
    setDeleteId(id.toString());
    setDeleteOpen(true);
  };

  const handleDeleteSection = async () => {
    if (!deleteId) return;
    try {
      await deleteFAQ(deleteId).unwrap();
      await refetch();
    } catch (err) {
      console.error("❌ Error deleting section:", err);
    }
    setDeleteOpen(false);
    setDeleteId(null);
  };

  // Edit section
  const handleEditSection = (section: FAQSection) => {
    setEditingSection(section);
    setSectionTitle(section.sectionTitle);
    setFaqs(
      section.faqs.length
        ? section.faqs.map((faq) => ({ ...faq }))
        : [{ question: "", answer: "" }]
    );
    setOpen(true);
  };

  const handleAddSection = () => {
    setEditingSection(null);
    setSectionTitle("");
    setFaqs([{ question: "", answer: "" }]);
    setOpen(true);
  };

  const resetDialog = () => {
    setSectionTitle("");
    setFaqs([{ question: "", answer: "" }]);
    setEditingSection(null);
    setOpen(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage FAQs</h1>
        <Button
          onClick={handleAddSection}
          className="bg-accent-orange hover:bg-orange-600"
        >
          + Add Section
        </Button>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {faqSections?.map((section) => (
          <Card key={section.id} className="shadow-sm">
            <CardContent>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold">
                  {section.sectionTitle}
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditSection(section)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() =>
                      section.id && confirmDelete(section.id)
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {section.faqs?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 border rounded-md flex justify-between items-start"
                  >
                    <div>
                      <p className="font-medium">{item.question}</p>
                      <p className="text-sm text-gray-600">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingSection ? "Edit Section & FAQs" : "Add Section & FAQs"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Section Title"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
            />
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-md p-3 space-y-2">
                  <Input
                    placeholder="Question"
                    value={faq.question}
                    onChange={(e) =>
                      handleFaqChange(index, "question", e.target.value)
                    }
                  />
                  <Textarea
                    placeholder="Answer"
                    rows={3}
                    value={faq.answer}
                    onChange={(e) =>
                      handleFaqChange(index, "answer", e.target.value)
                    }
                  />
                  {faqs.length > 1 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveFaqField(index)}
                    >
                      Remove FAQ
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddFaqField}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Add FAQ
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={resetDialog}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-accent-orange hover:bg-orange-600"
            >
              {editingSection ? "Update Section" : "Save Section"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Modal */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Section</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this FAQ section?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteSection}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFAQ;
