export const formatDateTime = (iso: string) => {
  const date = new Date(iso);

  const day = date.toLocaleDateString("ru-RU", { day: "numeric" });
  const month = date.toLocaleDateString("ru-RU", { month: "short" });
  const time = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day} ${month.replace(".", "")}, ${time}`;
};

export const formatTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "—";

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const formatDate = (iso: string) => {
  const date = new Date(iso);

  const day = date.toLocaleDateString("ru-RU", { day: "numeric" });
  const month = date.toLocaleDateString("ru-RU", { month: "short" });
  // const month = date.toLocaleDateString("ru-RU", { month: "short" });
  // const time = date.toLocaleTimeString("ru-RU", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  return `${day} ${month.replace(".", "")}`;
};
