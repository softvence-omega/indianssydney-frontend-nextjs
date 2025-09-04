"use client"; // This makes the component a Client Component

import React, { useState } from "react";
import SubscriptionForm from "./SubscriptionForm";
import PaymentCard from "./PaymentCard";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/reusable/DashboardHeader";

type Payment = {
  price: string;
  time: "Monthly" | "Yearly"; // Explicitly define allowed values
  shortBio: string;
  facilities: string[];
};

const payments: Payment[] = [
  {
    price: "$100",
    time: "Monthly",
    shortBio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    facilities: ["Facility 1", "Facility 2", "Facility 3"],
  },
  {
    price: "$200",
    time: "Yearly",
    shortBio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    facilities: ["Facility 1", "Facility 2", "Facility 3"],
  },
];

const ManagePlan: React.FC = () => {
  const [paymentList, setPaymentList] = useState<Payment[]>(payments);
  const [open, setOpen] = useState(false); // Control the modal visibility
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null); // Handle the editing state

  // Handle the edit functionality
  const handleEdit = (id: number) => {
    const paymentToEdit = paymentList[id];
    setEditingPayment(paymentToEdit); // Set the data to be edited
    setOpen(true); // Open the modal for editing
  };

  // Handle the delete functionality
  const handleDelete = (id: number) => {
    const updatedPayments = paymentList.filter((_, index) => index !== id);
    setPaymentList(updatedPayments); // Update the payment list after deletion
  };

  // Handle form submission
  const handleSubmit = (data: Payment) => {
    if (editingPayment) {
      // If editing, update the existing payment
      const updatedPayments = paymentList.map((payment) =>
        payment === editingPayment ? data : payment
      );
      setPaymentList(updatedPayments);
    } else {
      // If adding new, add the payment to the list
      setPaymentList([...paymentList, data]);
    }
    setOpen(false); // Close the modal after submitting
    setEditingPayment(null); // Reset editing state
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
            setEditingPayment(null); // Reset editing state for new payment
            setOpen(true); // Open the modal for adding a new payment
          }}
        >
          Add Payment
        </Button>
      </div>

      <SubscriptionForm
        onClose={() => setOpen(false)} // Close modal
        onSubmit={handleSubmit} // Submit the form data
        initialData={editingPayment ?? undefined} // Use nullish coalescing to handle null
        open={open} // Control modal visibility
        setOpen={setOpen} // Pass the state setter for managing dialog
      />

      <div className="space-y-6">
        {paymentList.map((payment, index) => (
          <PaymentCard
            key={index}
            price={payment.price}
            time={payment.time}
            shortBio={payment.shortBio}
            facilities={payment.facilities}
            onEdit={() => handleEdit(index)} // Open modal to edit specific payment
            onDelete={() => handleDelete(index)} // Handle delete
          />
        ))}
      </div>
    </div>
  );
};

export default ManagePlan;