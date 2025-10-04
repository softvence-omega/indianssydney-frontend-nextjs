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
import Link from "next/link";

export type Article = {
  id: string;
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
};

const ArticleCard: React.FC<{
  article: Article;
  onStatusChange: (id: string, status: "APPROVE" | "Declined") => void;
}> = ({ article, onStatusChange }) => {
  return (
    <Card className="mb-4 shadow-none">
      <CardContent>
        {/* Article Info */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          <Link href={`/details/article/${article.id}`} className="w-full">
            <div>
              <h2 className="font-semibold text-lg">{article.title}</h2>
              <p className="text-sm text-gray-600">{article.description}</p>
              <p className="text-xs mt-2 text-gray-500">
                Author - {article.author} | {article.date}
              </p>
            </div>
          </Link>

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

        {/* AI Analysis Accordion */}
        <Accordion
          type="single"
          collapsible
          className="mt-4 bg-gray-100 px-4 rounded-2xl"
        >
          <AccordionItem value="ai-analysis">
            <AccordionTrigger>
              Negativity Estimate by AI ({article.negativity.score}%)
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slight-border/30">
                <Badge
                  className={`text-white ${
                    article.negativity.score > 50
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {article.negativity.score}%
                </Badge>
                <span className="text-sm">Negativity Estimate by AI</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {article.negativity.positives.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-green-600 text-sm"
                  >
                    <CheckCircle size={16} /> {p}
                  </div>
                ))}
                {article.negativity.negatives.map((n, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-red-600 text-sm"
                  >
                    <XCircle size={16} /> {n}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
