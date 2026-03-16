import { Skeleton } from "./ui/skeleton";

const SkeletonFilterSchema = () => {
  return (
    <div className="hidden flex-col mr-5 mt-5 space-y-6 sm:flex sm:w-40">
      <div className="flex flex-col gap-6">
        <Skeleton className="h-6 w-32 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-14" />
        </div>
        <Skeleton className="h-6 w-32 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonFilterSchema;
