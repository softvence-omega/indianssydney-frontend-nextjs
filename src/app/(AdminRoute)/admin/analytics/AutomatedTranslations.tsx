interface TranslationData {
  from: string;
  to: string;
  count: number;
}

const AutomatedTranslations: React.FC = () => {
  const translations: TranslationData[] = [
    { from: "English", to: "Hindi", count: 125 },
    { from: "English", to: "Punjabi", count: 96 },
    { from: "English", to: "Tamil", count: 76 },
    { from: "English", to: "Urdu", count: 65 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Automated Translations
      </h3>
      <div className="space-y-3">
        {translations.map((translation, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 hover:bg-gray-50 rounded px-2 transition-colors"
          >
            <div className="text-sm text-gray-700">
              {translation.from} → {translation.to}
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {translation.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomatedTranslations;
