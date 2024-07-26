"use server";
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

export const getGoogleListener = async () => {
  const { userId } = auth();

  if (userId) {
    const listener = await db.user.findUnique({
      where: {
        clerk_id: userId,
      },
      select: {
        google_resource_id: true,
      },
    });

    if (listener) return listener;
  }
};

export const onFlowPublish = async (workflowId: string, state: boolean) => {
  console.log(state);
  const published = await db.workflows.update({
    where: {
      id: workflowId,
    },
    data: {
      publish: state,
    },
  });

  if (published.publish) return "Workflow published";
  return "Workflow unpublished";
};

export const onCreateNodeTemplate = async (workflowId: string) => {
  const response = await db.workflows.update({
    where: {
      id: workflowId,
    },
    data: {},
  });

  if (response) return "template saved";
};

export const onGetWorkflows = async () => {
  const user = await currentUser();
  if (user) {
    const workflows = await db.workflows.findMany({
      where: {
        user_id: user.id,
      },
    });

    if (workflows) return workflows;
  }
};

export const onCreateWorkflow = async (name: string, description: string) => {
  const user = await currentUser();

  if (user) {
    //create new workflow
    const workflow = await db.workflows.create({
      data: {
        user_id: user.id,
        name,
        description,
      },
    });

    if (workflow) return { message: "workflow created" };
    return { message: "Oops! try again" };
  }
};

export const onGetNodesEdges = async (flowId: string) => {
  const nodesEdges = await db.workflows.findUnique({
    where: {
      id: flowId,
    },
    select: {
      nodes: true,
      edges: true,
    },
  });
  if (nodesEdges?.nodes && nodesEdges?.edges) return nodesEdges;
};
