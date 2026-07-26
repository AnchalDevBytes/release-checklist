"use client";

import { useState } from "react";
import { Release } from "@/types/release";
import { releaseService } from "@/services/release.service";

interface ReleaseListProps {
  releases: Release[];
  onView: (release: Release) => void;
  onCreate: () => void;
  refresh: () => Promise<void>;
}

export default function ReleaseList({
  releases,
  onView,
  onCreate,
  refresh,
}: ReleaseListProps) {
  const [deleteTarget, setDeleteTarget] = useState<Release | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      await releaseService.delete(deleteTarget.id);
      await refresh();
      setDeleteTarget(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete release.");
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned":
        return "bg-gray-100 text-gray-700";

      case "ongoing":
        return "bg-yellow-100 text-yellow-700";

      case "done":
        return "bg-green-100 text-green-700";

      default:
        return "";
    }
  };

  return (
    <div className="rounded-xl bg-white shadow">
      <div className="flex items-center justify-between border-b p-5">
        <h2 className="text-xl text-slate-900 font-semibold">Releases</h2>

        <button
          onClick={onCreate}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          + New Release
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="px-5 py-3 text-left text-sm text-slate-700 font-semibold">
                Release
              </th>
              <th className="px-5 py-3 text-left text-sm text-slate-700 font-semibold">
                Date
              </th>
              <th className="px-5 py-3 text-left text-sm text-slate-700 font-semibold">
                Status
              </th>
              <th className="px-5 py-3 text-right text-sm text-slate-700 font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {releases.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-500">
                  No releases found.
                </td>
              </tr>
            ) : (
              releases.map((release) => (
                <tr
                  key={release.id}
                  className="border-b last:border-none text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-slate-900">
                    {release.name}
                  </td>
                  <td className="px-5 py-4">
                    {new Date(release.date).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusColor(
                        release.status,
                      )}`}
                    >
                      {release.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onView(release)}
                        className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 transition-colors"
                      >
                        View
                      </button>

                      <button
                        onClick={() => setDeleteTarget(release)}
                        className="rounded bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modern Custom Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <h3 className="text-xl font-bold text-slate-900">
                Delete Release
              </h3>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-900">
                "{deleteTarget.name}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
