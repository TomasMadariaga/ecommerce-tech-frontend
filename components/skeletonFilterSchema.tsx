import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

type SkeletonSchemaProps = {
  grid: number;
};

const SkeletonFilterSchema = (props: SkeletonSchemaProps) => {
  const { grid } = props;
  return Array.from({ length: grid }).map((_, index) => (
    <div key={index} className="hidden flex-col mx-auto mt-5 space-y-6 sm:flex">
      <div className="flex flex-col gap-6">
        <Skeleton className="h-6 w-50 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-50" />
          <Skeleton className="h-4 w-50" />
          <Skeleton className="h-4 w-50" />
          <Skeleton className="h-4 w-50" />
        </div>
        <Skeleton className="h-6 w-50 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-50" />
        </div>
      </div>
    </div>
  ));
};

export default SkeletonFilterSchema;
