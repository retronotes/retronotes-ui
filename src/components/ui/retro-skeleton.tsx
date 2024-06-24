import { Skeleton } from "@/components/ui/skeleton"

export default function RetroSkeleton() {
  return (
    <div className="flex justify-around mt-1">
      <div>
        <Skeleton className="h-[80vh] w-[24vw]" />
      </div>
    </div>
  )

}