import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import AdminLayout from "@/components/admin/layout";

export default function NewProduct() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ecommerce_unsigned"); 

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqsmqpoak/image/upload",
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

  const createProduct = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !imageUrl) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const newProduct = {
      title,
      description,
      price: parseFloat(price),
      imageUrl,
    };

    try {
      await axios.post("/api/products", newProduct);
      router.push("/products");
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-black">Add New Product</h1>
      <form onSubmit={createProduct} className="flex flex-col gap-4">
        <label className="font-semibold text-black" htmlFor="title">
          Product Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-600 rounded-md px-3 py-2 placeholder-gray-400 text-black"
          placeholder="Product Title"
        />

        <label className="font-semibold text-black" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          rows={4}
          className="border border-gray-600 rounded-md px-3 py-2 placeholder-gray-400 text-black"
        ></textarea>

        <label className="font-semibold text-black" htmlFor="price">
          Price (₹)
        </label>
        <input
          id="price"
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-600 rounded-md px-3 py-2 placeholder-gray-400 text-black"
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

        <button
          type="submit"
          disabled={uploading}
          className={`${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 px-4 rounded-md w-fit`}
        >
          Save
        </button>
      </form>
    </div>
  );
}

NewProduct.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
