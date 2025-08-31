import DashboardHeader from "@/components/reusable/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <DashboardHeader title="Contributor Management" />
        <Button className="bg-accent-orange ">
          <Plus className="text-white" />
          Add New
        </Button>
      </div>

      <div>
        
      </div>
    </div>
  );
};

export default page;
