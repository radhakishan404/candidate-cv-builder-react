const NODE_ENV = "development";

export const baseUrl =
  NODE_ENV === "development"
    ? "http://localhost:4000"
    : "http://localhost:4000";
