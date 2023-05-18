import React from "react";
import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";
function LastLogins() {
  const { lastLogin } = useSelector((state) => state.lastLogins);
  const [page, setPage] = React.useState(1);

  const sortedLastLogin = [...lastLogin].sort((a, b) => {
    return b.date.toDate() - a.date.toDate();
  });
  return (
    <div>
      <li className=" p-2 rounded-lg shadow-sm my-3 text-xs">
        <h1 className="text-2xl font-bold mb-5">Son Girişler </h1>
        <span className="flex items-center justify-between text-center">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Tarih</th>
                <th className="px-4 py-2">IP Adresi</th>
                <th className="px-4 py-2">Kanal</th>
                <th className="px-4 py-2">Cihaz</th>
              </tr>
            </thead>
            <tbody>
              {sortedLastLogin
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((item) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2  max-w-xs">
                      {new Date(item.date.toDate()).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">{item.ip}</td>
                    <td className="border px-4 py-2">
                      {item.isMobile ? "Mobil" : "Masaüstü"}
                    </td>
                    <td className="w-full border px-4 py-2  max-w-xs">
                      {item.userAgent}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </span>
        <Pagination
          count={Number((sortedLastLogin.length / 10).toFixed(0))}
          variant="outlined"
          shape="rounded"
          color="warning"
          style={{
            padding: 30,
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </li>
    </div>
  );
}

export default LastLogins;
