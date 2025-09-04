"use client"; // This makes the component a Client Component

import React from "react";
import { Button } from "@/components/ui/button";
import { Trash, Edit2 } from "lucide-react";

interface PaymentCardProps {
  price: string;
  time: "Monthly" | "Yearly"; // Explicitly define allowed values
  shortBio: string;
  facilities: string[];
  onEdit: () => void;
  onDelete: () => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  price,
  time,
  shortBio,
  facilities,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out transform">
      {/* Price and Time */}
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold text-gray-800">{price}</div>
        <div className="text-sm font-medium text-gray-500">{time}</div>
      </div>

      {/* Short Bio */}
      <div>
        <p className="text-gray-700">{shortBio}</p>
      </div>

      {/* Facilities List */}
      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-2">Facilities:</h4>
        <ul className="space-y-1 text-gray-700">
          {facilities.map((facility, index) => (
            <li key={index} className="text-sm flex items-center">
              <span className="mr-2">-</span> {facility}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Button
          variant="secondary"
          size="sm"
          onClick={onEdit}
          className="flex items-center text-blue-500 hover:bg-blue-100"
        >
          <Edit2 className="mr-1" size={16} />
          Edit
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onDelete}
          className="flex items-center text-red-500 hover:bg-red-100"
        >
          <Trash className="mr-1" size={16} />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PaymentCard;