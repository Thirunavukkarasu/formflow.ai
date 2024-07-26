import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardTypes } from "@/lib/constant";

type Props = {
  nodes: any;
};
export default function NodeSelector({ nodes }: Props) {
  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="h-full bg-gray-200 space-y-4 p-4 overflow-scroll">
      {Object.entries(CardTypes)
        .filter(
          ([_, cardType]: any) =>
            (!nodes.length && cardType.type === "trigger") ||
            (nodes.length && cardType.type === "action")
        )
        .map(([cardKey, cardValue]: any) => (
          <Card
            key={cardKey}
            draggable
            className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
            onDragStart={(event) => onDragStart(event, cardKey)}
          >
            <CardHeader className="flex flex-row items-center gap-4 p-4">
              {/* <EditorCanvasIconHelper type={cardKey as EditorCanvasTypes} /> */}
              <CardTitle className="text-md">
                {cardKey}
                <CardDescription>{cardValue.description}</CardDescription>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
    </aside>
  );
}
