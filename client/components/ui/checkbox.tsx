import * as React from "react";
import { Check } from "lucide-react";
import styles from "./checkbox.module.scss";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, checked, onCheckedChange, disabled, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(checked || false);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      
      onCheckedChange?.(newChecked);
      props.onChange?.(e);
    };

    return (
      <label className={styles['checkbox-wrapper']} data-disabled={disabled}>
        <input
          type="checkbox"
          ref={ref}
          className={styles['checkbox-input']}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />
        <div
          className={[styles.checkbox, className].filter(Boolean).join(" ")}
          data-state={isChecked ? "checked" : "unchecked"}
        >
          <Check className={styles['checkbox-icon']} />
        </div>
        {label && <span>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
