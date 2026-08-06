export function getReadAnnouncementIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("presensi_read_announcement_ids");
    if (!raw) {
      const legacyId = window.localStorage.getItem("presensi_read_announcement_id");
      return legacyId ? [legacyId] : [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getReadNotificationIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("presensi_read_notification_ids");
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function markNotificationAsRead(id: string): void {
  if (typeof window === "undefined" || !id) return;
  try {
    const current = getReadNotificationIds();
    if (!current.includes(id)) {
      current.push(id);
      window.localStorage.setItem(
        "presensi_read_notification_ids",
        JSON.stringify(current),
      );
    }
    window.dispatchEvent(new Event("notification-count-changed"));
  } catch {
    // ignore
  }
}

export function markAnnouncementAsRead(id: string): void {
  if (typeof window === "undefined" || !id) return;
  try {
    const current = getReadAnnouncementIds();
    if (!current.includes(id)) {
      current.push(id);
      window.localStorage.setItem(
        "presensi_read_announcement_ids",
        JSON.stringify(current),
      );
    }
    markNotificationAsRead(id);
    window.localStorage.setItem("presensi_read_announcement_id", id);
    window.dispatchEvent(new Event("notification-count-changed"));
  } catch {
    // ignore
  }
}

export function isAnnouncementToday(dateStr?: string | Date | null): boolean {
  if (!dateStr) return false;
  const date = dateStr instanceof Date ? dateStr : new Date(dateStr);
  if (Number.isNaN(date.getTime())) return false;

  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}
