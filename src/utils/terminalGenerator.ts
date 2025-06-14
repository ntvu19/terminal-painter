import type { TextStyle, TerminalState } from "@/types";
// @ts-ignore - figlet types provided via @types/figlet during runtime
import figlet from "figlet";
import standardFont from "figlet/importable-fonts/Standard.js";

// Preload the standard font for browser usage
figlet.parseFont("Standard", standardFont);

// ANSI color codes
const ANSI_COLORS = {
  red: "31",
  green: "32",
  yellow: "33",
  blue: "34",
  purple: "35",
  cyan: "36",
  pink: "95",
  white: "37",
  black: "30",
};

const ANSI_BG_COLORS = {
  black: "40",
  red: "41",
  green: "42",
  yellow: "43",
  blue: "44",
  purple: "45",
  cyan: "46",
  darkGray: "100",
  gray: "47",
  transparent: "",
};

// PowerShell colors
const POWERSHELL_COLORS = {
  red: "Red",
  green: "Green",
  yellow: "Yellow",
  blue: "Blue",
  purple: "Magenta",
  cyan: "Cyan",
  pink: "Magenta",
  white: "White",
  black: "Black",
};

const POWERSHELL_BG_COLORS = {
  black: "Black",
  red: "Red",
  green: "Green",
  yellow: "Yellow",
  blue: "Blue",
  purple: "Magenta",
  cyan: "Cyan",
  darkGray: "DarkGray",
  gray: "Gray",
  transparent: "",
};

export function generateAnsiEscapeSequence(state: TerminalState): string {
  const { textColor, backgroundColor, styles, rawText } = state;

  if (!rawText.trim()) return "";

  let ansiCode = "\x1b[";
  const codes: string[] = [];

  // Add style codes
  if (styles.bold) codes.push("1");
  if (styles.italic) codes.push("3");
  if (styles.underline) codes.push("4");

  // Add text color
  if (textColor && ANSI_COLORS[textColor as keyof typeof ANSI_COLORS]) {
    codes.push(ANSI_COLORS[textColor as keyof typeof ANSI_COLORS]);
  }

  // Add background color
  if (
    backgroundColor &&
    backgroundColor !== "transparent" &&
    ANSI_BG_COLORS[backgroundColor as keyof typeof ANSI_BG_COLORS]
  ) {
    codes.push(ANSI_BG_COLORS[backgroundColor as keyof typeof ANSI_BG_COLORS]);
  }

  ansiCode += codes.join(";") + "m";

  // Reset code
  const resetCode = "\x1b[0m";

  return `${ansiCode}${rawText}${resetCode}`;
}

export function generateEchoCommand(state: TerminalState): string {
  const ansiText = generateAnsiEscapeSequence(state);
  return `echo -e "${ansiText.replace(/\x1b/g, "\\033")}"`;
}

export function generatePowerShellCommand(state: TerminalState): string {
  const { textColor, backgroundColor, rawText } = state;

  if (!rawText.trim()) return "";

  let command = "Write-Host";

  // Add text
  command += ` "${rawText}"`;

  // Add foreground color
  if (
    textColor &&
    POWERSHELL_COLORS[textColor as keyof typeof POWERSHELL_COLORS]
  ) {
    command += ` -ForegroundColor ${
      POWERSHELL_COLORS[textColor as keyof typeof POWERSHELL_COLORS]
    }`;
  }

  // Add background color
  if (
    backgroundColor &&
    backgroundColor !== "transparent" &&
    POWERSHELL_BG_COLORS[backgroundColor as keyof typeof POWERSHELL_BG_COLORS]
  ) {
    command += ` -BackgroundColor ${
      POWERSHELL_BG_COLORS[backgroundColor as keyof typeof POWERSHELL_BG_COLORS]
    }`;
  }

  return command;
}

export function generatePythonCommand(state: TerminalState): string {
  const ansiText = generateAnsiEscapeSequence(state);
  return `print("${ansiText.replace(/\x1b/g, "\\033")}")`;
}

export function generateBashCommand(state: TerminalState): string {
  return generateEchoCommand(state);
}

export function generateStyledText(state: TerminalState): string {
  const { textColor, backgroundColor, styles, rawText } = state;

  if (!rawText.trim()) return "";

  // Generate inline styles for preview
  const styleProps: string[] = [];

  if (textColor) {
    const colorMap: Record<string, string> = {
      red: "#ef4444",
      green: "#22c55e",
      blue: "#3b82f6",
      yellow: "#eab308",
      purple: "#a855f7",
      pink: "#ec4899",
      cyan: "#06b6d4",
      white: "#ffffff",
      black: "#000000",
    };
    styleProps.push(`color: ${colorMap[textColor] || textColor}`);
  }

  if (backgroundColor && backgroundColor !== "transparent") {
    const bgColorMap: Record<string, string> = {
      black: "#000000",
      red: "#ef4444",
      green: "#22c55e",
      yellow: "#eab308",
      blue: "#3b82f6",
      purple: "#a855f7",
      cyan: "#06b6d4",
      darkGray: "#374151",
      gray: "#6b7280",
    };
    styleProps.push(
      `background-color: ${bgColorMap[backgroundColor] || backgroundColor}`
    );
  }

  if (styles.bold) styleProps.push("font-weight: bold");
  if (styles.italic) styleProps.push("font-style: italic");
  if (styles.underline) styleProps.push("text-decoration: underline");

  return `<span style="${styleProps.join("; ")}">${rawText}</span>`;
}

export function generateRainbowText(text: string): string {
  const colors = [
    "#ff0000",
    "#ff7f00",
    "#ffff00",
    "#00ff00",
    "#0000ff",
    "#4b0082",
    "#9400d3",
  ];
  return text
    .split("")
    .map((char, index) => {
      const color = colors[index % colors.length];
      return `<span style="color: ${color}">${char}</span>`;
    })
    .join("");
}

export function generateGradientText(
  text: string,
  startColor: string = "#ff0000",
  endColor: string = "#0000ff"
): string {
  const length = text.length;
  const result: string[] = [];

  for (let i = 0; i < length; i++) {
    const ratio = i / (length - 1);
    const color = interpolateColor(startColor, endColor, ratio);
    result.push(`<span style="color: ${color}">${text[i]}</span>`);
  }

  return result.join("");
}

function interpolateColor(
  color1: string,
  color2: string,
  ratio: number
): string {
  const hex1 = color1.replace("#", "");
  const hex2 = color2.replace("#", "");

  const r1 = parseInt(hex1.substr(0, 2), 16);
  const g1 = parseInt(hex1.substr(2, 2), 16);
  const b1 = parseInt(hex1.substr(4, 2), 16);

  const r2 = parseInt(hex2.substr(0, 2), 16);
  const g2 = parseInt(hex2.substr(2, 2), 16);
  const b2 = parseInt(hex2.substr(4, 2), 16);

  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);

  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function generateRainbowAnsiSequence(text: string): string {
  if (!text.trim()) return "";
  const colorCodes = ["31", "33", "32", "36", "34", "35"]; // Red, Yellow, Green, Cyan, Blue, Magenta
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const code = colorCodes[i % colorCodes.length];
    result += `\x1b[${code}m${text[i]}`;
  }
  result += "\x1b[0m"; // Reset at the end
  return result;
}

export function generateRainbowBashCommand(text: string): string {
  const ansiText = generateRainbowAnsiSequence(text);
  return `echo -e "${ansiText.replace(/\x1b/g, "\\033")}"`;
}

export function generateRainbowPythonCommand(text: string): string {
  const ansiText = generateRainbowAnsiSequence(text);
  return `print("${ansiText.replace(/\\x1b/g, "\\\\033")}")`;
}

// Gradient command helpers
export function generateGradientAnsiSequence(
  text: string,
  startColor: string = "#ff0000",
  endColor: string = "#0000ff"
): string {
  if (!text.trim()) return "";

  const hexToRgb = (hex: string) => {
    const clean = hex.replace("#", "");
    return {
      r: parseInt(clean.substring(0, 2), 16),
      g: parseInt(clean.substring(2, 4), 16),
      b: parseInt(clean.substring(4, 6), 16),
    };
  };

  const start = hexToRgb(startColor);
  const end = hexToRgb(endColor);

  let result = "";
  const len = text.length;

  for (let i = 0; i < len; i++) {
    const ratio = len === 1 ? 0 : i / (len - 1);
    const r = Math.round(start.r + (end.r - start.r) * ratio);
    const g = Math.round(start.g + (end.g - start.g) * ratio);
    const b = Math.round(start.b + (end.b - start.b) * ratio);
    result += `\x1b[38;2;${r};${g};${b}m${text[i]}`;
  }

  result += "\x1b[0m"; // reset
  return result;
}

export function generateGradientBashCommand(
  text: string,
  startColor?: string,
  endColor?: string
): string {
  const ansiText = generateGradientAnsiSequence(text, startColor, endColor);
  return `echo -e "${ansiText.replace(/\x1b/g, "\\033")}"`;
}

export function generateGradientPythonCommand(
  text: string,
  startColor?: string,
  endColor?: string
): string {
  const ansiText = generateGradientAnsiSequence(text, startColor, endColor);
  return `print(\"${ansiText.replace(/\x1b/g, "\\033")}\")`;
}

// -----------------------------
// ASCII Art Generator Helpers
// -----------------------------

export function generateAsciiArt(
  text: string,
  font: string = "Standard"
): string {
  if (!text.trim()) return "";
  // Ensure the font is parsed (already parsed at top for Standard)
  try {
    return figlet.textSync(text, { font });
  } catch (e) {
    console.error("Figlet generation failed", e);
    return text;
  }
}

function escapeForDoubleQuotes(str: string): string {
  return str
    .replace(/\\/g, "\\\\") // escape backslashes first
    .replace(/\n/g, "\\n")
    .replace(/"/g, '\\"');
}

export function generateAsciiBashCommand(
  state: TerminalState,
  font: string = "Standard"
): string {
  const ascii = generateAsciiArt(state.rawText, font);
  const escaped = escapeForDoubleQuotes(ascii);
  return `echo -e "${escaped}"`;
}

export function generateAsciiPythonCommand(
  state: TerminalState,
  font: string = "Standard"
): string {
  const ascii = generateAsciiArt(state.rawText, font);
  const escaped = ascii.replace(/\\/g, "\\\\").replace(/\n/g, "\\n");
  return `print(\"${escaped}\")`;
}

export function generateAsciiPowerShellCommand(
  state: TerminalState,
  font: string = "Standard"
): string {
  const ascii = generateAsciiArt(state.rawText, font);
  // Use here-string for multi-line string in PowerShell
  return `@"
${ascii}
"@`;
}
