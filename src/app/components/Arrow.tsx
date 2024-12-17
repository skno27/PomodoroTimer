import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function Arrow({
  onClick,
  direction,
}: ArrowButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="arrow-button">
      {direction === "up" && <FontAwesomeIcon icon={faArrowUp} />}
      {direction === "down" && <FontAwesomeIcon icon={faArrowDown} />}
    </button>
  );
}
