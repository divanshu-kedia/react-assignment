import React from "react";
import "./style.scss";
export default function CommonTable({ columns, dataList, handleTableClick }) {
  return (
    <div className="common-table">
      <table className="w-100">
        <thead>
          <tr>
            {columns.map((column) => {
              return <th key={column.key}>{column.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {dataList.map((data) => {
            return (
              <tr key={data.id}>
                {columns.map((column) => {
                  if (column.isImage) {
                    return (
                      <td
                        key={data.id + column.key}
                        className={`img-thumbnail ${column.className}`}
                        onClick={() => handleTableClick(column.key, data)}
                      >
                        <img src={data[column.key]} alt="User thumbnail" />
                      </td>
                    );
                  }
                  return (
                    <td
                      key={data.id + column.key}
                      onClick={() => handleTableClick(column.key, data)}
                      title={data[column.key]}
                      className={`${column.className}`}
                    >
                      {data[column.key]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
