import Skeleton from "@/components/common/Skeleton";

function ProfileLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-8">

      <div className="flex items-center gap-6">

        <Skeleton className="h-24 w-24 rounded-full" />

        <div className="space-y-3">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-5 w-40" />
        </div>

      </div>

      <Skeleton className="h-60" />

      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-44" />
        <Skeleton className="h-44" />
      </div>

    </div>
  );
}

export default ProfileLoading;