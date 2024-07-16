import { CSVLink } from "react-csv";
import { useEffect, useState } from "react";

const roleList = ["admin", "editor", "user"];
export default function ReactCSV({ fetchedData }) {
  const [dataToSave, setDataToSave] = useState([]);
  useEffect(() => {
    let newData = [];
    for (const obj of fetchedData) {
      //console.log(obj.name, obj.age);
      if (!roleList.includes(obj.role)) {
        obj.role = "user";
        newData.push(obj);
      } else {
        newData.push(obj);
      }
    }
    setDataToSave(newData);
  }, [fetchedData]);

  const headers = [
    { label: "ID", key: "id" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Role", key: "role" },
    { label: "Avatar", key: "avatar" },
  ];
  return (
    <CSVLink
      data={dataToSave}
      filename="Users"
      target="_blank"
      headers={headers}
    >
      Export to SCV
    </CSVLink>
  );
}
