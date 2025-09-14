"use client";

import React, { useState } from "react";
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

// Types
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQSection {
  id: number;
  sectionTitle: string;
  items: FAQItem[];
}

const AdminFAQ = () => {
  const [faqSections, setFaqSections] = useState<FAQSection[]>([
    {
      id: 1,
      sectionTitle: "General FAQs",
      items: [
        { id: 1, question: "What we need from you?", answer: "Lorem Ipsum..." },
        {
          id: 2,
          question: "How we protect your data?",
          answer: "Lorem Ipsum...",
        },
      ],
    },
    {
      id: 2,
      sectionTitle: "Privacy Policies",
      items: [{ id: 3, question: "Cookie Policy", answer: "Lorem Ipsum..." }],
    },
  ]);

  // Dialog State
  const [open, setOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<FAQSection | null>(null);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [isSectionMode, setIsSectionMode] = useState(false);

  const [form, setForm] = useState({ title: "", question: "", answer: "" });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save section or item
  const handleSave = () => {
    if (isSectionMode) {
      if (editingSection) {
        // Update Section
        setFaqSections((prev) =>
          prev.map((sec) =>
            sec.id === editingSection.id
              ? { ...sec, sectionTitle: form.title }
              : sec
          )
        );
      } else {
        // Add New Section
        setFaqSections((prev) => [
          ...prev,
          { id: Date.now(), sectionTitle: form.title, items: [] },
        ]);
      }
    } else {
      if (editingSection && editingItem) {
        // Update Item
        setFaqSections((prev) =>
          prev.map((sec) =>
            sec.id === editingSection.id
              ? {
                  ...sec,
                  items: sec.items.map((it) =>
                    it.id === editingItem.id
                      ? { ...it, question: form.question, answer: form.answer }
                      : it
                  ),
                }
              : sec
          )
        );
      } else if (editingSection) {
        // Add New Item
        setFaqSections((prev) =>
          prev.map((sec) =>
            sec.id === editingSection.id
              ? {
                  ...sec,
                  items: [
                    ...sec.items,
                    {
                      id: Date.now(),
                      question: form.question,
                      answer: form.answer,
                    },
                  ],
                }
              : sec
          )
        );
      }
    }

    // Reset form
    setForm({ title: "", question: "", answer: "" });
    setEditingItem(null);
    setEditingSection(null);
    setIsSectionMode(false);
    setOpen(false);
  };

  // Delete section
  const handleDeleteSection = (id: number) => {
    setFaqSections((prev) => prev.filter((sec) => sec.id !== id));
  };

  // Delete item
  const handleDeleteItem = (sectionId: number, itemId: number) => {
    setFaqSections((prev) =>
      prev.map((sec) =>
        sec.id === sectionId
          ? { ...sec, items: sec.items.filter((it) => it.id !== itemId) }
          : sec
      )
    );
  };

  // Edit section
  const handleEditSection = (section: FAQSection) => {
    setEditingSection(section);
    setForm({ title: section.sectionTitle, question: "", answer: "" });
    setIsSectionMode(true);
    setOpen(true);
  };

  // Edit item
  const handleEditItem = (section: FAQSection, item: FAQItem) => {
    setEditingSection(section);
    setEditingItem(item);
    setForm({ title: "", question: item.question, answer: item.answer });
    setIsSectionMode(false);
    setOpen(true);
  };

  // Add section
  const handleAddSection = () => {
    setForm({ title: "", question: "", answer: "" });
    setIsSectionMode(true);
    setEditingSection(null);
    setOpen(true);
  };

  // Add item
  const handleAddItem = (section: FAQSection) => {
    setForm({ title: "", question: "", answer: "" });
    setIsSectionMode(false);
    setEditingSection(section);
    setEditingItem(null);
    setOpen(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage FAQs</h1>
        <Button onClick={handleAddSection} className="bg-accent-orange hover:bg-orange-600">
         + Add Section
        </Button>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {faqSections.map((section) => (
          <Card key={section.id} className="shadow-sm">
            <CardContent className="p-4">
              {/* Section Title */}
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
                    onClick={() => handleDeleteSection(section.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button className="bg-accent-orange hover:bg-orange-600" size="sm" onClick={() => handleAddItem(section)}>
                    + FAQ
                  </Button>
                </div>
              </div>

              {/* Section Items */}
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 border rounded-md flex justify-between items-start"
                  >
                    <div>
                      <p className="font-medium">{item.question}</p>
                      <p className="text-sm text-gray-600">{item.answer}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditItem(section, item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteItem(section.id, item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isSectionMode
                ? editingSection
                  ? "Edit Section"
                  : "Add Section"
                : editingItem
                ? "Edit FAQ"
                : "Add FAQ"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {isSectionMode ? (
              <Input
                name="title"
                placeholder="Section Title"
                value={form.title}
                onChange={handleChange}
              />
            ) : (
              <>
                <Input
                  name="question"
                  placeholder="Question"
                  value={form.question}
                  onChange={handleChange}
                />
                <Textarea
                  name="answer"
                  placeholder="Answer"
                  rows={4}
                  value={form.answer}
                  onChange={handleChange}
                />
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-accent-orange hover:bg-orange-600">
              {editingSection || editingItem ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFAQ;
