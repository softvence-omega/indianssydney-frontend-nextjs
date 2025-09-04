"use client"; // This makes the component a Client Component

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
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

// Zod schema for form validation
const subscriptionSchema = z.object({
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid price format" }),
  time: z.enum(["Monthly", "Yearly"], {
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
  onSubmit: (data: FormData) => void;
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
  const [time, setTime] = useState<"Monthly" | "Yearly">(
    initialData?.time || "Monthly"
  );
  const [shortBio, setShortBio] = useState<string>(initialData?.shortBio || "");
  const [facilities, setFacilities] = useState<string[]>(
    initialData?.facilities || [""]
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setPrice(initialData.price);
      setTime(initialData.time);
      setShortBio(initialData.shortBio);
      setFacilities(
        initialData.facilities.length > 0 ? initialData.facilities : [""]
      );
    } else {
      setPrice("");
      setTime("Monthly");
      setShortBio("");
      setFacilities([""]);
    }
  }, [initialData]);

  // Handle adding new facility input
  const addFacility = () => {
    setFacilities([...facilities, ""]);
  };

  // Handle removing facility input
  const removeFacility = (index: number) => {
    const updatedFacilities = facilities.filter((_, i) => i !== index);
    setFacilities(updatedFacilities.length > 0 ? updatedFacilities : [""]);
  };

  // Handle field changes
  const handleFacilityChange = (index: number, value: string) => {
    const updatedFacilities = [...facilities];
    updatedFacilities[index] = value;
    setFacilities(updatedFacilities);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form using Zod
    const result = subscriptionSchema.safeParse({
      price,
      time,
      shortBio,
      facilities,
    });

    if (!result.success) {
      // Set errors if validation fails
      const errorMessages: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        errorMessages[path] = issue.message;
      });
      setErrors(errorMessages);
    } else {
      const data: FormData = result.data;
      onSubmit(data);
      setErrors({});
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <h3 className="text-2xl font-semibold">
            {initialData ? "Edit Subscription" : "Add New Subscription"}
          </h3>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="$100"
                required
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Time
              </label>
              <Select
                value={time}
                onValueChange={(value) => setTime(value as "Monthly" | "Yearly")}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              {errors.time && (
                <p className="text-red-500 text-sm">{errors.time}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="shortBio"
              className="block text-sm font-medium text-gray-700"
            >
              Short Bio
            </label>
            <Textarea
              id="shortBio"
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

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Facilities
            </label>
            {facilities.map((facility, index) => (
              <div key={index} className="flex items-center space-x-4 mb-3">
                <Input
                  value={facility}
                  onChange={(e) => handleFacilityChange(index, e.target.value)}
                  placeholder={`Facility ${index + 1}`}
                  required
                  className={errors[`facilities.${index}`] ? "border-red-500" : ""}
                />
                <Button
                  type="button"
                  onClick={() => removeFacility(index)}
                  variant="outline"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
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
              className="flex items-center"
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