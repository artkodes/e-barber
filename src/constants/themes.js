const colors = {
  accent: "#FF4957",
  primary: "#27A9FF",
  secondary: "#4DA1FF",
  tertiary: "#FFE358",
  blue: "#2E5BFF",
  lightblue: "rgba(46,92,255,0.2)",
  green: "#33AC2E",
  red: "#D63649",
  yellow: "#F7C137",
  teal: "#00C1D4",
  purple: "#8C54FF",
  black: "#2E384D",
  black2: "#69707F",
  black3: "#8798AD",
  black4: "#000000",
  white: "#FFFFFF",
  gray: "#BFC5D2",
  gray2: "#F4F6FC",
  gray3: "#EEF3F5",
  gray4: "#F7F8FA",
  caption: "#B0BAC9",
  input: "rgba(224, 231, 255, 0.20)", // '#E0E7FF' 20%
  border: "#D6DDF6",
  card: "rgba(46,91,255,0.08)",
  shadow: "rgba(46,91,255,0.07)",
  overlay: "#C1BEC0",

  lightBlack: "#484848",
  green01: "#008388",
  green02: "#02656b",
  darkOrange: "#d93900",
  lightGray: "#d8d8d8",
  pink: "#fc4c54",
  gray01: "#f3f3f3",
  gray02: "#919191",
  gray03: "#b3b3b3",
  gray04: "#484848",
  gray05: "#dadada",
  gray06: "#ebebeb",
  gray07: "#f2f2f2",
  brown01: "#ad8763",
  brown02: "#7d4918"
};

const sizes = {
  // global sizes
  base: 15,
  border: 5,
  padding: 15,

  // font sizes

  title: 18,
  header: 24,
  body: 12,
  caption: 12,
  small: 8,

  font: 15,
  h1: 48,
  h2: 34,
  h3: 28,
  h4: 20,
  paragraph: 20,
  caption: 13,
  captionMedium: 12
};

const fonts = {
  h1: {
    fontFamily: "Rubik-Light",
    fontSize: sizes.h1,
    color: colors.black,
    letterSpacing: -0.6,
    lineHeight: 57
  },
  h2: {
    fontFamily: "Rubik-Light",
    fontSize: sizes.h2,
    color: colors.black,
    letterSpacing: 0,
    lineHeight: 32
  },
  h3: {
    fontFamily: "Rubik-Light",
    fontSize: sizes.h3,
    color: colors.black,
    letterSpacing: 0,
    lineHeight: 32
  },
  h4: {
    fontFamily: "Rubik-Medium",
    fontSize: sizes.h4,
    color: colors.black,
    letterSpacing: 0,
    lineHeight: 18
  },
  paragraph: {
    fontFamily: "Rubik-Regular",
    fontSize: sizes.paragraph,
    color: colors.black,
    letterSpacing: 0,
    lineHeight: 22
  },
  paragraphGray: {
    fontFamily: "Rubik-Regular",
    fontSize: sizes.paragraph,
    color: colors.gray,
    letterSpacing: 0,
    lineHeight: 22
  },
  paragraphGray2: {
    fontFamily: "Rubik-Regular",
    fontSize: sizes.paragraph,
    color: colors.gray2,
    letterSpacing: 0,
    lineHeight: 22
  },
  caption: {
    fontFamily: "Rubik-Regular",
    fontSize: sizes.caption,
    color: colors.black3,
    letterSpacing: 1.12,
    lineHeight: 15
  },
  captionMedium: {
    fontFamily: "Rubik-Medium",
    fontSize: sizes.captionMedium,
    color: colors.black3,
    letterSpacing: 1.12,
    lineHeight: 14
  },
  button: {
    fontFamily: "Rubik-Medium",
    fontSize: sizes.font,
    color: colors.white,
    letterSpacing: 0,
    lineHeight: 21
  },
  header: {
    fontFamily: "Rubik-Bold",
    fontSize: sizes.header
  },
  title: {
    fontFamily: "Rubik-Regular",
    fontSize: sizes.title
  },
  body: {
    fontSize: sizes.body
  },
  small: {
    fontSize: sizes.small
  }
};

export { colors, sizes, fonts };
