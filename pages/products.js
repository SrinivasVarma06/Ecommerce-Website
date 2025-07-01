import { useEffect, useState } from "react";
import AdminLayout from "../components/admin/layout"; 
import Link from "next/link";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="m-5">
      <Link
        className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-900"
        href="/products/new"
      >
        Add new product
      </Link>
      <div className="bg-white p-4 rounded-md shadow-md overflow-x-auto mt-4">
        <table className="w-full text-left bg-white rounded-md border border-gray-600">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left p-2 text-black">Product Name</th>
              <th className="text-left p-2 text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b border-gray-600">
                  <td className="p-2 text-black">{product.title}</td>
                  <td className="p-2 text-black">
                    <Link
                      href={`/products/edit/${product._id}`}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="p-2 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
ProductsPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
