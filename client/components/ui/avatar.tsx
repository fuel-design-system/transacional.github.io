import * as React from "react";
import styles from "./avatar.module.scss";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = "md", ...props }, ref) => {
    const sizeClass = styles[`size-${size}`];
    const classes = [styles.avatar, sizeClass, className].filter(Boolean).join(" ");
    
    return <div ref={ref} className={classes} {...props} />;
  }
);
Avatar.displayName = "Avatar";

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, ...props }, ref) => {
    const classes = [styles['avatar-image'], className].filter(Boolean).join(" ");
    
    return <img ref={ref} className={classes} {...props} />;
  }
);
AvatarImage.displayName = "AvatarImage";

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => {
    const classes = [styles['avatar-fallback'], className].filter(Boolean).join(" ");
    
    return <div ref={ref} className={classes} {...props} />;
  }
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
