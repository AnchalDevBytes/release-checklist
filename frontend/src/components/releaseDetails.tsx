"use client";

import { useState } from "react";
import { Release } from "@/types/release";
import { releaseService } from "@/services/release.service";

interface ReleaseDetailsProps {
  release: Release;
  goBack: () => void;
  refresh: () => Promise<void>;
}

export default function ReleaseDetails({
  release,
  goBack,
  refresh,
}: ReleaseDetailsProps) {
  const [additionalInfo, setAdditionalInfo] = useState(
    release.additionalInfo ?? "",
  );

  const [steps, setSteps] = useState(release.steps);

  const [loading, setLoading] = useState(false);

  const handleToggle = async (stepId: number, completed: boolean) => {
    try {
      setSteps((prev) =>
        prev.map((step) =>
          step.id === stepId ? { ...step, completed } : step,
        ),
      );

      await releaseService.toggleStep(stepId, {
        completed,
      });

      await refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update step.");
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await releaseService.update(release.id, {
        additionalInfo,
      });

      await refresh();
      goBack();
    } catch (error) {
      console.error(error);
      alert("Failed to update release.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    switch (release.status) {
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
      <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <button
            onClick={goBack}
            className="mb-2 text-sm text-blue-600 hover:underline"
          >
            ← Back to Releases
          </button>

          <h2 className="text-2xl text-slate-900 font-bold">{release.name}</h2>

          <p className="mt-2 text-sm text-slate-500">
            {new Date(release.date).toLocaleString()}
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-4 py-2 text-sm font-semibold capitalize ${getStatusColor()}`}
        >
          {release.status}
        </span>
      </div>

      <div className="grid gap-8 p-6 lg:grid-cols-2">
        {/* Left Side */}

        <div>
          <h3 className="mb-5 text-lg text-slate-800 font-semibold">
            Checklist
          </h3>

          <div className="space-y-4">
            {steps.map((step) => (
              <label
                key={step.id}
                className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={(e) => handleToggle(step.id, e.target.checked)}
                  className="h-5 w-5 accent-blue-600"
                />

                <span
                  className={
                    step.completed
                      ? "line-through text-slate-400"
                      : "text-slate-800"
                  }
                >
                  {step.title}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Right Side */}

        <div>
          <h3 className="mb-5 text-lg text-slate-800 font-semibold">
            Additional Information
          </h3>

          <textarea
            rows={12}
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="w-full rounded-md border p-4 outline-none text-slate-500 focus:border-blue-500"
            placeholder="Enter release notes..."
          />

          <div className="mt-6 flex justify-end">
            <button
              disabled={loading}
              onClick={handleSave}
              className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
