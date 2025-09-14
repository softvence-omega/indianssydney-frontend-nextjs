"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

interface Language {
  langCode: string;
  langEnglishName: string;
  langNativeName: string;
}

interface SelectedLanguage {
  code: string;
  name: string;
  nativeName: string;
}

// ✅ Manual list of languages (South Asian + European)
const MANUAL_LANGUAGES: Language[] = [
  { langCode: "hi", langEnglishName: "Hindi", langNativeName: "हिन्दी" },
  { langCode: "bn", langEnglishName: "Bengali", langNativeName: "বাংলা" },
  { langCode: "ur", langEnglishName: "Urdu", langNativeName: "اُردُو" },
  { langCode: "ta", langEnglishName: "Tamil", langNativeName: "தமிழ்" },
  { langCode: "te", langEnglishName: "Telugu", langNativeName: "తెలుగు" },
  { langCode: "ml", langEnglishName: "Malayalam", langNativeName: "മലയാളം" },
  { langCode: "en", langEnglishName: "English", langNativeName: "English" },
  { langCode: "fr", langEnglishName: "French", langNativeName: "Français" },
  { langCode: "de", langEnglishName: "German", langNativeName: "Deutsch" },
  { langCode: "es", langEnglishName: "Spanish", langNativeName: "Español" },
];

// ✅ Demo pre-added languages (static for frontend preview)
const DEMO_LANGUAGES: SelectedLanguage[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "fr", name: "French", nativeName: "Français" },
];

const AdminLanguageSetting = () => {
  const [languages, setLanguages] = useState<SelectedLanguage[]>(DEMO_LANGUAGES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLangCode, setSelectedLangCode] = useState<string>("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleAddLanguage = () => {
    if (!selectedLangCode) return;
    const lang = MANUAL_LANGUAGES.find((l) => l.langCode === selectedLangCode);
    if (!lang) return;

    const newLang: SelectedLanguage = {
      code: lang.langCode,
      name: lang.langEnglishName,
      nativeName: lang.langNativeName,
    };

    // Prevent duplicate
    if (languages.some((l) => l.code === newLang.code)) return;

    setLanguages((prev) => [...prev, newLang]);
    setIsModalOpen(false);
    setSelectedLangCode("");
  };

  const handleDeleteLanguage = (code: string) => {
    setLanguages((prev) => prev.filter((l) => l.code !== code));
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Language Setting</h2>
      <p className="text-sm text-gray-500 mb-6">
        Add or remove language to your site.
      </p>

      {/* Already added languages */}
      <div className="space-y-3 mb-6">
        {languages.map((lang) => (
          <div
            key={lang.code}
            className="flex items-center justify-between bg-white shadow-sm px-4 py-3 rounded-lg"
          >
            <span>
              {lang.name} ({lang.nativeName})
            </span>
            <button
              onClick={() => handleDeleteLanguage(lang.code)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <Button className="bg-accent-orange hover:bg-orange-600" onClick={openModal}>Add New</Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a Language</DialogTitle>
          </DialogHeader>

          <Select
            value={selectedLangCode}
            onValueChange={(val) => setSelectedLangCode(val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a language" />
            </SelectTrigger>
            <SelectContent>
              {MANUAL_LANGUAGES.map((lang) => (
                <SelectItem key={lang.langCode} value={lang.langCode}>
                  {lang.langEnglishName} — {lang.langNativeName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-accent-orange hover:bg-orange-600" onClick={handleAddLanguage} disabled={!selectedLangCode}>
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLanguageSetting;
