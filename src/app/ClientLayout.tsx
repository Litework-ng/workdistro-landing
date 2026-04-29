"use client";

import { useState } from "react";
import Footer from "@/app/components/Footer";
import RequirementsModal from "@/app/components/RequirementsModal";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [requirementsModalOpen, setRequirementsModalOpen] = useState(false);

  return (
    <>
      {children}
      <Footer onOpenRequirements={() => setRequirementsModalOpen(true)} />
      <RequirementsModal
        open={requirementsModalOpen}
        onClose={() => setRequirementsModalOpen(false)}
      />
    </>
  );
}