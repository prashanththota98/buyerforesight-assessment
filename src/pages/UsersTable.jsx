import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSort, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

const UsersTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [sort, setSort] = useState("asc");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSort(sort === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSort("asc");
    }
  };

  const sortedUsers = useMemo(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    );
    return [...filtered].sort((a, b) => {
      if (!sortColumn) return 0;
      const aValue = sortColumn === "company" ? a.company.name : a[sortColumn];
      const bValue = sortColumn === "company" ? b.company.name : b[sortColumn];
      return sort === "asc"
        ? aValue.toLowerCase().localeCompare(bValue.toLowerCase())
        : bValue.toLowerCase().localeCompare(aValue.toLowerCase());
    });
  }, [users, search, sortColumn, sort]);

  if (error) {
    return <p className="flex justify-center items-center h-screen">{error}</p>;
  }

  return (
    <div className="md:w-full p-4 flex flex-col items-center ">
      <div className="mb-3">
        <input
          type="text"
          placeholder="search by name or email..."
          className="bg-gray-300 p-1 w-64 rounded outline"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="w-full border border-gray-400 table-fixed">
        <thead>
          <tr>
            <th
              className="border border-gray-400 p-2 w-1/4 text-center sm:w-1.5"
              onClick={() => handleSort("name")}
            >
              Name{" "}
              {sortColumn === "name" ? (
                sort === "asc" ? (
                  <FaSortAlphaDown />
                ) : (
                  <FaSortAlphaUp />
                )
              ) : (
                <span>
                  <FaSort />
                </span>
              )}
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
              {sortColumn === "company" ? (
                sort === "asc" ? (
                  <FaSortAlphaDown />
                ) : (
                  <FaSortAlphaUp />
                )
              ) : (
                <span>
                  <FaSort />
                </span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                loading...
              </td>
            </tr>
          ) : sortedUsers.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No users found
              </td>
            </tr>
          ) : (
            sortedUsers.map((user) => (
              <tr
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
                className="cursor-pointer hover:bg-gray-200"
              >
                <td className="border border-gray-400 p-2 w-1/4 text-center wrap-break-word">
                  {user.name}
                </td>
                <td className="border border-gray-400 p-2 w-1/4 text-center wrap-break-word">
                  {user.email}
                </td>
                <td className="border border-gray-400 p-2 w-1/4 text-center">
                  {user.phone}
                </td>
                <td className="border border-gray-400 p-2 w-1/4 text-center">
                  {user.company.name}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
