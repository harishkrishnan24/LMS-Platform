import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";

export default async function SearchPage() {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
      </div>
    </>
  );
}
