"use client";

import React, { useState, useMemo, useEffect } from "react";
import DashboardHeader from "@/components/reusable/DashboardHeader";
import { Button } from "@/components/ui/button";
import { PlusIcon, Loader2, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
  useDeleteLiveEventMutation,
  useGetAllLiveEventQuery,
  useGetSingleLiveEventQuery,
  useUpdateLiveEventMutation,
} from "@/store/features/live-events/live.api";

// Extend LiveEvent type to include youtubeLiveUrl and tags
interface ExtendedLiveEvent extends LiveEvent {
  youtubeLiveUrl: string;
  tags: string[];
}

// Validation Schema
const eventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().min(1, "Subtitle is required"),
  thumbnail: z.custom<File | string>(
    (val) => val instanceof File || typeof val === "string",
    {
      message: "Thumbnail is required",
    }
  ),
  tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .nonempty("At least one tag is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  youtubeLiveUrl: z.string().url("Must be a valid YouTube URL"),
});

type FormData = z.infer<typeof eventSchema>;

// Create Event Modal Component
const CreateEventModal = ({
  open,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      tags: [""],
      youtubeLiveUrl: "",
      startTime: "",
      endTime: "",
      thumbnail: "",
    },
    mode: "onChange", // Validate on change for better UX
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const thumbnailValue = watch("thumbnail");

  // Clear form when modal opens
  useEffect(() => {
    if (open) {
      clearForm();
    }
  }, [open]);

  // Update preview when thumbnail changes
  useEffect(() => {
    if (thumbnailValue instanceof File) {
      const previewUrl = URL.createObjectURL(thumbnailValue);
      setPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl); // Cleanup
    } else {
      setPreview(null);
    }
  }, [thumbnailValue]);

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("thumbnail", file, { shouldValidate: true });
    } else {
      setValue("thumbnail", "", { shouldValidate: true });
    }
  };

  const handleFormSubmit = async (data: FormData) => {
    // Additional validation check
    const isValid = await trigger();
    if (!isValid) {
      toast.error("Please fix the form errors before submitting");
      return;
    }

    // Check if thumbnail is a file
    if (!(data.thumbnail instanceof File)) {
      toast.error("Please upload a thumbnail image");
      return;
    }

    onSubmit(data);
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  const clearForm = () => {
    reset({
      title: "",
      subTitle: "",
      tags: [""],
      youtubeLiveUrl: "",
      startTime: "",
      endTime: "",
      thumbnail: "",
    });
    setPreview(null);

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddTag = () => {
    append("");
  };

  const handleRemoveTag = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Live Event</DialogTitle>
          <DialogDescription>
            Add a new live event to your schedule.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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
              <p className="text-red-500 text-sm">{errors.subTitle.message}</p>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags *</Label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <Input
                  placeholder={`Tag ${index + 1}`}
                  {...register(`tags.${index}` as const)}
                />
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleRemoveTag(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddTag}
              className="text-sm"
            >
              + Add Tag
            </Button>
            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags.message}</p>
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
                <p className="text-red-500 text-sm">{errors.endTime.message}</p>
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
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
            />
            {errors.thumbnail && (
              <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
            )}
            {preview && (
              <img
                src={preview}
                alt="Thumbnail Preview"
                className="mt-2 w-full h-40 object-cover rounded-md border"
              />
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={clearForm}
              disabled={isSubmitting}
            >
              Clear Form
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-accent-orange hover:bg-orange-500"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Edit Event Modal Component
const EditEventModal = ({
  open,
  onClose,
  onSubmit,
  isSubmitting,
  eventId,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
  eventId: string | null;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    data: singleEvent,
    isLoading: isSingleLoading,
    isError: isSingleError,
  } = useGetSingleLiveEventQuery(eventId!, {
    skip: !eventId || !open,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      tags: [""],
      youtubeLiveUrl: "",
      startTime: "",
      endTime: "",
      thumbnail: "",
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const thumbnailValue = watch("thumbnail");

  // Populate form when event data is loaded
  useEffect(() => {
    if (singleEvent && open) {
      const thumbnailUrl = singleEvent.thumbnail;
      setPreview(thumbnailUrl || null);

      // Set all form values
      setValue("id", singleEvent.id);
      setValue("title", singleEvent.title);
      setValue("subTitle", singleEvent.subTitle);
      setValue("thumbnail", thumbnailUrl || "");
      setValue("tags", singleEvent.tags?.length > 0 ? singleEvent.tags : [""]);

      // Format dates for datetime-local input
      const startTime = new Date(singleEvent.startTime);
      const endTime = new Date(singleEvent.endTime);

      setValue("startTime", startTime.toISOString().slice(0, 16));
      setValue("endTime", endTime.toISOString().slice(0, 16));
      setValue("youtubeLiveUrl", singleEvent.youtubeLiveUrl || "");
    }
  }, [singleEvent, open, setValue]);

  // Clear form when modal closes
  useEffect(() => {
    if (!open) {
      clearForm();
    }
  }, [open]);

  // Update preview when thumbnail changes
  useEffect(() => {
    if (thumbnailValue instanceof File) {
      const previewUrl = URL.createObjectURL(thumbnailValue);
      setPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl); // Cleanup
    } else if (typeof thumbnailValue === "string" && thumbnailValue) {
      setPreview(thumbnailValue);
    } else {
      setPreview(null);
    }
  }, [thumbnailValue]);

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("thumbnail", file, { shouldValidate: true });
    }
  };

  const handleFormSubmit = async (data: FormData) => {
    // Additional validation check
    const isValid = await trigger();
    if (!isValid) {
      toast.error("Please fix the form errors before submitting");
      return;
    }

    onSubmit(data);
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  const clearForm = () => {
    reset({
      title: "",
      subTitle: "",
      tags: [""],
      youtubeLiveUrl: "",
      startTime: "",
      endTime: "",
      thumbnail: "",
    });
    setPreview(null);

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddTag = () => {
    append("");
  };

  const handleRemoveTag = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleResetChanges = () => {
    if (singleEvent) {
      const thumbnailUrl = singleEvent.thumbnail;
      setPreview(thumbnailUrl || null);

      setValue("title", singleEvent.title);
      setValue("subTitle", singleEvent.subTitle);
      setValue("thumbnail", thumbnailUrl || "");
      setValue("tags", singleEvent.tags?.length > 0 ? singleEvent.tags : [""]);

      const startTime = new Date(singleEvent.startTime);
      const endTime = new Date(singleEvent.endTime);

      setValue("startTime", startTime.toISOString().slice(0, 16));
      setValue("endTime", endTime.toISOString().slice(0, 16));
      setValue("youtubeLiveUrl", singleEvent.youtubeLiveUrl || "");

      // Clear file input if we're resetting to original image
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success("Form reset to original values");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Live Event</DialogTitle>
          <DialogDescription>Update the live event details.</DialogDescription>
        </DialogHeader>

        {isSingleLoading && (
          <div className="flex justify-center items-center py-4">
            <Loader2 className="animate-spin mr-2" /> Loading event details...
          </div>
        )}

        {isSingleError && (
          <p className="text-red-500 text-sm text-center">
            Failed to load event details.
          </p>
        )}

        {singleEvent && !isSingleLoading && (
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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
              <Input
                placeholder="Short description"
                {...register("subTitle")}
              />
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
                    {...register(`tags.${index}` as const)}
                  />
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveTag(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
                className="text-sm"
              >
                + Add Tag
              </Button>
              {errors.tags && (
                <p className="text-red-500 text-sm">{errors.tags.message}</p>
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
              <Label>Thumbnail (Optional)</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
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
              {preview && (
                <p className="text-sm text-gray-500">
                  {typeof thumbnailValue === "string"
                    ? "Current thumbnail. Upload a new file to replace it."
                    : "New thumbnail preview."}
                </p>
              )}
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleResetChanges}
                disabled={isSubmitting}
              >
                Reset Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent-orange hover:bg-orange-500"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Event
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  isDeleting,
  eventTitle,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  eventTitle?: string;
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {eventTitle ? (
            <>
              Are you sure you want to delete the event{" "}
              <strong>"{eventTitle}"</strong>? This action cannot be undone.
            </>
          ) : (
            "Are you sure you want to delete this live event? This action cannot be undone."
          )}
        </DialogDescription>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Main Component
const LiveEventsPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllLiveEventQuery({});
  const [createLiveEvent, { isLoading: isCreating }] =
    useCreateNewLiveMutation();
  const [updateLiveEvent, { isLoading: isUpdating }] =
    useUpdateLiveEventMutation();
  const [deleteLiveEvent, { isLoading: isDeleting }] =
    useDeleteLiveEventMutation();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedEventTitle, setSelectedEventTitle] = useState<string>("");

  // Map backend data to card format
  const liveEvents: ExtendedLiveEvent[] = useMemo(() => {
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
      status: "upcoming",
      youtubeLiveUrl: item.youtubeLiveUrl || "",
      tags: item.tags || [],
    }));
  }, [data]);

  // Create Event Handler - FIXED VERSION
  const handleCreateEvent = async (formData: FormData) => {
    try {
      const submitData = new FormData();

      // Append basic fields
      submitData.append("title", formData.title);
      submitData.append("subTitle", formData.subTitle);

      // Handle thumbnail - ensure it's a File
      if (formData.thumbnail instanceof File) {
        submitData.append("thumbnail", formData.thumbnail);
      } else {
        throw new Error("Thumbnail is required and must be a file");
      }

      // Append tags as array
      formData.tags.forEach((tag, index) => {
        submitData.append(`tags[${index}]`, tag);
      });

      // Convert to ISO string format
      const startTime = new Date(formData.startTime);
      const endTime = new Date(formData.endTime);

      submitData.append("startTime", startTime.toISOString());
      submitData.append("endTime", endTime.toISOString());
      submitData.append("youtubeLiveUrl", formData.youtubeLiveUrl);

      const res = await createLiveEvent(submitData).unwrap();

      // Check for different success response formats
      if (res?.id || res?.success) {
        toast.success("Live event created successfully!");
        setCreateModalOpen(false);

        // Force refetch of the events list
        refetch();

        // Additional delay to ensure data is fetched
        setTimeout(() => {
          refetch();
        }, 500);
      } else {
        throw new Error(
          res?.message || "Failed to create event - no ID returned"
        );
      }
    } catch (error: any) {
      console.error("❌ Error creating live event:", error);
      console.error("Error details:", error.data);
      toast.error(
        error?.data?.message || error?.message || "Failed to create event"
      );
    }
  };

  // Edit Event Handler
  const handleEditEvent = async (formData: FormData) => {
    if (!selectedEventId) {
      console.error("❌ No event ID selected for update");
      toast.error("No event selected for update");
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("subTitle", formData.subTitle);

      // For updates, only append thumbnail if it's a new file
      if (formData.thumbnail instanceof File) {
        submitData.append("thumbnail", formData.thumbnail);
      }

      formData.tags.forEach((tag, index) => {
        submitData.append(`tags[${index}]`, tag);
      });

      const startTime = new Date(formData.startTime);
      const endTime = new Date(formData.endTime);

      submitData.append("startTime", startTime.toISOString());
      submitData.append("endTime", endTime.toISOString());
      submitData.append("youtubeLiveUrl", formData.youtubeLiveUrl);

      const res = await updateLiveEvent({
        id: selectedEventId,
        data: submitData,
      }).unwrap();

      if (res?.id) {
        toast.success("Live event updated successfully!");
        setEditModalOpen(false);
        setSelectedEventId(null);
        setSelectedEventTitle("");
        refetch();
      } else {
        throw new Error(res?.message || "Failed to update event");
      }
    } catch (error: any) {
      console.error("❌ Error updating live event:", error);
      toast.error(
        error?.data?.message || error?.message || "Failed to update event"
      );
    }
  };

  // Delete Event Handler
  const handleDeleteEvent = async () => {
    if (!selectedEventId) {
      console.error("❌ No event ID selected for deletion");
      toast.error("No event selected for deletion");
      return;
    }

    try {
      const res = await deleteLiveEvent(selectedEventId).unwrap();
      if (res?.id) {
        toast.success("Live event deleted successfully!");
        setDeleteModalOpen(false);
        setSelectedEventId(null);
        setSelectedEventTitle("");
        refetch();
      } else {
        throw new Error(res?.message || "Failed to delete event");
      }
    } catch (error: any) {
      console.error("❌ Error deleting live event:", error);
      toast.error(
        error?.data?.message || error?.message || "Failed to delete event"
      );
    }
  };

  // Event Action Handlers
  const handleAddEvent = () => {
    setCreateModalOpen(true);
  };

  const handleEdit = (eventId: string, eventTitle: string) => {
    setSelectedEventId(eventId);
    setSelectedEventTitle(eventTitle);
    setEditModalOpen(true);
  };

  const handleDelete = (eventId: string, eventTitle: string) => {
    setSelectedEventId(eventId);
    setSelectedEventTitle(eventTitle);
    setDeleteModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedEventId(null);
    setSelectedEventTitle("");
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedEventId(null);
    setSelectedEventTitle("");
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <DashboardHeader title="Live Events" />
        <Button
          className="bg-accent-orange hover:bg-orange-500"
          onClick={handleAddEvent}
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

      {/* Events List */}
      {!isLoading && liveEvents.length > 0 ? (
        <div className="grid gap-4">
          {liveEvents.map((event) => (
            <div
              key={event.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg"
            >
              <div className="flex-1">
                <LiveEventCard live={event} />
              </div>
              <div className="flex gap-2 sm:flex-col sm:gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(event.id, event.title)}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(event.id, event.title)}
                  className="flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <p className="text-gray-500 text-sm text-center mt-4">
            No live events available.
          </p>
        )
      )}

      {/* Modals */}
      <CreateEventModal
        open={createModalOpen}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateEvent}
        isSubmitting={isCreating}
      />

      <EditEventModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleEditEvent}
        isSubmitting={isUpdating}
        eventId={selectedEventId}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteEvent}
        isDeleting={isDeleting}
        eventTitle={selectedEventTitle}
      />
    </div>
  );
};

export default LiveEventsPage;
