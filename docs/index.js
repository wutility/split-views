let defaultOptions = {
  direction: "horizontal",
  gutterSize: 5,
  minSize: 0,
  snapOffset: 0,
  columns: 3,
}

let sp = null
const container = document.querySelector(".split-container")
const form = document.querySelector(".config-form")
const codeBlock = document.querySelector(".code-content")

// Initialize split view
function initializeSplitView() {
  const result = 100 / defaultOptions.columns
  const sizes = new Array(defaultOptions.columns).fill(result)

  container.innerHTML = ""
  sizes.forEach((s, i) => {
    container.innerHTML += `<div class="pane ${i === 0 ? "pane-primary" : "pane-secondary"}">
      <div class="pane-content">
        <span class="pane-label">Panel ${String.fromCharCode(65 + i)}</span>
        <p class="pane-desc">Resizable content area</p>
      </div>
    </div>`
  })

  sp = SplitViews({
    root: container,
    ...defaultOptions,
    sizes,
    onDragEnd: (newSizes) => {
      console.log(newSizes);
      updateCodeDisplay(newSizes)
    },
  })

  updateCodeDisplay(sizes)
}

function updateCodeDisplay(sizes = null) {
  const configCode = `// SplitViews Library Configuration
import SplitViews from 'split-views';

const splitView = new SplitViews({
  root: '.split-container',
  direction: '${defaultOptions.direction}',
  gutterSize: ${defaultOptions.gutterSize},
  minSize: ${defaultOptions.minSize},
  snapOffset: ${defaultOptions.snapOffset},
  sizes: [${sizes ? sizes.map((s) => s.toFixed(1)).join(", ") : new Array(defaultOptions.columns).fill((100 / defaultOptions.columns).toFixed(1)).join(", ")}],
  onDragEnd: (newSizes) => {
    console.log('Panel sizes updated:', newSizes);
    // Handle resize events in your application
  }
});`

  codeBlock.textContent = configCode
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault()

  if (sp) sp.destroy()

  const formData = new FormData(e.target)
  const newOptions = {}

  for (const [key, value] of formData.entries()) {
    if (value !== "" && value !== null) {
      newOptions[key] = isNaN(value) ? value : Number(value)
    }
  }

  // Merge with current options, only updating provided values
  defaultOptions = { ...defaultOptions, ...newOptions }

  // Ensure columns is at least 1
  if (defaultOptions.columns < 1) {
    defaultOptions.columns = 2
  }

  initializeSplitView()
})

document.querySelector(".copy-code-btn")?.addEventListener("click", () => {
  navigator.clipboard.writeText(codeBlock.textContent).then(() => {
    const btn = document.querySelector(".copy-code-btn")
    const originalText = btn.textContent
    btn.textContent = "Copied!"
    setTimeout(() => {
      btn.textContent = originalText
    }, 2000)
  })
})

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeSplitView()
})
