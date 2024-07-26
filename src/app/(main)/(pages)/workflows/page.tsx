import React from "react";
import WorkflowButton from "./_components/workflow-button";
import Workflows from "./_components";

export default function WorkflowsPage() {
  return (
    <div className="flex flex-col gap-4 relative">
      <h1 className="text-2xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center">
        Workflows
        <WorkflowButton />
      </h1>
      <Workflows />
    </div>
  );
}
