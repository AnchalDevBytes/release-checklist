"use client";

import { useState } from "react";
import { releaseService } from "@/services/release.service";

interface ReleaseModalProps {
  close: () => void;
  refresh: () => Promise<void>;
}

export default function ReleaseModal({
  close,
  refresh,
}: ReleaseModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.name || !formData.date) {
      alert("Release name and date are required.");
      return;
    }

    try {
      setLoading(true);

      await releaseService.create({
        name: formData.name,
        date: new Date(formData.date).toISOString(),
        additionalInfo: formData.additionalInfo,
      });

      await refresh();

      close();
    } catch (error) {
      console.error(error);
      alert("Failed to create release.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

        <div className="border-b p-6">

          <h2 className="text-2xl text-slate-900 font-bold">
            New Release
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Create a new release checklist.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div>

            <label className="mb-2 block text-slate-800 text-sm font-medium">
              Release Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Release v1.0.0"
              className="w-full rounded-md border text-slate-700 p-3 outline-none focus:border-blue-600"
            />

          </div>

          <div>

            <label className="mb-2 block text-slate-800 text-sm font-medium">
              Release Date
            </label>

            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-md border p-3 text-slate-700 outline-none focus:border-blue-600"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm text-slate-800 font-medium">
              Additional Information
            </label>

            <textarea
              rows={5}
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Release notes..."
              className="w-full rounded-md border text-slate-700 p-3 outline-none focus:border-blue-600"
            />

          </div>

          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={close}
              className="rounded-md border px-5 py-2 text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Release"}
            </button>

          </div>
        </form>

      </div>
    </div>
  );
}
