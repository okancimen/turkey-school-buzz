import { Skeleton } from "@/components/ui/skeleton";

export const HeroNewsSkeleton = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl overflow-hidden">
          <Skeleton className="aspect-[16/10] w-full" />
        </div>
        <div className="rounded-2xl overflow-hidden">
          <Skeleton className="aspect-[16/10] w-full" />
        </div>
      </div>
    </section>
  );
};

export const NewsGridSkeleton = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-5 w-24" />
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden">
            <Skeleton className="aspect-[16/9] w-full" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
