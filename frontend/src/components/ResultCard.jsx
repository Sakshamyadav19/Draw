import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

const ResultCard = ({ name, score }) => {
  return (
    <div className="w-full mb-4">
      <Card className="px-3">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>{score} Points</CardContent>
      </Card>
    </div>
  );
};

export default ResultCard;
