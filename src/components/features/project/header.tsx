import { cn } from "@/lib/utils";
import ProjectName from "./project-name";
import { useProjectStore } from "@/store/project";
import { AlertOctagonIcon } from "lucide-react";

/*
 * Render the header for the project
 */
export default function Header({
  children,
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  const error = useProjectStore((state) => state.error);

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-4 bg-background border-b border-border",
        className
      )}
      {...props}
    >
      <ProjectName />
      <div className="flex-1" />
      {error && (
        <div className="flex items-center gap-2 bg-destructive/5 border border-destructive px-2 py-1 rounded">
          <AlertOctagonIcon className="size-4 text-destructive" />
          <span className="text-destructive font-medium text-sm">{error}</span>
        </div>
      )}
      {children}
    </div>
  );
}
