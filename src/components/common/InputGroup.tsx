import { Field, FieldDescription, FieldLabel } from "@/src/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/src/components/ui/input-group";
import { Textarea } from "../ui/textarea";

interface InputGroupProps extends React.ComponentProps<"input"> {
  element: "input" | "textarea";
  label?: string;
  icon?: React.ReactNode | string;
  classNameLabel?: string;
  classNameField?: string;
  classNameInput?: string;
  caption?: string;
  error?: string;
}

export function InputGroupInlineStart({
  element,
  label,
  icon,
  caption,
  classNameLabel,
  classNameField,
  classNameInput,
  error,
  ...props
}: InputGroupProps & React.ComponentProps<"textarea">) {
  return (
    (element === "input" && (
      <Field className="w-full text-start ">
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
          className={`${classNameField ? classNameField : "bg-white h-12"} rounded-md px-2.5   w-full flex items-center transition-all duration-100 ease-in border border-grey220`}
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
          {caption}
        </FieldDescription>
      </Field>
    )) ||
    (element === "textarea" && (
      <Field className={`w-full text-start ${classNameField}`}>
        <FieldLabel className={classNameLabel!} htmlFor={props.name}>
          {props.required && label.length ? (
            <>
              {label} <b className="text-error500">*</b>
            </>
          ) : (
            label
          )}
        </FieldLabel>
        <Textarea
          rows={10}
          {...props}
          name={props.name}
          className={`${classNameInput ? classNameInput : "bg-white"} w-full`}
        />
        <FieldDescription className="text-start text-red-500">
          {caption}
        </FieldDescription>
      </Field>
    ))
  );
}
