import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user details");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch user details");
        setLoading(false);
      });
  }, [id]);
  console.log(user);

  if (loading) {
    return (
      <p className="flex justify-center items-center h-screen text-center p-5">
        Loading...
      </p>
    );
  }

  if (error) {
    return <p className="flex justify-center items-center h-screen">{error}</p>;
  }

  return (
    <div className="h-screen flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-2">{user?.name || "No Name"}</h1>
      <p>{user.username}</p>
      <hr />
      <div>
        <h1 className="text-2xl font-bold mt-6">Contact</h1>
        <p>
          <span className="font-bold">email: </span> {user.email}
        </p>
        <p>
          <span className="font-bold">phone: </span>
          {user.phone}
        </p>
        <p>
          <span className="font-bold">website: </span> {user.website}
        </p>
      </div>
      <div>
        <h1 className="text-2xl font-bold mt-6">Company</h1>
        <h3>
          <span className="font-bold">company name: </span>
          {user.company.name}
        </h3>
        <p>
          <span className="font-bold">catchPhrase: </span>
          {user.company.catchPhrase}
        </p>
      </div>
      <div>
        <h1 className="text-2xl font-bold mt-6">Address</h1>
        <p>
          <span className="font-bold">Street </span>
          {user.address.street}
        </p>
        <p>
          <span className="font-bold">City: </span> {user.address.city}
        </p>
        <p>
          <span className="font-bold">Zipcode: </span> {user.address.zipcode}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
