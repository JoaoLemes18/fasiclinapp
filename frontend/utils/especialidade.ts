
export const getCodeSpecByIdEspec = (id: number | null | undefined): string => {
  const map: Record<number, string> = {
    1: "90",
    2: "80",
    3: "70",
    4: "50",
    5: "40",
    6: "30",
    7: "20",
    8: "10",
    9: "00",
  };
  return id && map[id] ? map[id] : "N/A";
};
