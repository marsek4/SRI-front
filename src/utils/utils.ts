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
