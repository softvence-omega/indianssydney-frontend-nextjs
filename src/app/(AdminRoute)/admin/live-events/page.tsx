// "use client";

// import React, { useState, useMemo } from "react";
// import DashboardHeader from "@/components/reusable/DashboardHeader";
// import { Button } from "@/components/ui/button";
// import { PlusIcon, Loader2 } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useForm, useFieldArray } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";
// import LiveEventCard, { LiveEvent } from "./LiveEventCard";
// import {
//   useCreateNewLiveMutation,
//   useDeleteLiveEventMutation,
//   useGetAllLiveEventQuery,
//   useUpdateLiveEventMutation,
// } from "@/store/features/live-events/live.api";

// // ✅ Validation Schema
// const eventSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   subTitle: z.string().min(1, "Subtitle is required"),
//   thumbnail: z.custom<File>((file) => file instanceof File, {
//     message: "Thumbnail is required",
//   }),
//   tags: z
//     .array(z.string().min(1, "Tag cannot be empty"))
//     .nonempty("At least one tag is required"),
//   startTime: z.string().min(1, "Start time is required"),
//   endTime: z.string().min(1, "End time is required"),
//   youtubeLiveUrl: z.string().url("Must be a valid YouTube URL"),
// });

// type FormData = z.infer<typeof eventSchema>;

// const LiveEventsPage = () => {
//   const { data, isLoading, isError } = useGetAllLiveEventQuery({});
//   const [createLiveEvent, { isLoading: isCreating }] =
//     useCreateNewLiveMutation();

//     const [updateLiveEvent] = useUpdateLiveEventMutation();
//     const [deleteLiveEvent] = useDeleteLiveEventMutation();

//   const [open, setOpen] = useState(false);
//   const [preview, setPreview] = useState<string | null>(null);

//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(eventSchema),
//     defaultValues: { tags: [""] },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "tags",
//   });

//   // ✅ Map backend data to card format
//   const liveEvents: LiveEvent[] = useMemo(() => {
//     if (!data) return [];
//     return data.map((item: any) => ({
//       id: item.id,
//       title: item.title,
//       description: item.subTitle,
//       coverImage: item.thumbnail,
//       author: item?.user?.fullName || "Admin",
//       date: new Date(item.startTime).toLocaleDateString(),
//       startTime: new Date(item.startTime).toLocaleTimeString(),
//       endTime: new Date(item.endTime).toLocaleTimeString(),
//       status: "upcoming", // static, no filter now
//     }));
//   }, [data]);

//   // ✅ Create New Event
//   const onSubmit = async (data: FormData) => {
//     try {
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("subTitle", data.subTitle);
//       formData.append("thumbnail", data.thumbnail);
//       data.tags.forEach((tag, i) => formData.append(`tags[${i}]`, tag));
//       formData.append("startTime", new Date(data.startTime).toISOString());
//       formData.append("endTime", new Date(data.endTime).toISOString());
//       formData.append("youtubeLiveUrl", data.youtubeLiveUrl);

//       const res = await createLiveEvent(formData).unwrap();

//       if (res?.success) {
//         toast.success("Live event created successfully!");
//         setOpen(false);
//         reset();
//         setPreview(null);
//       } else {
//         toast.error(res?.message || "Failed to create event");
//       }
//     } catch (error: any) {
//       console.error("Error creating live event:", error);
//       toast.error(error?.data?.message || "Failed to create event");
//     }
//   };

//   // ✅ Image Upload Preview
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setValue("thumbnail", file, { shouldValidate: true });
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <DashboardHeader title="Live Events" />
//         <Button
//           className="bg-accent-orange hover:bg-orange-500"
//           onClick={() => setOpen(true)}
//         >
//           <PlusIcon className="mr-2 h-4 w-4" />
//           Add Live Event
//         </Button>
//       </div>

//       {/* Loading State */}
//       {isLoading && (
//         <div className="flex justify-center items-center py-10">
//           <Loader2 className="animate-spin mr-2" /> Loading live events...
//         </div>
//       )}

//       {/* Error State */}
//       {isError && (
//         <p className="text-red-500 text-sm text-center">
//           Failed to fetch live events.
//         </p>
//       )}

//       {/* Events List (No Tabs — All shown) */}
//       {!isLoading && liveEvents.length > 0 ? (
//         <div className="grid gap-4">
//           {liveEvents.map((event) => (
//             <LiveEventCard key={event.id} live={event} />
//           ))}
//         </div>
//       ) : (
//         !isLoading && (
//           <p className="text-gray-500 text-sm text-center mt-4">
//             No live events available.
//           </p>
//         )
//       )}

//       {/* Add Event Dialog */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="sm:max-w-lg">
//           <DialogHeader>
//             <DialogTitle>Add Live Event</DialogTitle>
//           </DialogHeader>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* Title */}
//             <div className="space-y-2">
//               <Label>Title *</Label>
//               <Input placeholder="Event title" {...register("title")} />
//               {errors.title && (
//                 <p className="text-red-500 text-sm">{errors.title.message}</p>
//               )}
//             </div>

//             {/* Subtitle */}
//             <div className="space-y-2">
//               <Label>Subtitle *</Label>
//               <Input placeholder="Short description" {...register("subTitle")} />
//               {errors.subTitle && (
//                 <p className="text-red-500 text-sm">
//                   {errors.subTitle.message}
//                 </p>
//               )}
//             </div>

//             {/* Tags */}
//             <div className="space-y-2">
//               <Label>Tags *</Label>
//               {fields.map((field, index) => (
//                 <div key={field.id} className="flex gap-2 mb-2">
//                   <Input
//                     placeholder={`Tag ${index + 1}`}
//                     {...register(`tags.${index}`)}
//                   />
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => remove(index)}
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               ))}
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => append("")}
//                 className="text-sm"
//               >
//                 + Add Tag
//               </Button>
//               {errors.tags && (
//                 <p className="text-red-500 text-sm">
//                   {errors.tags.message as string}
//                 </p>
//               )}
//             </div>

//             {/* Start / End Time */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Start Time *</Label>
//                 <Input type="datetime-local" {...register("startTime")} />
//                 {errors.startTime && (
//                   <p className="text-red-500 text-sm">
//                     {errors.startTime.message}
//                   </p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label>End Time *</Label>
//                 <Input type="datetime-local" {...register("endTime")} />
//                 {errors.endTime && (
//                   <p className="text-red-500 text-sm">
//                     {errors.endTime.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* YouTube URL */}
//             <div className="space-y-2">
//               <Label>YouTube Live URL *</Label>
//               <Input
//                 placeholder="https://youtube.com/live/..."
//                 {...register("youtubeLiveUrl")}
//               />
//               {errors.youtubeLiveUrl && (
//                 <p className="text-red-500 text-sm">
//                   {errors.youtubeLiveUrl.message}
//                 </p>
//               )}
//             </div>

//             {/* Thumbnail Upload */}
//             <div className="space-y-2">
//               <Label>Thumbnail *</Label>
//               <Input type="file" accept="image/*" onChange={handleImageUpload} />
//               {errors.thumbnail && (
//                 <p className="text-red-500 text-sm">
//                   {errors.thumbnail.message}
//                 </p>
//               )}
//               {preview && (
//                 <img
//                   src={preview}
//                   alt="Thumbnail Preview"
//                   className="mt-2 w-full h-40 object-cover rounded-md border"
//                 />
//               )}
//             </div>

//             <DialogFooter>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 className="bg-accent-orange hover:bg-orange-500"
//                 disabled={isCreating}
//               >
//                 {isCreating && (
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 )}
//                 Save Event
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default LiveEventsPage;
"use client";

import React, { useState, useMemo, useEffect } from "react";
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

const LiveEventsPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllLiveEventQuery({});
  const [createLiveEvent, { isLoading: isCreating }] = useCreateNewLiveMutation();
  const [updateLiveEvent, { isLoading: isUpdating }] = useUpdateLiveEventMutation();
  const [deleteLiveEvent, { isLoading: isDeleting }] = useDeleteLiveEventMutation();

  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editEventId, setEditEventId] = useState<string | null>(null);

  const {
    data: singleEvent,
    isLoading: isSingleLoading,
    isError: isSingleError,
  } = useGetSingleLiveEventQuery(editEventId!, {
    skip: !editEventId,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: { 
      tags: [""],
      youtubeLiveUrl: "https://youtube.com/live/",
      startTime: "",
      endTime: ""
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  // Watch thumbnail to handle preview updates
  const thumbnailValue = watch("thumbnail");

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

  // Populate form when editing
  useEffect(() => {
    if (isEditMode && singleEvent && !isSingleLoading && !isSingleError) {
      console.log("Populating form with:", singleEvent);
      
      const thumbnailUrl = singleEvent.thumbnail;
      setPreview(thumbnailUrl || null);
      
      // Set all form values
      setValue("id", singleEvent.id);
      setValue("title", singleEvent.title);
      setValue("subTitle", singleEvent.subTitle);
      setValue("thumbnail", thumbnailUrl || "");
      setValue("tags", singleEvent.tags?.length > 0 ? singleEvent.tags : [""]);
      
      // Format dates for datetime-local input (remove the 'Z' and milliseconds)
      const startTime = new Date(singleEvent.startTime);
      const endTime = new Date(singleEvent.endTime);
      
      setValue("startTime", startTime.toISOString().slice(0, 16));
      setValue("endTime", endTime.toISOString().slice(0, 16));
      setValue("youtubeLiveUrl", singleEvent.youtubeLiveUrl || "https://youtube.com/live/");
    }
  }, [singleEvent, isEditMode, isSingleLoading, isSingleError, setValue]);

  // Update preview when thumbnail changes
  useEffect(() => {
    if (thumbnailValue instanceof File) {
      setPreview(URL.createObjectURL(thumbnailValue));
    } else if (typeof thumbnailValue === 'string' && thumbnailValue) {
      setPreview(thumbnailValue);
    } else {
      setPreview(null);
    }
  }, [thumbnailValue]);

  // Create or Update Event - FIXED VERSION
  const onSubmit = async (formData: FormData) => {
    try {
      const submitData = new FormData();
      
      console.log("Submitting data:", formData);
      
      // Append basic fields
      submitData.append("title", formData.title);
      submitData.append("subTitle", formData.subTitle);
      
      // Handle thumbnail - FIXED LOGIC
      if (formData.thumbnail instanceof File) {
        submitData.append("thumbnail", formData.thumbnail);
      } else if (isEditMode && typeof formData.thumbnail === 'string') {
        // For edit mode with existing thumbnail, we need to handle it based on backend requirements
        // If backend expects the thumbnail to be sent every time, we might need to fetch and append it
        // Or if it can handle string URLs, we can append as is
        submitData.append("thumbnail", formData.thumbnail);
      }
      
      // Append tags as array - FIXED: Use the same format as your working version
      formData.tags.forEach((tag, index) => {
        submitData.append(`tags[${index}]`, tag);
      });
      
      // Convert to ISO string format
      submitData.append("startTime", new Date(formData.startTime).toISOString());
      submitData.append("endTime", new Date(formData.endTime).toISOString());
      submitData.append("youtubeLiveUrl", formData.youtubeLiveUrl);

      let res;
      if (isEditMode && editEventId) {
        console.log("Updating event:", editEventId);
        res = await updateLiveEvent({ 
          id: editEventId, 
          data: submitData 
        }).unwrap();
      } else {
        console.log("Creating new event");
        res = await createLiveEvent(submitData).unwrap();
      }

      console.log("API Response:", res);

      if (res?.success) {
        toast.success(
          isEditMode
            ? "Live event updated successfully!"
            : "Live event created successfully!"
        );
        handleCloseDialog();
        // Refetch the events list
        refetch();
      } else {
        throw new Error(res?.message || `Failed to ${isEditMode ? "update" : "create"} event`);
      }
    } catch (error: any) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} live event:`,
        error
      );
      toast.error(
        error?.data?.message ||
        error?.message ||
        `Failed to ${isEditMode ? "update" : "create"} event`
      );
    }
  };

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("thumbnail", file, { shouldValidate: true });
    } else {
      setValue("thumbnail", "", { shouldValidate: true });
    }
  };

  // Edit Event - FIXED
  const handleEdit = (event: ExtendedLiveEvent) => {
    console.log("Editing event:", event.id);
    setIsEditMode(true);
    setEditEventId(event.id);
    setOpen(true);
  };

  // Delete Event
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteLiveEvent(id).unwrap();
      if (res?.success) {
        toast.success("Live event deleted successfully!");
        setDeleteConfirmId(null);
        // Refetch the events list
        refetch();
      } else {
        throw new Error(res?.message || "Failed to delete event");
      }
    } catch (error: any) {
      console.error("Error deleting live event:", error);
      toast.error(error?.data?.message || error?.message || "Failed to delete event");
    }
  };

  // Close dialog and reset form
  const handleCloseDialog = () => {
    setOpen(false);
    setIsEditMode(false);
    reset({
      tags: [""],
      youtubeLiveUrl: "https://youtube.com/live/",
      startTime: "",
      endTime: "",
      thumbnail: ""
    });
    setPreview(null);
    setEditEventId(null);
  };

  // Open add dialog
  const handleAddEvent = () => {
    setIsEditMode(false);
    setEditEventId(null);
    reset({
      tags: [""],
      youtubeLiveUrl: "https://youtube.com/live/",
      startTime: "",
      endTime: "",
      thumbnail: ""
    });
    setPreview(null);
    setOpen(true);
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
            <div key={event.id} className="flex items-center gap-4">
              <LiveEventCard live={event} />
              <Button
                variant="outline"
                onClick={() => handleEdit(event)}
                className="ml-2"
                disabled={isSingleLoading && editEventId === event.id}
              >
                {isSingleLoading && editEventId === event.id && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => setDeleteConfirmId(event.id)}
                disabled={isDeleting && deleteConfirmId === event.id}
              >
                {isDeleting && deleteConfirmId === event.id && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Delete
              </Button>
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

      {/* Add/Edit Event Dialog */}
      <Dialog open={open} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Live Event" : "Add Live Event"}
            </DialogTitle>
          </DialogHeader>

          {isEditMode && isSingleLoading && (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="animate-spin mr-2" /> Loading event details...
            </div>
          )}

          {isEditMode && isSingleError && (
            <p className="text-red-500 text-sm text-center">
              Failed to load event details.
            </p>
          )}

          {(!isEditMode || (isEditMode && singleEvent && !isSingleLoading)) && (
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
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    )}
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
                    {errors.tags.message}
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
                <Label>Thumbnail {isEditMode ? "(Optional)" : "*"}</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
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
                {isEditMode && preview && (
                  <p className="text-sm text-gray-500">
                    Current thumbnail. Upload a new file to replace it.
                  </p>
                )}
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-accent-orange hover:bg-orange-500"
                  disabled={isCreating || isUpdating}
                >
                  {(isCreating || isUpdating) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isEditMode ? "Update Event" : "Save Event"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteConfirmId}
        onOpenChange={() => setDeleteConfirmId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete this live event? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              disabled={isDeleting}
            >
              {isDeleting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LiveEventsPage;