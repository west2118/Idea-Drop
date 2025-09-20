import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleSelected = (
  value: string,
  setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  limit: number
) => {
  setSelected((prev) => {
    if (prev.includes(value)) {
      return prev.filter((item) => item !== value);
    }

    if (prev.length < limit) {
      return [...prev, value];
    }

    return prev;
  });
};

export const handleAdd = (
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  limit: number
) => {
  if (!value.trim()) return;

  handleSelected(value, setSelected, limit);

  setValue("");
};

export const fetchData =
  (url: string, token: string | null, withParams = false) =>
  async ({ queryKey }: { queryKey: any }) => {
    const [_key, params] = queryKey;
    const finalUrl = withParams ? `${url}/${params}` : url;

    try {
      // Make the GET request with the Authorization header
      const res = await axios.get(finalUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error: any) {
      // Error handling
      console.error("Error fetching data:", error);
      throw new Error(error.response?.data?.message || "Error fetching data");
    }
  };
