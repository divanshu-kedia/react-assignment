import React, { useEffect, useState } from "react";
import SearchBar from "../../components/search-bar";
import CommonTable from "../../components/common-table";
import Pagination from "../../components/pagination";
import fetchUserList from "../../api-services/userService";
import "./style.scss";
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
    console.log(key, data);
  };
  return (
    <div className="user-module">
      <div className="title">Random Users</div>
      <div className="user-search">
        <SearchBar onSearch={searchByUserName} />
      </div>
      <CommonTable
        dataList={transformedData}
        columns={columns}
        handleTableClick={handleTableClick}
      />
      <Pagination
        itemsPerPage={usersPerPage}
        paginate={paginate}
        totalItems={searchedUserList.length}
        currentPage={currentPage}
      />
    </div>
  );
}
