<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">>_</span>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Terminal Painter</h1>
              <p class="text-sm text-gray-600">Beautiful terminal output made easy</p>
            </div>
          </div>
          <div class="flex space-x-2">
            <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Export
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Share
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left Panel -->
        <div class="space-y-6">
          <!-- Raw Text Input -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">Raw Text Input</label>
            <textarea v-model="terminalState.rawText"
              class="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your text here...&#10;Supports multiple lines!"></textarea>
          </div>

          <!-- Output Format -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">Output Format</label>
            <div class="space-y-3">
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="radio" v-model="terminalState.outputFormat" value="ansi"
                  class="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                <div class="w-3 h-3 bg-blue-600 rounded-full"></div>
                <div>
                  <div class="font-medium">ANSI Escape Codes</div>
                  <div class="text-sm text-gray-600">Universal terminal support</div>
                </div>
              </label>
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="radio" v-model="terminalState.outputFormat" value="powershell"
                  class="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                <div class="w-3 h-3 bg-blue-600 rounded-full border-2 border-white"></div>
                <div>
                  <div class="font-medium">PowerShell Colors</div>
                  <div class="text-sm text-gray-600">Windows PowerShell</div>
                </div>
              </label>
            </div>
          </div>

          <!-- Text Color -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">Text Color</label>
            <div class="grid grid-cols-7 gap-2">
              <button v-for="(color, colorName) in textColors" :key="colorName"
                @click="terminalState.textColor = colorName" :class="[
                  'w-8 h-8 rounded-full border-2 transition-all',
                  terminalState.textColor === colorName
                    ? 'border-gray-800 scale-110'
                    : 'border-gray-300 hover:border-gray-400'
                ]" :style="{ backgroundColor: color }"></button>
            </div>
          </div>

          <!-- Background Color -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">Background Color</label>
            <div class="grid grid-cols-7 gap-2">
              <button v-for="(color, colorName) in backgroundColors" :key="colorName"
                @click="terminalState.backgroundColor = colorName" :class="[
                  'w-8 h-8 rounded-full border-2 transition-all relative',
                  terminalState.backgroundColor === colorName
                    ? 'border-gray-800 scale-110'
                    : 'border-gray-300 hover:border-gray-400'
                ]" :style="{ backgroundColor: color === 'transparent' ? '#ffffff' : color }">
                <!-- Transparent indicator with diagonal lines -->
                <div v-if="color === 'transparent'" class="absolute inset-0 flex items-center justify-center">
                  <div class="w-6 h-6 relative">
                    <!-- Diagonal line from top-left to bottom-right -->
                    <div class="absolute top-0 left-0 w-full h-full">
                      <div class="absolute top-1/2 left-0 w-full h-px bg-red-400 transform -rotate-45 origin-center">
                      </div>
                    </div>
                    <!-- Optional: Add second diagonal line for double cross-out -->
                    <div class="absolute top-0 left-0 w-full h-full">
                      <div class="absolute top-1/2 left-0 w-full h-px bg-red-400 transform rotate-45 origin-center">
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- Text Styles -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">Text Styles</label>
            <div class="space-y-3">
              <label class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Bold</span>
                <button @click="terminalState.styles.bold = !terminalState.styles.bold" :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  terminalState.styles.bold ? 'bg-green-600' : 'bg-gray-200'
                ]">
                  <span :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    terminalState.styles.bold ? 'translate-x-6' : 'translate-x-1'
                  ]"></span>
                </button>
              </label>
              <label class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Italic</span>
                <button @click="terminalState.styles.italic = !terminalState.styles.italic" :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  terminalState.styles.italic ? 'bg-green-600' : 'bg-gray-200'
                ]">
                  <span :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    terminalState.styles.italic ? 'translate-x-6' : 'translate-x-1'
                  ]"></span>
                </button>
              </label>
              <label class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Underline</span>
                <button @click="terminalState.styles.underline = !terminalState.styles.underline" :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  terminalState.styles.underline ? 'bg-green-600' : 'bg-gray-200'
                ]">
                  <span :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    terminalState.styles.underline ? 'translate-x-6' : 'translate-x-1'
                  ]"></span>
                </button>
              </label>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">Quick Presets</label>
            <div class="space-y-2">
              <button @click="applyPreset('success')"
                class="w-full flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="text-green-800 font-medium">Success Message</span>
              </button>
              <button @click="applyPreset('error')"
                class="w-full flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                <span class="text-red-800 font-medium">Error Message</span>
              </button>
              <button @click="applyPreset('warning')"
                class="w-full flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors">
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span class="text-yellow-800 font-medium">Warning Message</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Right Panel -->
        <div class="space-y-6">
          <!-- Terminal Preview -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-800 px-4 py-2 flex items-center space-x-2">
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <span class="text-white text-sm ml-4">Terminal Preview</span>
            </div>
            <div class="bg-black text-white p-4 font-mono text-sm min-h-[200px]">
              <div class="text-green-400">$ echo "{{ terminalState.rawText }}"</div>
              <div v-if="terminalState.rawText" v-html="styledPreviewText" class="mt-2"></div>
              <div v-else class="text-gray-500 mt-2">Enter text to see preview...</div>
              <div class="text-green-400 mt-2">$</div>
            </div>
          </div>

          <!-- Generated Command -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-3">
              <label class="block text-sm font-medium text-gray-700">Generated Command</label>
              <button @click="copyToClipboard"
                class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                Copy
              </button>
            </div>
            <div class="bg-gray-100 p-3 rounded-lg font-mono text-sm overflow-x-auto">
              <code>{{ generatedCommand }}</code>
            </div>
          </div>

          <!-- Other Formats -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">Other Formats</label>
            <div class="space-y-2">
              <button @click="currentFormat = 'bash'" :class="[
                'w-full text-left px-3 py-2 rounded-lg transition-colors',
                currentFormat === 'bash' ? 'bg-blue-100 text-blue-800' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              ]">
                Bash
              </button>
              <button @click="currentFormat = 'powershell'" :class="[
                'w-full text-left px-3 py-2 rounded-lg transition-colors',
                currentFormat === 'powershell' ? 'bg-blue-100 text-blue-800' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              ]">
                PowerShell
              </button>
              <button @click="currentFormat = 'python'" :class="[
                'w-full text-left px-3 py-2 rounded-lg transition-colors',
                currentFormat === 'python' ? 'bg-blue-100 text-blue-800' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              ]">
                Python
              </button>
            </div>
          </div>

          <!-- Fun Extras -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">✨ Fun Extras</label>
            <div class="space-y-2">
              <button @click="toggleRainbowMode" :class="[
                'w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between',
                rainbowMode ? 'bg-gradient-to-r from-red-500 to-purple-500 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              ]">
                <span>🌈 Rainbow Mode</span>
                <span v-if="rainbowMode" class="text-xs">✓</span>
              </button>
              <button @click="toggleAsciiArtMode" :class="[
                'w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between',
                showAsciiArt ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              ]">
                <span>🎨 ASCII Art Generator</span>
                <span v-if="showAsciiArt" class="text-xs">✓</span>
              </button>
              <button @click="toggleGradientMode" :class="[
                'w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between',
                showGradient ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              ]">
                <span>🎨 Gradient Text</span>
                <span v-if="showGradient" class="text-xs">✓</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import type { TerminalState } from '@/types'
import {
  generateEchoCommand,
  generatePowerShellCommand,
  generatePythonCommand,
  generateBashCommand,
  generateRainbowBashCommand,
  generateRainbowPythonCommand,
  generateGradientBashCommand,
  generateGradientPythonCommand,
  generateAsciiBashCommand,
  generateAsciiPythonCommand,
  generateAsciiArt,
  generateRainbowText,
  generateGradientText,
  generateStyledText
} from '@/utils/terminalGenerator'

// Reactive state
const terminalState = reactive<TerminalState>({
  rawText: 'Hello, World!',
  outputFormat: 'ansi',
  textColor: 'green',
  backgroundColor: 'transparent',
  styles: {
    bold: false,
    italic: false,
    underline: false
  },
  selectedPreset: null
})

const currentFormat = ref('bash')
const rainbowMode = ref(false)
const showAsciiArt = ref(false)
const showGradient = ref(false)

// Color palettes
const textColors = {
  red: '#ef4444',
  green: '#22c55e',
  blue: '#3b82f6',
  yellow: '#eab308',
  purple: '#a855f7',
  pink: '#ec4899',
  cyan: '#06b6d4'
}

const backgroundColors = {
  black: '#000000',
  darkGray: '#374151',
  gray: '#6b7280',
  blue: '#3b82f6',
  green: '#22c55e',
  red: '#ef4444',
  transparent: 'transparent'
}

// Computed properties
const generatedCommand = computed(() => {
  if (!terminalState.rawText.trim()) return ''

  // ASCII Art mode takes precedence
  if (showAsciiArt.value) {
    switch (currentFormat.value) {
      case 'bash':
        return generateAsciiBashCommand(terminalState)
      case 'python':
        return generateAsciiPythonCommand(terminalState)
      // powerShell fallback to plain bash style
      default:
        return generateAsciiBashCommand(terminalState)
    }
  }

  // If rainbow mode is active, use rainbow command generators
  if (rainbowMode.value) {
    switch (currentFormat.value) {
      case 'bash':
        return generateRainbowBashCommand(terminalState.rawText)
      case 'python':
        return generateRainbowPythonCommand(terminalState.rawText)
      // Rainbow PowerShell output is not implemented; fallback to standard generation
      default:
        return generateRainbowBashCommand(terminalState.rawText)
    }
  }

  // Gradient mode (only if not rainbow)
  if (showGradient.value) {
    switch (currentFormat.value) {
      case 'bash':
        return generateGradientBashCommand(terminalState.rawText)
      case 'python':
        return generateGradientPythonCommand(terminalState.rawText)
      default:
        return generateGradientBashCommand(terminalState.rawText)
    }
  }

  switch (currentFormat.value) {
    case 'bash':
      return generateBashCommand(terminalState)
    case 'powershell':
      return generatePowerShellCommand(terminalState)
    case 'python':
      return generatePythonCommand(terminalState)
    default:
      return generateEchoCommand(terminalState)
  }
})

const styledPreviewText = computed(() => {
  if (!terminalState.rawText.trim()) return ''

  if (showAsciiArt.value) {
    const art = generateAsciiArt(terminalState.rawText)
    // Encode HTML safe characters and preserve spacing
    const html = art.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>')
    return `<pre style="margin:0">${html}</pre>`
  }

  if (rainbowMode.value) {
    return generateRainbowText(terminalState.rawText)
  }

  if (showGradient.value) {
    return generateGradientText(terminalState.rawText)
  }

  return generateStyledText(terminalState)
})

// Methods
const applyPreset = (type: 'success' | 'error' | 'warning') => {
  const presets = {
    success: {
      textColor: 'green',
      backgroundColor: 'transparent',
      text: 'Operation completed successfully!',
      styles: { bold: true, italic: false, underline: false }
    },
    error: {
      textColor: 'red',
      backgroundColor: 'transparent',
      text: 'Error: Something went wrong!',
      styles: { bold: true, italic: false, underline: false }
    },
    warning: {
      textColor: 'yellow',
      backgroundColor: 'transparent',
      text: 'Warning: Please check your input!',
      styles: { bold: false, italic: false, underline: false }
    }
  }

  const preset = presets[type]
  terminalState.textColor = preset.textColor
  terminalState.backgroundColor = preset.backgroundColor
  terminalState.rawText = preset.text
  terminalState.styles = preset.styles
  terminalState.selectedPreset = type
}

const toggleRainbowMode = () => {
  rainbowMode.value = !rainbowMode.value
  if (rainbowMode.value) {
    showGradient.value = false
    showAsciiArt.value = false
  }
}

const toggleGradientMode = () => {
  showGradient.value = !showGradient.value
  if (showGradient.value) {
    rainbowMode.value = false
    showAsciiArt.value = false
  }
}

const toggleAsciiArtMode = () => {
  showAsciiArt.value = !showAsciiArt.value
  if (showAsciiArt.value) {
    rainbowMode.value = false
    showGradient.value = false
  }
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedCommand.value)
    // Could add a toast notification here
    console.log('Command copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
  }
}
</script>