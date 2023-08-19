import "./button.scss";

type Props = {
  text: string;
  func?: () => void;
};

export const Button: React.FC<Props> = ({ text, func }) => {
  return (
    <button className="button" onClick={func}>
      {text}
    </button>
  );
};
