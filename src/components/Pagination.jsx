import React from "react";

function Pagination({ group, setPage, currentPage }) {
  const pages = [];
  for (let i = 1; i <= group; i++) {
    pages.push(i);
  }
  return (
    <div className="flex gap-5 justify-center">
      {pages?.map((value, i) => (
        <button
          onClick={() => setPage(value)}
          className="px-3 bg-black text-slate-100"
          key={i}
          style={{
            backgroundColor: value === currentPage ? "brown" : "black",
            color: "white",
          }}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
