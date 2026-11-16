'use client';
import { useEffect, useRef } from 'react';
export default function ConfirmDialog({ title, children, confirmLabel, busy, onConfirm, onClose }: {
  title: string; children: React.ReactNode; confirmLabel: string; busy: boolean; onConfirm: () => void; onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const dialog = ref.current!; dialog.showModal(); const overflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = overflow; }; }, []);
  return <dialog ref={ref} className="ga-dialog" aria-labelledby="ga-confirm-title" onCancel={(event) => { if (busy) event.preventDefault(); else onClose(); }}>
    <h2 id="ga-confirm-title">{title}</h2>{children}<div className="ga-dialog-actions"><button className="ga-button" autoFocus onClick={onClose} disabled={busy}>Cancel</button><button className="ga-button ga-primary" onClick={onConfirm} disabled={busy}>{busy ? 'Working…' : confirmLabel}</button></div>
  </dialog>;
}
