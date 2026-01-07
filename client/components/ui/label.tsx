import * as React from "react";
import styles from "./label.module.scss";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
  invalid?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, disabled, invalid, ...props }, ref) => {
    const classes = [styles.label, className].filter(Boolean).join(" ");

    return (
      <label
        ref={ref}
        className={classes}
        data-disabled={disabled}
        data-invalid={invalid}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export { Label };
