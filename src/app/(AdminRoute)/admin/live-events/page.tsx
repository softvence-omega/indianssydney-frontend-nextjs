"use client";

import React, { useState } from "react";
import DashboardHeader from "@/components/reusable/DashboardHeader";
import LiveEventCard, { LiveEvent } from "./LiveEventCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  about: z.string().min(1, "About is required"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  coverImage: z.custom<File>((file) => file instanceof File, {
    message: "Cover image is required",
  }),
});

type FormData = z.infer<typeof eventSchema>;
type LiveEventStatus = "current" | "past" | "upcoming";

export const demoLiveEvents: LiveEvent[] = [
  {
    id: "1",
    title: "Next.js Best Practices",
    description: "Learn how to build scalable Next.js apps.",
    coverImage: "/register.png",
    author: "John Doe",
    date: "2025-09-01",
    startTime: "09:00",
    endTime: "16:00",
    status: "current",
  },
  {
    id: "2",
    title: "React Performance Workshop",
    description: "Optimize your React apps for speed.",
    coverImage: "/register.png",
    author: "Jane Smith",
    date: "2025-09-03",
    startTime: "15:00",
    endTime: "16:30",
    status: "upcoming",
  },
  {
    id: "3",
    title: "AI in Web Development",
    description: "How AI is transforming frontend workflows.",
    coverImage: "/register.png",
    author: "Alex Johnson",
    date: "2025-08-25",
    startTime: "11:00",
    endTime: "12:00",
    status: "past",
  },
];

const LiveEventsPage = () => {
  const [filter, setFilter] = useState<LiveEventStatus>("current");
  const [events, setEvents] = useState<LiveEvent[]>(demoLiveEvents);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const now = new Date();
  const defaultDate = now.toISOString().split("T")[0];
  const defaultTime = now.toTimeString().slice(0, 5);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      date: defaultDate,
      startTime: defaultTime,
      endTime: defaultTime,
    },
    mode: "onSubmit", // Validate on submit
  });

  const filteredEvents = events.filter((event) => event.status === filter);

  const onSubmit = async (data: FormData) => {
    try {
      const newEvent: LiveEvent = {
        id: String(events.length + 1),
        title: data.title,
        description: data.about,
        coverImage: preview || "/placeholder.png",
        author: "Admin",
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        status: "upcoming",
      };

      setEvents((prev) => [...prev, newEvent]);
      console.log("New Event:", newEvent);
      // alert(`Event Created: ${JSON.stringify(newEvent, null, 2)}`);
      toast.success("Event created successfully!");
      reset();
      setPreview(null);
      setOpen(false);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Set coverImage without triggering full form validation
      setValue("coverImage", file, { shouldValidate: false });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <DashboardHeader title="Live Events" />
        <Button
          className="bg-accent-orange hover:bg-orange-500"
          onClick={() => setOpen(true)}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Live Event
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        {["current", "upcoming", "past"].map((tab) => (
          <button
            key={tab}
            className={`cursor-pointer ${
              filter === tab
                ? "text-accent-orange font-semibold"
                : "text-gray-600"
            }`}
            onClick={() => setFilter(tab as LiveEventStatus)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <LiveEventCard key={event.id} live={event} />
        ))
      ) : (
        <p className="text-sm text-gray-500">No {filter} events available.</p>
      )}

      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            if (preview) URL.revokeObjectURL(preview); // Clean up preview URL
            reset();
            setPreview(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Live Event</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="Event title" {...register("title")} />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>About</Label>
              <Textarea
                placeholder="Event description"
                {...register("about")}
              />
              {errors.about && (
                <p className="text-red-500 text-sm">{errors.about.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" {...register("date")} />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input type="time" {...register("startTime")} />
                {errors.startTime && (
                  <p className="text-red-500 text-sm">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>End Time</Label>
                <Input type="time" {...register("endTime")} />
                {errors.endTime && (
                  <p className="text-red-500 text-sm">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {errors.coverImage && (
                <p className="text-red-500 text-sm">
                  {errors.coverImage.message}
                </p>
              )}
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 w-full h-40 object-cover rounded-md border"
                />
              )}
            </div>

            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent-orange hover:bg-orange-500"
                disabled={isSubmitting}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LiveEventsPage;