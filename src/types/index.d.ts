type TimeSetProps = {
  title: string;
};

type ArrowButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  direction: "up" | "down";
};

// type TimeControlState = {
//   breakLength: number;
//   sessionLength: number;
//   sessionTime: string;
//   breakTime: string;
// };
