import React, { useEffect, useState, useRef, useContext } from "react";
import SearchBar from "../../components/search-bar";
import CommonTable from "../../components/common-table";
import Pagination from "../../components/pagination";
import fetchUserList from "../../api-services/userService";
import "./style.scss";
import ModalTemplate from "../../components/modal-template";
import UserModal from "../../components/user-modal";
import useResponsive from "../../hooks/useResponsive";
import Card from "../../components/card";
import { UsersContext } from "../../context/userContext";
function convertDateFormat(dateString) {
  const dateObject = new Date(dateString);

  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const year = dateObject.getFullYear();

  return `${day}/${month}/${year}`;
}
export default function UserModule() {
  const [allUserList, setAllUserList] = useState([]);
  const [searchedUserList, setSearchedUserList] = useState([]);
  const { setUserData } = useContext(UsersContext);

  const columns = [
    {
      label: "",
      key: "image",
      isImage: true,
      className: "active",
    },
    {
      label: "Full Name",
      key: "fullName",
    },
    {
      label: "User Name",
      key: "userName",
      className: "link",
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "DOB",
      key: "dob",
    },
    {
      label: "Location",
      key: "location",
    },
    {
      label: "Phone No.",
      key: "phoneNumber",
    },
  ];
  useEffect(() => {
    fetchUserList()
      .then((result) => {
        const dataList = JSON.parse(result.data)?.users || [];
        setAllUserList(dataList);
        setSearchedUserList(dataList);
      })
      .catch((err) => {
        alert("Error in retrieving User list!!");
      });
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isImagePreview, setIsImagePreview] = useState(false);

  const { isMobile } = useResponsive();
  const modalRef = useRef();
  const openModal = () => {
    modalRef.current?.openModal();
  };

  const closeModal = () => {
    modalRef.current?.closeModal();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const transformedData = searchedUserList
    .slice(
      (currentPage - 1) * usersPerPage,
      (currentPage - 1) * usersPerPage + usersPerPage
    )
    .map((item) => {
      return {
        fullName: `${item.firstName || ""} ${item.maidenName} ${
          item.lastName || ""
        }`.trim(),
        userName: item.username,
        image: item.image,
        email: item.email,
        gender: item.gender,
        dob: item.birthDate ? convertDateFormat(item.birthDate) : null,
        location: [
          item.address.address,
          item.address.city,
          item.address.state,
          item.address.postalCode,
        ]
          .filter((item) => !!item)
          .join(", ")
          .trim(),
        phoneNumber: item.phone.replaceAll("-", ""),
      };
    });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const searchByUserName = (value) => {
    setCurrentPage(1);
    setSearchTerm(value);
    setSearchedUserList(
      allUserList.filter((item) =>
        item.username.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleTableClick = (key, data) => {
    if (key === "userName") {
      setIsImagePreview(false);
      openModal();
    } else if (key === "image") {
      setIsImagePreview(true);
      openModal();
    }
    setUserData(data);
  };
  const handleCardViewClick = (isImagePreview, data) => {
    if (isImagePreview) {
      setIsImagePreview(true);
    } else {
      setIsImagePreview(false);
    }
    openModal();
    setUserData(data);
  };
  return (
    <>
      <ModalTemplate ref={modalRef}>
        <UserModal isImagePreview={isImagePreview}></UserModal>
      </ModalTemplate>
      <div className="user-module">
        <div className="title">Random Users</div>
        <div className="user-search">
          <SearchBar onSearch={searchByUserName} />
        </div>
        {isMobile ? (
          <Card
            dataList={transformedData}
            handleCardViewClick={handleCardViewClick}
          />
        ) : (
          <CommonTable
            dataList={transformedData}
            columns={columns}
            handleTableClick={handleTableClick}
          />
        )}
        <Pagination
          itemsPerPage={usersPerPage}
          paginate={paginate}
          totalItems={searchedUserList.length}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}
