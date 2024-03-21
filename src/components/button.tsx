import { forwardRef, useMemo } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { tv } from "tailwind-variants";

type ButtonType = "button" | "submit" | "reset" | undefined;

// define all the button attributes
type BaseButtonAttributes = React.ComponentPropsWithoutRef<"button">;

// define the ref type
type Ref = HTMLButtonElement;

// extend the base button attributes
interface ButtonProps extends BaseButtonAttributes {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: ButtonType;
  disabled?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
}

// base style
const baseStyle = tv({
  base: "text-center p-3 relative font-semibold text-sm whitespace-nowrap align-middle outline-none rounded-lg inline-flex items-center justify-center select-none disabled:cursor-not-allowed",
});
// eslint-disable-next-line react/display-name
const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  // destructure neccesary props
  const {
    children,
    onClick,
    disabled,
    isLoading,
    className,
    rightIcon,
    leftIcon,
    ...rest
  } = props;

  // determine icon placement
  const { newIcon: icon, iconPlacement } = useMemo(() => {
    let newIcon = rightIcon ?? leftIcon;

    if (isLoading) {
      newIcon = (
        <AiOutlineLoading3Quarters
          className="mr-2 animate-spin dark:text-white"
          size={20}
        />
      );
    }

    return {
      newIcon,
      iconPlacement: rightIcon ? ("right" as const) : ("left" as const),
    };
  }, [isLoading, leftIcon, rightIcon]);

  const renderClassname = () => baseStyle({ className });

  return (
    <button
      onClick={onClick}
      className={renderClassname()}
      disabled={disabled ?? isLoading}
      ref={ref}
      {...rest}
    >
      {/** render icon before */}
      {icon && iconPlacement === "left" ? (
        <span
          className={`inline-flex shrink-0 self-center ${
            children && !isLoading && "mr-2"
          }`}
        >
          {icon}
        </span>
      ) : null}

      {/** hide button text during loading state */}
      {children}

      {/** render icon after */}
      {icon && iconPlacement === "right" ? (
        <span
          className={`inline-flex shrink-0 self-center  ${
            children && !isLoading && "ml-2"
          }`}
        >
          {icon}
        </span>
      ) : null}
    </button>
  );
});

export default Button;
