import type { TextStyle, TerminalState } from "@/types";

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
