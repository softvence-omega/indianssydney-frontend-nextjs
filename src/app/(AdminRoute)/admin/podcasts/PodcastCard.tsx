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

export type Podcast = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  date: string;
  status: "recent" | "pending" | "approved" | "declined";
  negativity: {
    score: number;
    positives: string[];
    negatives: string[];
  };
};

const PodcastCard: React.FC<{
  podcast: Podcast;
  onStatusChange: (id: string, status: "approved" | "declined") => void;
}> = ({ podcast, onStatusChange }) => {
  return (
    <Card className="mb-4 shadow-none">
      <CardContent>
        {/* Article Info */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          <div className="flex gap-4">
            <div className="">
              <img src={podcast.coverImage} className="h-28 w-32 object-cover object-center rounded-lg" alt="" />
            </div>
            <div className="">
              <h2 className="font-semibold text-lg line-clamp-2">{podcast.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{podcast.description}</p>
              <p className="text-xs mt-2 text-gray-500">
                Author - {podcast.author} | {podcast.date}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {podcast.status === "approved" ? (
              <Badge className="bg-green-500 text-white">Approved</Badge>
            ) : podcast.status === "declined" ? (
              <Badge className="bg-red-500 text-white">Declined</Badge>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-500 text-green-600"
                  onClick={() => onStatusChange(podcast.id, "approved")}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500 text-red-600"
                  onClick={() => onStatusChange(podcast.id, "declined")}
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
              Negativity Estimate by AI ({podcast.negativity.score}%)
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slight-border/30">
                <Badge
                  className={`text-white ${
                    podcast.negativity.score > 50 ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {podcast.negativity.score}%
                </Badge>
                <span className="text-sm">Negativity Estimate by AI</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {podcast.negativity.positives.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-green-600 text-sm"
                  >
                    <CheckCircle size={16} /> {p}
                  </div>
                ))}
                {podcast.negativity.negatives.map((n, i) => (
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

export default PodcastCard;
