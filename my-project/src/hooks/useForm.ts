import { useState } from "react";

export function useForm<T extends Record<string, any>>(initialValue: T) {
  const [formData, setFormData] = useState<T>(initialValue);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setField = (name: keyof T, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { formData, handleChange, setField };
}
