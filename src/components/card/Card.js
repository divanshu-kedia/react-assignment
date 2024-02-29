import "./styles.scss";
export default function Card({ dataList, handleCardViewClick }) {
  return (
    <div className="card-list">
      {dataList.map((userData) => {
        return (
          <div className="card">
            <div className="img-thumbnail">
              <img
                src={userData?.image}
                alt={userData?.userName}
                onClick={() => handleCardViewClick(true, userData)}
              />
            </div>
            <div>
              <div className="user-item">
                <div className="label">User Name:</div>
                <div onClick={() => handleCardViewClick(false, userData)}>
                  {userData?.userName}
                </div>
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
        );
      })}
    </div>
  );
}
