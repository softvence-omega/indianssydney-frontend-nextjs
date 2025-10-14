import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export type Article = {
  id: string;
  contentType?: string;
  title: string;
  description: string;
  author: string;
  date: string;
  status: "recent" | "PENDING" | "APPROVE" | "Declined";
  negativity: {
    score: number;
    positives: string[];
    negatives: string[];
  };
  compareResult?: {
    matched_filename: string;
    percentage_not_aligned: number;
    short_summary_diff: string;
  } | null;
};

const ArticleCard: React.FC<{
  article: Article;
  onStatusChange: (id: string, status: "APPROVE" | "Declined") => void;
}> = ({ article, onStatusChange }) => {
  const router = useRouter();
  const handleOpenDetails = () => {
    if (article.contentType === "ARTICLE")
      router.push(`/details/article/${article.id}`);
    else if (article.contentType === "VIDEO")
      router.push(`/details/video/${article.id}`);
    else if (article.contentType === "PODCAST")
      router.push(`/details/video/${article.id}`);
  };
  return (
    <Card className="mb-4 shadow-none">
      <CardContent>
        {/* Article Info */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          <div className="w-full">
            <div onClick={handleOpenDetails} className="cursor-pointer">
              <h2 className="font-semibold text-lg">{article.title}</h2>
              <p className="text-sm text-gray-600">{article.description}</p>
              <p className="text-xs mt-2 text-gray-500">
                Author - {article.author} | {article.date}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {article.status === "APPROVE" ? (
              <Badge className="bg-green-500 text-white">Approved</Badge>
            ) : article.status === "Declined" ? (
              <Badge className="bg-red-500 text-white">Declined</Badge>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-500 text-green-600"
                  onClick={() => onStatusChange(article.id, "APPROVE")}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500 text-red-600"
                  onClick={() => onStatusChange(article.id, "Declined")}
                >
                  Decline
                </Button>
              </>
            )}
          </div>
        </div>

        {/* AI Compare Result Accordion */}
        {article.compareResult && (
          <Accordion
            type="single"
            collapsible
            className="mt-4 bg-gray-100 px-4 rounded-2xl"
          >
            <AccordionItem value="compare-result">
              <AccordionTrigger>
                Content Alignment Report (
                {article.compareResult.percentage_not_aligned}% not aligned)
              </AccordionTrigger>
              <AccordionContent>
                <div className="mb-3">
                  <p className="text-sm">
                    <strong>Matched File:</strong>{" "}
                    {article.compareResult.matched_filename}
                  </p>
                  <p className="text-sm">
                    <strong>Not Aligned:</strong>{" "}
                    {article.compareResult.percentage_not_aligned}%
                  </p>
                </div>

                <div className="bg-white p-3 rounded-md border text-sm whitespace-pre-line">
                  {article.compareResult.short_summary_diff}
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
