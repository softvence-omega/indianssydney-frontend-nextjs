"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export type Article = {
  id: string;
  contentType?: "ARTICLE" | "VIDEO" | "PODCAST";
  title: string;
  description: string;
  author: string;
  date: string;
  status: "recent" | "PENDING" | "APPROVE" | "Declined";
  negativity?: {
    score: number;
    positives: string[];
    negatives: string[];
  };
  compareResult?: any;
};

const ArticleCard: React.FC<{
  article: Article;
  onStatusChange: (id: string, status: "APPROVE" | "Declined") => void;
}> = ({ article, onStatusChange }) => {
  const router = useRouter();

  // Use compareResult directly, as it's normalized in ArticlesPage
  const parsedCompare = article.compareResult || null;

  // Open details page based on contentType
  const handleOpenDetails = () => {
    switch (article.contentType) {
      case "ARTICLE":
        router.push(`/details/article/${article.id}`);
        break;
      case "VIDEO":
        router.push(`/details/video/${article.id}`);
        break;
      case "PODCAST":
        router.push(`/details/podcast/${article.id}`);
        break;
      default:
        console.warn("Unknown content type:", article.contentType);
        break;
    }
  };

  return (
    <Card className="mb-4 shadow-none">
      <CardContent>
        {/* Article Info */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          <div
            onClick={handleOpenDetails}
            className="w-full cursor-pointer"
            title="View details"
          >
            <h2 className="font-semibold text-lg">{article.title}</h2>

            {/* Summary */}
            <p className="text-sm text-gray-600 line-clamp-3">
              {parsedCompare?.short_summary_diff?.trim() ||
                "No comparison summary available."}
            </p>

            <p className="text-xs mt-2 text-gray-500">
              Author - {article.author} | {article.date}
            </p>
          </div>

          {/* Status / Actions */}
          <div className="flex gap-2 shrink-0">
            {article.status === "APPROVE" ? (
              <Badge className="bg-green-500 text-white">Approved</Badge>
            ) : article.status === "Declined" ? (
              <Badge className="bg-red-500 text-white">Declined</Badge>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-green-50"
                  onClick={() => onStatusChange(article.id, "APPROVE")}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500 text-red-600 hover:bg-red-50"
                  onClick={() => onStatusChange(article.id, "Declined")}
                >
                  Decline
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Accordion: AI Compare Result */}
        {parsedCompare && (
          <Accordion
            type="single"
            collapsible
            className="mt-4 bg-gray-100 px-4 rounded-2xl"
          >
            <AccordionItem value="compare-result">
              <AccordionTrigger>
                Content Alignment Report (
                {parsedCompare.percentage_not_aligned ?? "N/A"}% not aligned)
              </AccordionTrigger>
              <AccordionContent>
                <div className="mb-3 space-y-1">
                  <p className="text-sm">
                    <strong>Matched File:</strong>{" "}
                    {parsedCompare.matched_filename || "N/A"}
                  </p>
                  <p className="text-sm">
                    <strong>Not Aligned:</strong>{" "}
                    {parsedCompare.percentage_not_aligned ?? "N/A"}%
                  </p>
                </div>

                <div className="bg-white p-3 rounded-md border text-sm whitespace-pre-line">
                  {parsedCompare.short_summary_diff ||
                    "No comparison summary available."}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
