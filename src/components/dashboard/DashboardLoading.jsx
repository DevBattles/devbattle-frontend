import Skeleton from "@/components/common/Skeleton";

function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">

      <Skeleton className="h-56 w-full rounded-3xl" />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>

      <Skeleton className="h-56" />

      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>

      <Skeleton className="h-40" />

    </div>
  );
}

export default DashboardLoading;