export const parseApiResponse = (res) => {
  try {
    let raw = res.data;

    if (typeof raw === "string") {
      raw = raw.replace(/^at/, "");
      return JSON.parse(raw);
    }

    return raw; // already JSON 
  } catch (err) {
    console.error("Parse Error:", err);
    return null;
  }
};
