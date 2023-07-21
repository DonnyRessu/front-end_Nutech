import { useEffect, useMemo, useState } from "react";
import axios, { all } from "axios";
import Swal from "sweetalert2";
import Pagination from "./components/Pagination";
import "./App.css";
import CardProducts from "./components/CardProducts";
import CardSearch from "./components/CardSearch";
import { useMutation } from "react-query";
import {
  addProduct,
  addProducts,
  deleteProduct,
  updateProduct,
} from "../src/redux/reducer/product";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const Login = {
    email: "admin@gmail.com",
    password: "123456",
  };

  const handleOnSubmit = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/login",
        Login
      );
      console.log(" ", response);

      const token = JSON.stringify(response.data.data.token);
      localStorage.setItem("token", token);
      setToken(token);

      alert("token ada");
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const clearToken = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const [token, setToken] = useState("");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  //search
  const [searchTerm, setSearchTerm] = useState("");
  const [dataSearch, setdataSearch] = useState(products);

  const [isloading, setIsloading] = useState(true);
  const [idUpdate, setidUpdate] = useState(0);
  const [product, setProduct] = useState({
    image: "",
    name: "",
    purchaseprice: 0,
    sellprice: 0,
    stock: 0,
  });

  const [dataUpdate, setDataUpdate] = useState({
    image: "",
    name: "",
    purchaseprice: 0,
    sellprice: 0,
    stock: 0,
  });
  const [dataProduct, setDataProduct] = useState(null);

  useEffect(() => {
    setdataSearch(products);
    setIsloading(false);
  }, []);

  useEffect(() => {
    setdataSearch(products);
  }, [products]);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  // let group;
  // // let currentPost;
  // let producFilter;

  if (isloading) {
    return <div>Loading...</div>;
  }

  const deleteData = (id) => {
    console.log(id, "ini idinya mas ");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const deleteDataSearch = (id) => {
    console.log(id, "ini idinya srcnya mas ");
    console.log(dataSearch, "data mas ");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let tempPosts = [...dataSearch];
        tempPosts.splice(id, 1);
        setDataProduct(tempPosts);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleOnChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      const blobUrl = URL.createObjectURL(file);
      setProduct((prev) => ({
        ...prev,
        [e.target.name]: blobUrl,
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const updateOnChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      const blobUrl = URL.createObjectURL(file);
      setDataUpdate((prev) => ({
        ...prev,
        [e.target.name]: blobUrl,
      }));
    } else {
      setDataUpdate((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleClickUpdate = (id) => {
    setidUpdate(id.name);
    const toUpdate = products.find((item) => item.name === id.name);
    console.log(toUpdate);
    setDataUpdate(toUpdate);
  };

  const handleKeyPress = (event) => {
    if (!/\d/.test(event.key)) {
      event.preventDefault();
      alert("inputan harus angka");
    }
  };

  const tambahProduct = (e) => {
    e.preventDefault();
    dispatch(addProduct(product));
  };

  const updateProduct = (e) => {
    e.preventDefault();
    dispatch(updateProduct(dataUpdate));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const results = products.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setdataSearch(results);
    console.log(dataSearch);
  };

  return (
    <>
      <div>
        <p className="text-black">YOUR TOKEN: {token}</p>
      </div>
      <div>
        <button
          onClick={(e) => handleOnSubmit(e)}
          className="bg-orange-600 mr-10 px-5 py-2 rounded text-white"
        >
          generate token
        </button>
        <button
          onClick={clearToken}
          className="bg-slate-950 mr-10 px-5 py-2 rounded text-white"
        >
          clear token
        </button>
      </div>
      <div>
        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box bg-white text-zinc-800">
            <h3 className="text-xl font-bold mb-5">Update Product</h3>
            <form key={"update"} onSubmit={updateProduct}>
              <div className="flex flex-col items-center gap-5 w-full h-full bg-white justify-center">
                <div className="flex flex-row-reverse gap-3">
                  <label
                    className="bg-zinc-800 text-white p-3 px-14 w-28 "
                    for="imageUpdate"
                  >
                    Image
                  </label>
                  <input
                    className="px-2 py-2 border-2 border-blue-200 rounded-md "
                    type="file"
                    placeholder="Foto"
                    onChange={updateOnChange}
                    name="image"
                    hidden
                    accept="image/png, image/jpeg"
                    id="imageUpdate"
                    required
                  />

                  <input
                    className="px-2 py-2 border-2 border-blue-200 rounded-md bg-white w-full"
                    type="text"
                    placeholder="Nama Produk"
                    onChange={updateOnChange}
                    name="name"
                    value={dataUpdate.name}
                  />
                </div>
                <input
                  className="px-2 py-2 border-2 border-blue-200 rounded-md bg-white w-2/3"
                  type="text"
                  onKeyPress={handleKeyPress}
                  placeholder="Harga Beli"
                  onChange={updateOnChange}
                  name="purchaseprice"
                  value={dataUpdate.purchaseprice}
                />
                <input
                  className="px-2 py-2 border-2 border-blue-200 rounded-md bg-white w-2/3"
                  type="text"
                  onKeyPress={handleKeyPress}
                  placeholder="Harga Jual"
                  onChange={updateOnChange}
                  name="sellprice"
                  value={dataUpdate.sellprice}
                />
                <input
                  className="px-2 py-2 border-2 border-blue-200 rounded-md bg-white w-2/3"
                  type="text"
                  onKeyPress={handleKeyPress}
                  placeholder="Stok Barang"
                  onChange={updateOnChange}
                  name="stock"
                  value={dataUpdate.stock}
                />
                <div className="modal-action">
                  <input
                    type="submit"
                    value="Update Product"
                    className="p-4 px-10 bg-zinc-800 text-white rounded-lg "
                  />
                </div>
              </div>
            </form>
          </div>
          <label className="modal-backdrop" htmlFor="my_modal_7">
            Close
          </label>
        </div>
      </div>

      <div>
        <input type="checkbox" id="my_modal_8" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box bg-white text-zinc-800">
            <h3 className="text-xl font-bold mb-5">Update Product</h3>
            <form key={"add"} onSubmit={(e) => tambahProduct(e)}>
              <div className="flex flex-col items-center gap-5 w-full h-full bg-white justify-center">
                <div className="flex flex-row-reverse gap-3">
                  <label
                    className="bg-zinc-800 text-white p-3 px-14 "
                    for="image"
                  >
                    Image
                  </label>
                  <input
                    className="px-2 py-2 border-2 border-blue-200 rounded-md "
                    type="file"
                    placeholder="Foto"
                    onChange={handleOnChange}
                    name="image"
                    hidden
                    accept="image/png, image/jpeg"
                    id="image"
                  />

                  <input
                    className="px-2 py-2 border-2 border-blue-200 rounded-md bg-white w-full"
                    type="text"
                    placeholder="Nama Produk"
                    onChange={handleOnChange}
                    name="name"
                  />
                </div>
                <input
                  className="px-2 py-2 border-2 border-blue-200 rounded-md bg-white w-2/3"
                  type="text"
                  onKeyPress={handleKeyPress}
                  placeholder="Harga Beli"
                  onChange={handleOnChange}
                  name="purchaseprice"
                />
                <input
                  className="px-2 py-2 border-2 border-blue-200 rounded-md bg-white w-2/3"
                  type="text"
                  onKeyPress={handleKeyPress}
                  placeholder="Harga Jual"
                  onChange={handleOnChange}
                  name="sellprice"
                />
                <input
                  className="px-2 py-2 border-2 border-blue-200 rounded-md bg-white w-2/3"
                  type="text"
                  onKeyPress={handleKeyPress}
                  placeholder="Stok Barang"
                  onChange={handleOnChange}
                  name="stock"
                />
                <input
                  type="submit"
                  value="Tambah Product"
                  className="p-4 px-10 bg-zinc-800 text-white rounded-lg "
                />
              </div>
            </form>
          </div>
          <label className="modal-backdrop" htmlFor="my_modal_8">
            Close
          </label>
        </div>
      </div>

      <div>
        <div className="w-full h-full flex-col flex items-center justify-center">
          <p className="text-medium text-3xl pb-5 text-zinc-900">
            Tugas Nutech
          </p>
          <label
            onClick={() => {
              if (!token) {
                return alert("token belum di generate");
              }
              // setidUpdate(index);
            }}
            htmlFor={token ? "my_modal_8" : null}
            className="bg-blue-600 text-white p-2 px-3 rounded-md"
          >
            Add Product
          </label>
        </div>
        <div className="mt-10">
          <div>
            <input
              type="text"
              name="search"
              className="mb-5 bg-white border-2 border-blue-300 p-1 px-4 w-1/3 rounded-md"
              placeholder="Search"
              onChange={(e) => handleSearch(e)}
              value={searchTerm}
            />
          </div>
          {
            <CardProducts
              post={dataSearch.slice(firstPostIndex, lastPostIndex)}
              update={updateProduct}
              setidUpdate={handleClickUpdate}
              deleteData={deleteData}
            />
          }
          <div className="mt-5">
            <Pagination
              group={Math.ceil(products.length / postPerPage)}
              currentPage={currentPage}
              setPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
