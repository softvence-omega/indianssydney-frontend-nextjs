"use client";

import React, { useState, useMemo } from "react";
import DashboardHeader from "@/components/reusable/DashboardHeader";
import { Button } from "@/components/ui/button";
import { PlusIcon, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import LiveEventCard, { LiveEvent } from "./LiveEventCard";
import {
  useCreateNewLiveMutation,
  useGetAllLiveEventQuery,
} from "@/store/features/live-events/live.api";

// ✅ Validation Schema
const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().min(1, "Subtitle is required"),
  thumbnail: z.custom<File>((file) => file instanceof File, {
    message: "Thumbnail is required",
  }),
  tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .nonempty("At least one tag is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  youtubeLiveUrl: z.string().url("Must be a valid YouTube URL"),
});

type FormData = z.infer<typeof eventSchema>;

const LiveEventsPage = () => {
  const { data, isLoading, isError } = useGetAllLiveEventQuery({});
  const [createLiveEvent, { isLoading: isCreating }] =
    useCreateNewLiveMutation();

  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: { tags: [""] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  // ✅ Map backend data to card format
  const liveEvents: LiveEvent[] = useMemo(() => {
    if (!data) return [];
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.subTitle,
      coverImage: item.thumbnail,
      author: item?.user?.fullName || "Admin",
      date: new Date(item.startTime).toLocaleDateString(),
      startTime: new Date(item.startTime).toLocaleTimeString(),
      endTime: new Date(item.endTime).toLocaleTimeString(),
      status: "upcoming", // static, no filter now
    }));
  }, [data]);

  // ✅ Create New Event
  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("subTitle", data.subTitle);
      formData.append("thumbnail", data.thumbnail);
      data.tags.forEach((tag, i) => formData.append(`tags[${i}]`, tag));
      formData.append("startTime", new Date(data.startTime).toISOString());
      formData.append("endTime", new Date(data.endTime).toISOString());
      formData.append("youtubeLiveUrl", data.youtubeLiveUrl);

      const res = await createLiveEvent(formData).unwrap();

      if (res?.success) {
        toast.success("Live event created successfully!");
        setOpen(false);
        reset();
        setPreview(null);
      } else {
        toast.error(res?.message || "Failed to create event");
      }
    } catch (error: any) {
      console.error("Error creating live event:", error);
      toast.error(error?.data?.message || "Failed to create event");
    }
  };

  // ✅ Image Upload Preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("thumbnail", file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <DashboardHeader title="Live Events" />
        <Button
          className="bg-accent-orange hover:bg-orange-500"
          onClick={() => setOpen(true)}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Live Event
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin mr-2" /> Loading live events...
        </div>
      )}

      {/* Error State */}
      {isError && (
        <p className="text-red-500 text-sm text-center">
          Failed to fetch live events.
        </p>
      )}

      {/* Events List (No Tabs — All shown) */}
      {!isLoading && liveEvents.length > 0 ? (
        <div className="grid gap-4">
          {liveEvents.map((event) => (
            <LiveEventCard key={event.id} live={event} />
          ))}
        </div>
      ) : (
        !isLoading && (
          <p className="text-gray-500 text-sm text-center mt-4">
            No live events available.
          </p>
        )
      )}

      {/* Add Event Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Live Event</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input placeholder="Event title" {...register("title")} />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Subtitle */}
            <div className="space-y-2">
              <Label>Subtitle *</Label>
              <Input placeholder="Short description" {...register("subTitle")} />
              {errors.subTitle && (
                <p className="text-red-500 text-sm">
                  {errors.subTitle.message}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags *</Label>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <Input
                    placeholder={`Tag ${index + 1}`}
                    {...register(`tags.${index}`)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => append("")}
                className="text-sm"
              >
                + Add Tag
              </Button>
              {errors.tags && (
                <p className="text-red-500 text-sm">
                  {errors.tags.message as string}
                </p>
              )}
            </div>

            {/* Start / End Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time *</Label>
                <Input type="datetime-local" {...register("startTime")} />
                {errors.startTime && (
                  <p className="text-red-500 text-sm">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>End Time *</Label>
                <Input type="datetime-local" {...register("endTime")} />
                {errors.endTime && (
                  <p className="text-red-500 text-sm">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>

            {/* YouTube URL */}
            <div className="space-y-2">
              <Label>YouTube Live URL *</Label>
              <Input
                placeholder="https://youtube.com/live/..."
                {...register("youtubeLiveUrl")}
              />
              {errors.youtubeLiveUrl && (
                <p className="text-red-500 text-sm">
                  {errors.youtubeLiveUrl.message}
                </p>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <Label>Thumbnail *</Label>
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
              {errors.thumbnail && (
                <p className="text-red-500 text-sm">
                  {errors.thumbnail.message}
                </p>
              )}
              {preview && (
                <img
                  src={preview}
                  alt="Thumbnail Preview"
                  className="mt-2 w-full h-40 object-cover rounded-md border"
                />
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent-orange hover:bg-orange-500"
                disabled={isCreating}
              >
                {isCreating && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Event
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LiveEventsPage;
