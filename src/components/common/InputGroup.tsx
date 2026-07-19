import { Field, FieldDescription, FieldLabel } from "@/src/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/src/components/ui/input-group";
import { Textarea } from "../ui/textarea";

interface InputGroupProps extends React.ComponentProps<"input"> {
  element: "input" | "textarea";
  label: string;
  icon?: React.ReactNode;
  classNameLabel?: string;
  classNameField?:string
  classNameInput?:string
  description?: string;
  error?: string;
}

export function InputGroupInlineStart({
  element,
  label,
  icon,
  description,
  classNameLabel,
  classNameField,
  classNameInput,
  error,
  ...props
}: InputGroupProps) {
  return (
    (element === "input" && (
      <Field className='w-full text-start '>
        <FieldLabel className={classNameLabel!} htmlFor={props.id}>
          {props.required && label.length ? (
            <>
              {label} <b className="text-error500">*</b>
            </>
          ) : (
            label
          )}
        </FieldLabel>
        <InputGroup
          hidden={props.hidden}
          className={`${classNameField ? classNameField : 'bg-white'} rounded-md px-2.5  h-12 w-full flex items-center transition-all duration-100 ease-in border border-grey220`}
        >
          <InputGroupInput
          id={props.id}
            aria-invalid={error ? true : false}
            className={`h-full w-full ${classNameInput}`}
            {...props}
            name={props.name}
          />
          <InputGroupAddon align="inline-end">{icon}</InputGroupAddon>
        </InputGroup>
        <FieldDescription className="text-start text-red-500">
          {description}
        </FieldDescription>
      </Field>
    )) ||
    (element === "textarea" && (
      <Field className="w-full text-start">
        <FieldLabel className={classNameLabel!} htmlFor={props.name}>
          {props.required && label.length ? (
            <>
              {label} <b className="text-error500">*</b>
            </>
          ) : (
            label
          )}
        </FieldLabel>
        <Textarea rows={5} className={`${classNameField ? classNameField : 'bg-white'} w-full`} />
      </Field>
    ))
  );
}
