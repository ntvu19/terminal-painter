export interface TextStyle {
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

export interface ColorPalette {
  red: string;
  green: string;
  blue: string;
  yellow: string;
  purple: string;
  pink: string;
  cyan: string;
}

export interface BackgroundColorPalette {
  black: string;
  darkGray: string;
  gray: string;
  blue: string;
  green: string;
  red: string;
  transparent: string;
}

export interface OutputFormat {
  id: string;
  name: string;
  description: string;
}

export interface PresetMessage {
  id: string;
  name: string;
  text: string;
  textColor: string;
  backgroundColor: string;
  styles: TextStyle;
  type: "success" | "error" | "warning";
}

export interface TerminalState {
  rawText: string;
  outputFormat: string;
  textColor: string;
  backgroundColor: string;
  styles: TextStyle;
  selectedPreset: string | null;
}
