"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { createSupabaseBrowserClient } from "../../lib/supabase/client";

type ProfilePhotoUploaderProps = {
  userId: string;
};

const maxFileSize = 512 * 1024 * 1024;

export default function ProfilePhotoUploader({ userId }: ProfilePhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setMessage("");

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Please choose an image file.");
      return;
    }

    if (file.size > maxFileSize) {
      setMessage("Please choose an image under 512 MB.");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Supabase is not configured yet.");
      return;
    }

    setIsUploading(true);
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `${userId}/avatar.${extension}`;

    // The file goes into Supabase Storage. The SQL storage policy only allows
    // a member to write inside their own user-id folder.
    const { error: uploadError } = await supabase.storage
      .from("profile-photos")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      setMessage(uploadError.message);
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage.from("profile-photos").getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: data.publicUrl })
      .eq("id", userId);

    if (updateError) {
      setMessage(updateError.message);
      setIsUploading(false);
      return;
    }

    setMessage("Profile photo updated.");
    setIsUploading(false);
    router.refresh();
  }

  return (
    <div className="mt-5">
      <input
        ref={inputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        type="file"
      />
      <button
        className="font-['PolySans'] w-full border border-white/15 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:border-yellow-400 hover:text-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
        type="button"
      >
        {isUploading ? "Uploading..." : "Add profile photo"}
      </button>
      <p className="mt-3 text-xs leading-5 text-zinc-500">
        JPG, PNG, or WebP. High-resolution images up to 512 MB are supported.
      </p>
      {message ? <p className="mt-2 text-xs leading-5 text-zinc-400">{message}</p> : null}
    </div>
  );
}
