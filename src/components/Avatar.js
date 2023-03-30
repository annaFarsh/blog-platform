import UserAvatar from "../img/UserAvatar.svg";
import { Img } from "react-image";
function Avatar(image) {
  return (
    <div className="user-path__avatar">
      <Img
        alt="аватар"
        src={[image.image, UserAvatar]}
        width="46px"
        height="46px"
      />
    </div>
  );
}
export default Avatar;
