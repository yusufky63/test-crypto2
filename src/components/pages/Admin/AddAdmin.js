import React, {useEffect, useState} from "react";
import {getUsers, setAdmin} from "../../../services/firebase";

function AddAdmin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((res) => {
      res.sort((a, b) => {
        if (a.isFounder && !b.isFounder) {
          return -1; // a, b'den önce gelmeli
        } else if (b.isFounder && !a.isFounder) {
          return 1; // b, a'dan önce gelmeli
        } else {
          return 0; // sıralama değişmemeli
        }
      });
      setUsers(res);
    });
  }, [users]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Admin Ekle</h1>
      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <div
            key={user.uid}
            className="p-4 bg-white rounded-lg shadow-md flex items-center justify-between relative"
          >
            <div className="flex flex-col ">
              <p className="text-lg font-bold">{user.displayName}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <p className="text-gray-500 text-sm absolute top-0">
                {user.isFounder ? (
                  <span className="shadow-sm  p-1 px-3 rounded bg-yellow-400 ">
                    Kurucu{" "}
                  </span>
                ) : user.isAdmin ? (
                  <span className="shadow-sm  p-1 px-4 text-white rounded bg-blue-300 ">
                    Admin
                  </span>
                ) : (
                  <span className="border shadow-sm p-1 px-4  rounded bg-white ">
                    User{" "}
                  </span>
                )}
              </p>
            </div>
            <button
              className={`${
                user.isAdmin ? "bg-gray-400 " : "bg-blue-500"
              } px-4 py-2 rounded-md text-white font-medium`}
              onClick={() => setAdmin(user.id)}
            >
              {user.isAdmin ? "Admin" : "Admin Yap"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddAdmin;
