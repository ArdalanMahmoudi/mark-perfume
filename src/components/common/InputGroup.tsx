import { Field, FieldDescription, FieldLabel } from "@/src/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/src/components/ui/input-group";

interface InputGroupProps extends React.ComponentProps<'input'> {
  label: string;
  icon: React.ReactNode;
  description?:string;
  error:string
}

export function InputGroupInlineStart({
  label,
  icon,
  description,
  error,
  ...props
}: InputGroupProps) {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="inline-start-input">{label}</FieldLabel>
      <InputGroup className="bg-white rounded-md px-2.5  h-12 w-full flex items-center transition-all duration-100 ease-in border border-grey220">
        <InputGroupInput aria-invalid={error ? true : false}  className="h-full w-full " {...props} />
        <InputGroupAddon align="inline-end">{icon}</InputGroupAddon>
      </InputGroup>
      <FieldDescription>{description}</FieldDescription>
    </Field>
  );
}
