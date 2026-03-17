import { Skeleton } from "@/components/ui/skeleton";

const SkeletonProduct = () => {
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
      <div className="grid sm:grid-cols-2">
        <div className="flex justify-center items-center p-4 sm:p-0">
          <Skeleton className="w-9/12 px-4 max-w-100 h-72 sm:h-87.5 rounded-lg" />
        </div>
        <div className="w-10/12 sm:w-full mx-auto sm:px-12 space-y-4 sm:space-y-6 mt-6 sm:mt-0">
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4 sm:h-8 sm:w-2/3" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-10 w-1/3 sm:w-1/4" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonProduct;
