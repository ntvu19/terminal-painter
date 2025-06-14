# Terminal Painter

**Beautiful terminal output made easy**

Terminal Painter is a modern web application that helps you create colorful terminal output with ANSI escape codes, PowerShell colors, and other terminal formatting options. Built with Vue.js 3, TypeScript, and Tailwind CSS.

![Terminal Painter Screenshot](screenshot.png)

## Features

### 🎨 **Text Styling**
- **Raw Text Input**: Enter your text with multi-line support
- **Color Selection**: Choose from a wide range of text and background colors
- **Text Styles**: Apply bold, italic, and underline formatting
- **Real-time Preview**: See your styled text in a terminal simulator

### 📋 **Output Formats**
- **ANSI Escape Codes**: Universal terminal support
- **PowerShell Colors**: Windows PowerShell compatibility
- **Bash Commands**: Ready-to-use bash/shell commands
- **Python Code**: Python print statements with ANSI codes

### ⚡ **Quick Presets**
- **Success Messages**: Green text for positive feedback
- **Error Messages**: Red text for error states
- **Warning Messages**: Yellow text for warnings

### ✨ **Fun Extras**
- **🌈 Rainbow Mode**: Multi-colored text effects
- **🎨 ASCII Art Generator**: Convert text to ASCII art
- **🎨 Gradient Text**: Beautiful color gradients

### 🛠 **Developer Features**
- **Copy to Clipboard**: One-click command copying
- **Multiple Export Formats**: Support for various shells and languages
- **Real-time Generation**: Commands update as you type

## Quick Start

### Prerequisites
- Node.js 16+ installed on your system
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/terminal-painter.git
   cd terminal-painter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## Usage Examples

### Basic Usage
1. Enter your text in the "Raw Text Input" area
2. Choose your preferred text and background colors
3. Apply text styles (bold, italic, underline) as needed
4. Copy the generated command from the "Generated Command" section

### ANSI Escape Codes
```bash
echo -e "\033[1;32mSuccess: Operation completed!\033[0m"
```

### PowerShell Colors
```powershell
Write-Host "Error: Something went wrong!" -ForegroundColor Red
```

### Python Output
```python
print("\033[1;33mWarning: Please check your input!\033[0m")
```

## Project Structure

```
terminal-painter/
├── public/
│   └── vite.svg
├── src/
│   ├── components/       # Vue components (if expanded)
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts     # Main types and interfaces
│   ├── utils/           # Utility functions
│   │   └── terminalGenerator.ts  # Command generation logic
│   ├── App.vue          # Main application component
│   ├── main.ts          # Application entry point
│   ├── style.css        # Global styles and Tailwind imports
│   └── vite-env.d.ts    # Vite environment types
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── tsconfig.node.json   # Node.js TypeScript configuration
├── vite.config.ts       # Vite build configuration
└── README.md           # Project documentation
```

## Technology Stack

- **Frontend Framework**: Vue.js 3 with Composition API
- **Language**: TypeScript for type safety
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for utility-first styling
- **Package Manager**: npm (yarn also supported)

## Key Features Explained

### ANSI Escape Codes
ANSI escape codes are sequences of characters that control text formatting, colors, and cursor positioning in terminals. Terminal Painter generates these codes automatically based on your styling choices.

### PowerShell Colors
PowerShell uses named colors and specific cmdlets like `Write-Host` for colored output. The application generates appropriate PowerShell commands for your styled text.

### Real-time Preview
The terminal simulator shows exactly how your text will appear in a real terminal, including colors, styling, and formatting.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Adding New Features

1. **Color Schemes**: Add new colors to `src/utils/terminalGenerator.ts`
2. **Output Formats**: Extend the generator functions for new terminal types
3. **Components**: Create reusable components in `src/components/`
4. **Styles**: Add custom styles using Tailwind classes

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with Vue.js 3 and the amazing Vue ecosystem
- Styled with Tailwind CSS
- Inspired by the need for beautiful terminal output
- Thanks to the open-source community for amazing tools and libraries

---

**Terminal Painter** - Making terminal output beautiful, one command at a time! 🚀 