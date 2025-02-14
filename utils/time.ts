export const getTimeAgo = (startDate: string): string => {
  const now = new Date();
  const diffMs = Math.abs(now.getTime() - new Date(startDate).getTime());

  const diffSeconds = diffMs / 1000;
  if (diffSeconds < 60) return `${Math.floor(diffSeconds)}s ago`;

  const diffMinutes = diffSeconds / 60;
  if (diffMinutes < 60) return `${Math.floor(diffMinutes)}m ago`;

  const diffHours = diffMinutes / 60;
  if (diffHours < 24) return `${Math.floor(diffHours)}h ago`;

  const diffDays = diffHours / 24;
  if (diffDays < 30) return `${Math.floor(diffDays)}d ago`;

  const diffMonths = diffDays / 30;
  return `${Math.floor(diffMonths)}mo ago`;
};
