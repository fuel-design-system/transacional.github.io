import * as React from "react";
import styles from "./badge.module.scss";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantClass = styles[`variant-${variant}`];
  const classes = [styles.badge, variantClass, className].filter(Boolean).join(" ");

  return <div className={classes} {...props} />;
}

export { Badge };
