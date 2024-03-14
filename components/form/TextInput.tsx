import { Input } from "@nextui-org/react";
import { useField } from "formik";

export default function TextInput({
  name,
  label,
  placeholder,
  size,
  fullWidth = false,
  ...props
}: {
  name: string;
  fullWidth?: boolean;
  label?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg" | undefined;
}) {
  const [field, meta] = useField(name);

  return (
    <div
      style={{
        width: fullWidth ? "100%" : undefined,
      }}
      className={"flex flex-col gap-1"}
    >
      <label className={"font-bold text-lg"} htmlFor={name}>
        {label}
      </label>
      <Input
        {...props}
        id={name}
        name={name}
        isInvalid={meta.error !== undefined}
        errorMessage={meta.error}
        onChange={(e) => {
          field.onChange(e);
        }}
        size={size}
        placeholder={placeholder}
        type="text"
        variant={"bordered"}
        color={"primary"}
        style={{
          width: fullWidth ? "100%" : undefined,
        }}
      />
    </div>
  );
}
