"use client";

import { useEffect, useState } from "react";
import { Release } from "@/types/release";
import { releaseService } from "@/services/release.service";
import ReleaseDetails from "@/components/releaseDetails";
import ReleaseModal from "@/components/releaseModal";
import ReleaseList from "@/components/releaseList";

export default function Home() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [showModal, setShowModal] = useState(false);

  async function loadReleases() {
    const data = await releaseService.getAll();

    setReleases(data);

    setSelectedRelease((prev) => {
      if (!prev) return null;

      return data.find((r) => r.id === prev.id) ?? null;
    });
  }

  useEffect(() => {
    loadReleases();
  }, []);

  return (
    <main className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-center text-5xl font-bold">ReleaseCheck</h1>

        <p className="mt-3 mb-10 text-center text-slate-400">
          Your all-in-one release checklist tool
        </p>

        {selectedRelease ? (
          <ReleaseDetails
            release={selectedRelease}
            goBack={() => setSelectedRelease(null)}
            refresh={loadReleases}
          />
        ) : (
          <ReleaseList
            releases={releases}
            onView={setSelectedRelease}
            onCreate={() => setShowModal(true)}
            refresh={loadReleases}
          />
        )}

        {showModal && (
          <ReleaseModal
            close={() => setShowModal(false)}
            refresh={loadReleases}
          />
        )}
      </div>
    </main>
  );
}
