"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";

type Category = {
  id: string;
  tags: string;
};

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFilter: (data: any[]) => void;
};

const Filter = ({ onFilter }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      const res = await axiosInstance.get("/api/categories");
      setCategories(res.data.data);
    };

    loadCategories();
  }, []);

  const handleFilter = async (category: string) => {
    if (selected === category) {
      setSelected("");

      const res = await axiosInstance.get("/api/gear");
      onFilter(res.data.data);
      return;
    }

    setSelected(category);

    const res = await axiosInstance.get(`/api/filter?category=${category}`);

    onFilter(res.data.data);
  };

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setOpen(!open)}>
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        Filter
      </Button>

      {open && (
        <div className="absolute z-50 mt-2 w-60 rounded-xl border bg-white p-4 shadow-xl">
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <Button
                key={item.id}
                variant={selected === item.tags ? "default" : "outline"}
                onClick={() => handleFilter(item.tags)}
              >
                {item.tags}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
