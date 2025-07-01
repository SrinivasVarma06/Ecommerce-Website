import AdminLayout from "@/components/admin/layout"; // ✅ renamed for clarity
import axios from "axios";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await axios.get("/api/settings");
        if (res.data?.storeName) {
          setStoreName(res.data.storeName);
        }
      } catch (err) {
        console.error("Error loading settings", err);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/settings", { storeName });
      setMessage("Settings Saved Successfully.");
    } catch (err) {
      console.error("Error saving settings", err);
      setMessage("Failed to save settings.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-black">Store Settings</h1>
      <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-md">
        <label className="font-semibold text-black">Store Name</label>
        <input
          type="text"
          placeholder="Enter store name"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          className="border border-gray-600 px-4 py-2 rounded-md text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-fit"
        >
          Save
        </button>
        {message && <p className="text-sm text-green-600">{message}</p>}
      </form>
    </div>
  );
}

SettingsPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
