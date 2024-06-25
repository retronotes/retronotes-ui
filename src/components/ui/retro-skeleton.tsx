import { Skeleton } from "@/components/ui/skeleton"

export default function RetroSkeleton() {
  return (
    <div className="flex justify-around mt-1">
      <div className="flex flex-col gap-2">
        {[...Array(12)].map((_, i) => (
          <Skeleton key={i} className="h-[5vh] w-[24vw]" />
        ))}
      </div>
    </div>
  )

}