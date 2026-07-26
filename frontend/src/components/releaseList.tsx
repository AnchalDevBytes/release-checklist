"use client";

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
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this release?"
    );

    if (!confirmDelete) return;

    try {
      await releaseService.delete(id);
      await refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete release.");
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

        <h2 className="text-xl text-slate-900 font-semibold">
          Releases
        </h2>

        <button
          onClick={onCreate}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + New Release
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100 border-b border-slate-600">

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
                <td
                  colSpan={4}
                  className="py-8 text-center text-slate-500"
                >
                  No releases found.
                </td>
              </tr>
            ) : (
              releases.map((release) => (
                <tr
                  key={release.id}
                  className="border-b last:border-none text-slate-500 hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-medium">
                    {release.name}
                  </td>

                  <td className="px-5 py-4">
                    {new Date(release.date).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusColor(
                        release.status
                      )}`}
                    >
                      {release.status}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() => onView(release)}
                        className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleDelete(release.id)}
                        className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
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

    </div>
  );
}