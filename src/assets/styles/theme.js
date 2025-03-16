import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "Nunito Sans, sans-serif",
  primaryColor: "custom-red",
  colors: {
    "custom-red": [
      "#ffe5e9",
      "#ffb3bf",
      "#ff8095",
      "#ff4d6b",
      "#ff1a41",
      "#e60026",
      "#b40124",
      "#8a011c",
      "#600113",
      "#30000a",
    ],
  },
  components: {
    Input: {
      styles: {
        input: {
          border: "none",
          borderBottom: "1px solid var(--input-bd)",
          borderRadius: "0",
        },
      },
    },
  },
});
