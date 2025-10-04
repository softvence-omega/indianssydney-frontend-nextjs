"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface LLMOption {
  id: number;
  platform: string;
  model: string;
  apiKey: string;
}

const AdminLLMOption = () => {
  const [options, setOptions] = useState<LLMOption[]>([
    { id: 1, platform: "Open AI", model: "GPT3.5-16K", apiKey: "Ajabd2121dasjdndiw" },
    { id: 2, platform: "Open AI", model: "GPT4", apiKey: "Ajabd2121dasjdndiw" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOption, setEditingOption] = useState<LLMOption | null>(null);

  const [platform, setPlatform] = useState("");
  const [model, setModel] = useState("");
  const [apiKey, setApiKey] = useState("");

  // Open modal (for add or edit)
  const openModal = (option?: LLMOption) => {
    if (option) {
      setEditingOption(option);
      setPlatform(option.platform);
      setModel(option.model);
      setApiKey(option.apiKey);
    } else {
      setEditingOption(null);
      setPlatform("");
      setModel("");
      setApiKey("");
    }
    setIsModalOpen(true);
  };

  // Save LLM Option
  const handleSave = () => {
    if (!platform || !model || !apiKey) return;

    if (editingOption) {
      setOptions((prev) =>
        prev.map((o) =>
          o.id === editingOption.id ? { ...o, platform, model, apiKey } : o
        )
      );
    } else {
      setOptions((prev) => [
        ...prev,
        { id: Date.now(), platform, model, apiKey },
      ]);
    }

    setIsModalOpen(false);
  };

  // Delete option
  const handleDelete = (id: number) => {
    setOptions((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 text-center md:text-left  items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">LLM Option</h2>
          <p className="text-sm text-gray-500">
            Add your API keys for AI integration.
          </p>
        </div>
        <Button
          className="bg-orange-600 hover:bg-orange-700"
          onClick={() => openModal()}
        >
          Add New +
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">AI</th>
              <th className="px-4 py-2 text-left">Model</th>
              <th className="px-4 py-2 text-left">API Key</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {options.map((opt) => (
              <tr key={opt.id} className="border-t text-nowrap">
                <td className="px-4 py-3 ">{opt.platform}</td>
                <td className="px-4 py-3">{opt.model}</td>
                <td className="px-4 py-3">{opt.apiKey}</td>
                <td className="px-4 py-3 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openModal(opt)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(opt.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingOption ? "Update LLM Option" : "Add LLM Option"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* AI Platform */}
            <div>
              <label className="text-sm font-medium">AI Platform</label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select AI Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open AI">Open AI</SelectItem>
                  <SelectItem value="Anthropic">Anthropic</SelectItem>
                  <SelectItem value="Google Gemini">Google Gemini</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Model */}
            <div>
              <label className="text-sm font-medium">Model</label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GPT3.5-16K">GPT3.5-16K</SelectItem>
                  <SelectItem value="GPT4">GPT4</SelectItem>
                  <SelectItem value="Claude 2">Claude 2</SelectItem>
                  <SelectItem value="Gemini Pro">Gemini Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* API Key */}
            <div>
              <label className="text-sm font-medium">API Key</label>
              <Input
                type="text"
                placeholder="Enter API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-orange-600 hover:bg-orange-700"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLLMOption;
