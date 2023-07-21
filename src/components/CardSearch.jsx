import React from "react";

const CardSearch = ({ dataSearch, setidUpdate, deleteData }) => {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-5">
        {dataSearch?.map((item, index) => (
          <div
            key={index}
            className="w-56 h-80 text-center flex flex-col items-center bg-white rounded-md"
          >
            <img src={item.image} className="h-36" />
            <h1>{item.name}</h1>
            <p>Rp{item.purchaseprice}</p>
            <p>Rp{item.sellprice}</p>
            <p>Stock: {item.stock}</p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => deleteData(index)}
                className="bg-red-600 text-white p-2 px-3 rounded-md"
              >
                Delete
              </button>
              <label
                onClick={() => setidUpdate(index)}
                htmlFor="my_modal_7"
                className="bg-blue-600 text-white p-2 px-3 rounded-md"
              >
                Update
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSearch;
