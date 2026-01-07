import * as React from "react";
import styles from "./switch.module.scss";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
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
      <label className={styles['switch-wrapper']} data-disabled={disabled}>
        <input
          type="checkbox"
          role="switch"
          ref={ref}
          className={styles['switch-input']}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />
        <div
          className={[styles.switch, className].filter(Boolean).join(" ")}
          data-state={isChecked ? "checked" : "unchecked"}
          data-disabled={disabled}
        >
          <div className={styles['switch-thumb']} />
        </div>
        {label && <span>{label}</span>}
      </label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
