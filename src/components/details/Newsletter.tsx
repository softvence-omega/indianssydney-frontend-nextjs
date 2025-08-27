import React from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const Newsletter = () => {
  return (
    <Card className="bg-accent-orange/10 border-accent-orange shadow-sm">
      <CardContent className="">
        <h3 className="text-xl lg:text-3xl font-bold mb-2 text-accent-orange text-center">Stay Informed</h3>
        <p className="text-sm md:text-base font-semibold mb-4 text-center">
          Get breaking news and analysis delivered to your inbox
        </p>
        <div className="space-y-3">
          <Input placeholder="Enter your email" className="bg-white h-auto py-2 shadow-none" />
          <Button className="w-full bg-accent-orange hover:bg-orange-500">
            Subscribe Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Newsletter;
