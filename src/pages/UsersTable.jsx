import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [sort, setSort] = useState("asc");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSort(sort === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSort("asc");
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = sortColumn === "company" ? a.company.name : a[sortColumn];
    const bValue = sortColumn === "company" ? b.company.name : b[sortColumn];
    return sort === "asc"
      ? aValue.toLowerCase().localeCompare(bValue.toLowerCase())
      : bValue.toLowerCase().localeCompare(aValue.toLowerCase());
  });

  return (
    <div className="w-full p-4">
      <table className="w-full border border-gray-400 table-fixed">
        <thead>
          <tr>
            <th
              className="border border-gray-400 p-2 w-1/4 text-center"
              onClick={() => handleSort("name")}
            >
              Name {sortColumn === "name" ? (sort === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="border border-gray-400 p-2 w-1/4 text-center">
              Email
            </th>
            <th className="border border-gray-400 p-2 w-1/4 text-center">
              Phone
            </th>
            <th
              className="border border-gray-400 p-2 w-1/4 text-center"
              onClick={() => handleSort("company")}
            >
              Company{" "}
              {sortColumn === "company" ? (sort === "asc" ? "↑" : "↓") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr
              key={user.id}
              onClick={() => navigate(`/user/${user.id}`)}
              className="cursor-pointer hover:bg-gray-200"
            >
              <td className="border border-gray-400 p-2 w-1/4 text-center">
                {user.name}
              </td>
              <td className="border border-gray-400 p-2 w-1/4 text-center">
                {user.email}
              </td>
              <td className="border border-gray-400 p-2 w-1/4 text-center">
                {user.phone}
              </td>
              <td className="border border-gray-400 p-2 w-1/4 text-center">
                {user.company.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
