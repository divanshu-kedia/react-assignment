import "./styles.scss";
import { useContext } from "react";
import { UsersContext } from "../../context/userContext";

export default function UserModal({ isImagePreview }) {
  const { userData } = useContext(UsersContext);

  return (
    <div className="user-modal">
      {isImagePreview ? (
        <div className="enlarged-thumbnail">
          <img src={userData?.image} alt={userData?.userName} />
        </div>
      ) : (
        <div>
          <div className="header">{userData?.fullName}</div>
          <div className="body">
            <div className="img-thumbnail">
              <img src={userData?.image} alt={userData?.userName} />
            </div>
            <div className="user-item">
              <div className="label">Gender:</div>
              <div>{userData?.gender}</div>
            </div>
            <div className="user-item">
              <div className="label">Email:</div>
              <div>{userData?.email}</div>
            </div>
            <div className="user-item">
              <div className="label">Address:</div>
              <div>{userData?.location}</div>
            </div>
            <div className="user-item">
              <div className="label">Mobile:</div>
              <div>{userData?.phoneNumber}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
