"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Trash, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";

const subscriptionSchema = z.object({
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid price format" }),
  time: z.enum(["MONTHLY", "YEARLY"], {
    message: "Please select a valid time",
  }),
  shortBio: z.string().min(1, { message: "Short bio is required" }),
  facilities: z
    .array(z.string().min(1, { message: "Facility cannot be empty" }))
    .min(1, { message: "At least one facility is required" }),
});

type FormData = z.infer<typeof subscriptionSchema>;

interface SubscriptionFormProps {
  onClose: () => void;
  onSubmit: (data: FormData) => void; // Updated to use FormData type
  initialData?: FormData;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  onClose,
  onSubmit,
  initialData,
  open,
  setOpen,
}) => {
  const [price, setPrice] = useState<string>(initialData?.price || "");
  const [time, setTime] = useState<"MONTHLY" | "YEARLY">(
    initialData?.time || "MONTHLY"
  ); // Updated to match Zod schema
  const [shortBio, setShortBio] = useState<string>(initialData?.shortBio || "");
  const [facilities, setFacilities] = useState<string[]>(
    initialData?.facilities || [""]
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setPrice(initialData.price);
      setTime(initialData.time); // Expects "Monthly" or "Yearly"
      setShortBio(initialData.shortBio);
      setFacilities(
        initialData.facilities.length ? initialData.facilities : [""]
      );
    } else {
      setPrice("");
      setTime("MONTHLY");
      setShortBio("");
      setFacilities([""]);
    }
  }, [initialData]);

  const addFacility = () => setFacilities([...facilities, ""]);
  const removeFacility = (index: number) => {
    const updated = facilities.filter((_, i) => i !== index);
    setFacilities(updated.length ? updated : [""]);
  };
  const handleFacilityChange = (index: number, value: string) => {
    const updated = [...facilities];
    updated[index] = value;
    setFacilities(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = subscriptionSchema.safeParse({
      price,
      time,
      shortBio,
      facilities,
    });

    if (!result.success) {
      const errorMessages: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        errorMessages[path] = issue.message;
      });
      setErrors(errorMessages);
    } else {
      const data: FormData = result.data; // Use validated data
      onSubmit(data); // Pass validated data directly
      setErrors({});
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Subscription" : "Add New Subscription"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update the subscription plan details below."
              : "Create a new subscription plan by filling out the details below."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {/* Price + Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium">Price</label>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="100"
                required
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Time</label>
              <Select
                value={time}
                onValueChange={(value) =>
                  setTime(value as "MONTHLY" | "YEARLY")
                }
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="YEARLY">Yearly</SelectItem>
                </SelectContent>
              </Select>
              {errors.time && (
                <p className="text-red-500 text-sm">{errors.time}</p>
              )}
            </div>
          </div>

          {/* Short Bio */}
          <div className="mb-6">
            <label className="block text-sm font-medium">Short Bio</label>
            <Textarea
              value={shortBio}
              onChange={(e) => setShortBio(e.target.value)}
              placeholder="Enter short bio"
              required
              className={errors.shortBio ? "border-red-500" : ""}
            />
            {errors.shortBio && (
              <p className="text-red-500 text-sm">{errors.shortBio}</p>
            )}
          </div>

          {/* Facilities */}
          <div className="mb-6">
            <label className="block text-sm font-medium">Facilities</label>
            {facilities.map((facility, index) => (
              <div key={index} className="flex items-center space-x-4 mb-3">
                <Input
                  value={facility}
                  onChange={(e) => handleFacilityChange(index, e.target.value)}
                  placeholder={`Facility ${index + 1}`}
                  required
                  className={
                    errors[`facilities.${index}`] ? "border-red-500" : ""
                  }
                />
                <Button
                  type="button"
                  onClick={() => removeFacility(index)}
                  variant="outline"
                  size="icon"
                  disabled={facilities.length === 1}
                >
                  <Trash size={16} />
                </Button>
              </div>
            ))}
            {errors.facilities && (
              <p className="text-red-500 text-sm">{errors.facilities}</p>
            )}
            <Button
              type="button"
              onClick={addFacility}
              variant="secondary"
              size="sm"
            >
              <PlusCircle size={16} className="mr-2" /> Add Facility
            </Button>
          </div>

          <DialogFooter>
            <Button variant="default" type="submit">
              Save
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="ml-2"
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionForm;
