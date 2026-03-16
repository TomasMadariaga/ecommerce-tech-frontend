import { Skeleton } from "./ui/skeleton";

type SkeletonSchemaProps = {
  grid: number;
  className?: string;
};

const SkeletonSchema = (props: SkeletonSchemaProps) => {
  const { grid, className} = props;
  return Array.from({ length: grid }).map((_, index) => (
    <div
      key={index}
      className={`flex flex-col gap-3 mx-auto w-full max-w-75 sm:max-w-none p-4 ${className}`}
    >
      <div className="w-full flex justify-center">
        <Skeleton className="w-full sm:w-64 h-32 sm:h-48 rounded-xl" />
      </div>
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-1/2 sm:w-48 mx-auto" />
        <Skeleton className="h-4 w-1/3 sm:w-40 mx-auto" />
      </div>
    </div>
  ));
};

export default SkeletonSchema;
