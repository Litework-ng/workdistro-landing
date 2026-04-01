"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageModal({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  if (!src) return null;

  return (
    <>
      {/* Thumbnail */}
      <div
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={96}
          height={96}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-3xl w-full p-4">
            <Image
              src={src}
              alt={alt}
              width={800}
              height={800}
              className="w-full h-auto rounded-xl object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </>
  );
}