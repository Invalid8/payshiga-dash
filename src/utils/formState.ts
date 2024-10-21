import { useState } from "react";
import { ZodError } from "zod";

export function useField<T>(
  initialValue: T,
  validationSchema: any
): { value: T; error: string; handleChange: (x: T) => void } {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string>("");

  const handleChange = (newValue: T) => {
    setValue(newValue);
    try {
      validationSchema.parse(newValue);
      setError("");
    } catch (validationError) {
      if (validationError instanceof ZodError) {
        setError(validationError.errors[0]?.message || "Validation error");
      }
    }
  };

  return { value, error, handleChange };
}
