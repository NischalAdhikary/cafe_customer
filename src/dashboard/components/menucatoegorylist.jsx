import React from "react";
import Button from "./botton";
import { useGetCategoryQuery } from "../../store/api/Category";
import { CategoryButtonSkeleton } from "./skeleton";

export default function Menucategorylist({ onCategorySelect }) {
  const { data, isLoading } = useGetCategoryQuery();
  console.log("data", data);
  if (isLoading) return <CategoryButtonSkeleton />;
  return (
    <div className="flex items-center gap-3 mb-3 p-2   flex-nowrap overflow-x-auto">
      <Button
        variant={"secondary"}
        key="all"
        onClick={() => onCategorySelect("All")}
      >
        All
      </Button>
      {data.data.map((item) => (
        <Button
          variant={"secondary"}
          key={item.categoryid}
          onClick={() => onCategorySelect(item.categoryid)}
        >
          {item.categoryname}
        </Button>
      ))}
    </div>
  );
}
