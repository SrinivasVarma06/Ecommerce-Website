import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import AdminLayout from "@/components/admin/layout";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products?id=${id}`);
        const { title, description, price, imageUrl } = res.data;
        setTitle(title);
        setDescription(description);
        setPrice(price);
        setImageUrl(imageUrl);
      } catch (err) {
        console.error("Error fetching product", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ecommerce_unsigned"); // Replace with your actual Cloudinary preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqsmqpoak/image/upload", // Replace with your Cloudinary cloud name
        formData
      );
      setImageUrl(response.data.secure_url);
    } catch (err) {
      alert("Image upload failed. Please try again.");
      console.error("Cloudinary upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !imageUrl) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    try {
      await axios.put("/api/products", {
        _id: id,
        title,
        description,
        price: Number(price),
        imageUrl,
      });
      router.push("/products");
    } catch (err) {
      console.error("Error updating product", err);
    }
  };

  const deleteProduct = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/api/products?id=${id}`);
        router.push("/products");
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-black">Edit Product</h1>
      <form onSubmit={updateProduct} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-600 rounded-md px-3 py-2 text-black"
        />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-600 rounded-md px-3 py-2 text-black"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-600 rounded-md px-3 py-2 text-black"
        />

        <label className="font-semibold text-black">Product Image</label>
        <div>
          <button
            type="button"
            onClick={() => document.getElementById("fileInput").click()}
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {uploading && (
          <p className="text-gray-500 mt-2">Uploading image...</p>
        )}

        {imageUrl && !uploading && (
          <img
            src={imageUrl}
            alt="Preview"
            className="mt-4 w-32 h-32 object-cover rounded border"
          />
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={uploading}
            className={`${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-4 py-2 rounded-md w-fit`}
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => deleteProduct(id)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

EditProduct.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
