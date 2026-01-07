import "./button.css";

interface ButtonProps {
  type: "add" | "remove" | "checkout";
  title: string;
  disabled?: boolean;

  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const { type, title, disabled, onClick } = props;

  return (
    <button
      className={`btn ${
        (type === "add" && "add") ||
        (type === "remove" && "remove") ||
        (type === "checkout" && "checkout")
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
