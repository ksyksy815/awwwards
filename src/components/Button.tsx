type Props = {
  id: string;
  title: string;

  containerClass: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const Button = ({ title, id, rightIcon, leftIcon, containerClass }: Props) => {
  return (
    <button
      id={id}
      className={`relative z-10 py-3 overflow-hidden text-black rounded-full cursor-pointer group w-fit bg-violet-50 px-7 ${containerClass}`}
    >
      {!!leftIcon && leftIcon}
      <span className="relative inline-flex overflow-hidden text-xs uppercase font-general">
        <div>{title}</div>
      </span>
      {!!rightIcon && rightIcon}
    </button>
  );
};

export default Button;
