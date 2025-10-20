import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { formatDistance } from "date-fns";
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
  <T>(url: string, token: string | null, withParams = false) =>
  async ({ queryKey }: { queryKey: any }): Promise<T> => {
    const [_key, params] = queryKey ?? [];
    const finalUrl = withParams ? `${url.replace(/\/$/, "")}/${params}` : url;

    try {
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await axios.get(finalUrl, { headers });
      return res.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message);
      }
      throw new Error("Unexpected error occurred");
    }
  };

export const formatTimeAgo = (date: string) => {
  return formatDistance(date, new Date(), { addSuffix: true });
};
