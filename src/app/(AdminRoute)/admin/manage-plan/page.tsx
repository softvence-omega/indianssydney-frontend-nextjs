"use client";

import React, { useState } from "react";
import SubscriptionForm from "./SubscriptionForm";
import PaymentCard from "./PaymentCard";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/reusable/DashboardHeader";
import {
  useCreateNewPlanMutation,
  useDeletePlanMutation,
  useGetAllPlanQuery,
  useUpdatePlanMutation,
} from "@/store/features/plans/plans.api";
import { toast } from "sonner";

type Payment = {
  id?: string;
  name: string;
  Price: number;
  billingCycle: "MONTHLY" | "YEARLY";
  shortBio: string;
  features: string[];
};

const ManagePlan: React.FC = () => {
  const { data: plans, isLoading, refetch } = useGetAllPlanQuery({});
  const [createPlan] = useCreateNewPlanMutation();
  const [updatePlan] = useUpdatePlanMutation();
  const [deletePlan] = useDeletePlanMutation();

  const [open, setOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);

  // Handle edit
  const handleEdit = (plan: Payment) => {
    setEditingPayment(plan);
    setOpen(true);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      await deletePlan(id).unwrap();
      toast.success("Plan deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete plan");
    }
  };

  // Handle submit
  const handleSubmit = async (data: any) => {
    try {
      const payload = {
        name: data.name || `${data.time} Plan`,
        Price: parseFloat(data.price),
        billingCycle: data.time.toUpperCase() as "MONTHLY" | "YEARLY",
        shortBio: data.shortBio,
        features: data.facilities,
      };
      console.log("Sending payload:", payload);

      if (editingPayment?.id) {
        console.log("Updating plan with ID:", editingPayment.id);
        await updatePlan({ id: editingPayment.id, data: payload }).unwrap();
        toast.success("Plan updated successfully");
        refetch(); // Force refetch to update UI
      } else {
        await createPlan(payload).unwrap();
        toast.success("Plan created successfully");
      }
      setOpen(false);
      setEditingPayment(null);
    } catch (err: any) {
      console.error("Submit failed:", err);
      toast.error(err?.data?.message || "Failed to save plan");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <DashboardHeader title="Manage Plan" />
        <Button
          size="lg"
          variant="default"
          className="bg-accent-orange hover:bg-orange-500 text-white px-3 sm:px-4 md:px-6 py-2 rounded-none border text-sm border-accent-orange cursor-pointer"
          onClick={() => {
            setEditingPayment(null);
            setOpen(true);
          }}
        >
          Add Plan
        </Button>
      </div>

      <SubscriptionForm
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        initialData={
  editingPayment
    ? {
        price: editingPayment.Price.toString(),
        time:
          editingPayment.billingCycle === "MONTHLY"
            ? "MONTHLY"
            : "YEARLY",
        shortBio: editingPayment.shortBio,
        facilities: editingPayment.features,
      }
    : undefined
}
        open={open}
        setOpen={setOpen}
      />

      <div className="space-y-6">
        {isLoading ? (
          <p>Loading plans...</p>
        ) : (
          plans?.data?.map((plan: Payment) => (
            <PaymentCard
              key={plan.id}
              price={`$${plan.Price}`}
              time={plan.billingCycle === "MONTHLY" ? "Monthly" : "Yearly"}
              shortBio={plan.shortBio}
              facilities={plan.features}
              onEdit={() => handleEdit(plan)}
              onDelete={() => plan.id && handleDelete(plan.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ManagePlan;