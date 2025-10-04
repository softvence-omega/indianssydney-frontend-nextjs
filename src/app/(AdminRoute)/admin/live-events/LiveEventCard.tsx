"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

export type LiveEvent = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "current" | "upcoming" | "past";
};

const LiveEventCard: React.FC<{ live: LiveEvent }> = ({ live }) => {
  const now = new Date();

  // event start & end datetime
  const eventStart = useMemo(
    () => new Date(`${live.date}T${live.startTime}:00`),
    [live.date, live.startTime]
  );
  const eventEnd = useMemo(
    () => new Date(`${live.date}T${live.endTime}:00`),
    [live.date, live.endTime]
  );

  const isActive =
    live.status !== "past" && now >= eventStart && now <= eventEnd;

  return (
    <Card className="mb-4 shadow-none py-4">
      <CardContent className="px-4">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div className="flex flex-row gap-4">
            <img
              src={live.coverImage}
              className="h-24 w-32 object-cover object-center rounded-lg"
              alt={live.title}
            />
            <div>
              <h2 className="font-semibold text-lg line-clamp-1">
                {live.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-1">
                {live.description}
              </p>
              <p className="text-xs mt-2 text-gray-500">
                Host - {live.author} | {live.date} ({live.startTime} -{" "}
                {live.endTime})
              </p>
            </div>
          </div>

          {live.status !== "past" && (
            <Button
              disabled={!isActive}
              className={`${
                isActive
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white`}
            >
              Go Live
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveEventCard;
