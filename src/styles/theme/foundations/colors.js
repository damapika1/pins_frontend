const colors = {
  1: {
    50: "#ffffff",
    100: "#ffffff",
    200: "#fdfafc",
    300: "#f6e8ef",
    400: "#efd5e3",
    500: "#e0b1cb",
    600: "#d18db3",
    700: "#ca7aa7",
    800: "#c3689a",
    900: "#b14782",
  },
  2: {
    50: "#ffffff",
    100: "#f0e7f2",
    200: "#e6d7e8",
    300: "#dcc6df",
    400: "#d2b6d6",
    500: "#be95c4",
    600: "#aa74b2",
    700: "#a064a9",
    800: "#93579c",
    900: "#74457b",
  },
  3: {
    50: "#fcfbfd",
    100: "#e2daec",
    200: "#d4c9e3",
    300: "#c7b8da",
    400: "#baa8d1",
    500: "#9f86c0",
    600: "#8464af",
    700: "#7755a4",
    800: "#6b4d93",
    900: "#533b72",
  },
  4: {
    50: "#c1bdd8",
    100: "#a49dc5",
    200: "#958dbb",
    300: "#867db2",
    400: "#776da8",
    500: "#5e548e",
    600: "#49416e",
    700: "#3e385e",
    800: "#342e4e",
    900: "#1e1b2e",
  },
  5: {
    50: "#6b51bd",
    100: "#543c9e",
    200: "#4a358c",
    300: "#402e79",
    400: "#372767",
    500: "#231942",
    600: "#0f0b1d",
    700: "#06040b",
    800: "#000000",
    900: "#000000",
  },
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#FFFFFF",
  whiteAlpha: {
    50: "#ffffff5c",
    100: "#ffffff5c",
    200: "#ffffff5c",
    300: "#ffffff5c",
    400: "#ffffff5c",
    500: "rgba(255, 215, 244, 0.36)",
    600: "#ffa4e65c",
    700: "#ff8bdf5c",
    800: "#ff71d85c",
    900: "#ff3eca5c",
  },
  blackAlpha: {
    50: "#ffffff5c",
    100: "#ffffff5c",
    200: "#ffffff5c",
    300: "#ffffff5c",
    400: "#ffffff5c",
    500: "rgba(255, 215, 244, 0.36)",
    600: "#ffa4e65c",
    700: "#ff8bdf5c",
    800: "#ff71d85c",
    900: "#ff3eca5c",
  },
  gray: {
    50: "#ffffff",
    100: "#f9f7fc",
    200: "#e9e5f5",
    300: "#d9d2ee",
    400: "#c9c0e7",
    500: "#aa9bd9",
    600: "#8b76cb",
    700: "#7b64c4",
    800: "#6b51bd",
    900: "#543c9f",
  },
  red: {
    50: "#ffffff",
    100: "#f0e7f2",
    200: "#e6d7e8",
    300: "#dcc6df",
    400: "#d2b6d6",
    500: "#be95c4",
    600: "#aa74b2",
    700: "#a064a9",
    800: "#93579c",
    900: "#74457b",
  },
  orange: {
    50: "#c1bdd8",
    100: "#a49dc5",
    200: "#958dbb",
    300: "#867db2",
    400: "#776da8",
    500: "#5e548e",
    600: "#49416e",
    700: "#3e385e",
    800: "#342e4e",
    900: "#1e1b2e",
  },
  yellow: {
    50: "#6b51bd",
    100: "#543c9e",
    200: "#4a358c",
    300: "#402e79",
    400: "#372767",
    500: "#231942",
    600: "#0f0b1d",
    700: "#06040b",
    800: "#000000",
    900: "#000000",
  },
  green: {
    50: "#fcfbfd",
    100: "#e2daec",
    200: "#d4c9e3",
    300: "#c7b8da",
    400: "#baa8d1",
    500: "#9f86c0",
    600: "#8464af",
    700: "#7755a4",
    800: "#6b4d93",
    900: "#533b72",
  },
  teal: {
    50: "#ffffff",
    100: "#ffffff",
    200: "#ffffff",
    300: "#ffffff",
    400: "#fdfafc",
    500: "#eed6e6",
    600: "#dfb2d0",
    700: "#d8a0c5",
    800: "#d08eba",
    900: "#c16aa4",
  },
  blue: {
    50: "#ffffff",
    100: "#ffffff",
    200: "#fdfafc",
    300: "#f6e8ef",
    400: "#efd5e3",
    500: "#e0b1cb",
    600: "#d18db3",
    700: "#ca7aa7",
    800: "#c3689a",
    900: "#b14782",
  },
  cyan: {
    50: "#ffffff",
    100: "#f6e8f1",
    200: "#eed6e6",
    300: "#e7c4db",
    400: "#e0b1d0",
    500: "#d18dba",
    600: "#c269a4",
    700: "#bb5699",
    800: "#b1478d",
    900: "#8c3970",
  },
  purple: {
    50: "#FAF5FF",
    100: "#E9D8FD",
    200: "#D6BCFA",
    300: "#B794F4",
    400: "#9F7AEA",
    500: "#805AD5",
    600: "#6B46C1",
    700: "#553C9A",
    800: "#44337A",
    900: "#322659",
  },
  pink: {
    50: "#FFF5F7",
    100: "#FED7E2",
    200: "#FBB6CE",
    300: "#F687B3",
    400: "#ED64A6",
    500: "#D53F8C",
    600: "#B83280",
    700: "#97266D",
    800: "#702459",
    900: "#521B41",
  },
  linkedin: {
    50: "#E8F4F9",
    100: "#CFEDFB",
    200: "#9BDAF3",
    300: "#68C7EC",
    400: "#34B3E4",
    500: "#00A0DC",
    600: "#008CC9",
    700: "#0077B5",
    800: "#005E93",
    900: "#004471",
  },
  facebook: {
    50: "#E8F4F9",
    100: "#D9DEE9",
    200: "#B7C2DA",
    300: "#6482C0",
    400: "#4267B2",
    500: "#385898",
    600: "#314E89",
    700: "#29487D",
    800: "#223B67",
    900: "#1E355B",
  },
  messenger: {
    50: "#D0E6FF",
    100: "#B9DAFF",
    200: "#A2CDFF",
    300: "#7AB8FF",
    400: "#2E90FF",
    500: "#0078FF",
    600: "#0063D1",
    700: "#0052AC",
    800: "#003C7E",
    900: "#002C5C",
  },
  whatsapp: {
    50: "#dffeec",
    100: "#b9f5d0",
    200: "#90edb3",
    300: "#65e495",
    400: "#3cdd78",
    500: "#22c35e",
    600: "#179848",
    700: "#0c6c33",
    800: "#01421c",
    900: "#001803",
  },
  twitter: {
    50: "#E5F4FD",
    100: "#C8E9FB",
    200: "#A8DCFA",
    300: "#83CDF7",
    400: "#57BBF5",
    500: "#1DA1F2",
    600: "#1A94DA",
    700: "#1681BF",
    800: "#136B9E",
    900: "#0D4D71",
  },
  telegram: {
    50: "#E3F2F9",
    100: "#C5E4F3",
    200: "#A2D4EC",
    300: "#7AC1E4",
    400: "#47A9DA",
    500: "#0088CC",
    600: "#007AB8",
    700: "#006BA1",
    800: "#005885",
    900: "#003F5E",
  },
  discord: "#e0b1cb",
};

export default colors;
