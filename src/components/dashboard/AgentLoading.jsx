import Skeleton from "@/components/common/Skeleton";

function AgentLoading() {
  return (
    <div className="mx-auto flex h-[calc(100vh-90px)] max-w-6xl flex-col px-8 py-8">

      <Skeleton className="mb-6 h-16" />

      <div className="flex-1 space-y-5 rounded-2xl border border-slate-700 p-6">

        <Skeleton className="h-14 w-3/5" />
        <Skeleton className="ml-auto h-14 w-2/5" />
        <Skeleton className="h-14 w-4/5" />
        <Skeleton className="ml-auto h-14 w-1/2" />
        <Skeleton className="h-14 w-3/4" />

      </div>

      <Skeleton className="mt-6 h-14" />

    </div>
  );
}

export default AgentLoading;