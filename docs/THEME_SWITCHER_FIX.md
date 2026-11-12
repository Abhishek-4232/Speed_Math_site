# Theme switcher fix

- Added always-visible Light, Dark, and Sepia icon controls to the top bar.
- Added explicit labelled theme choices in the sidebar instead of a hidden cycling action.
- Selected state is exposed with `aria-pressed` and visible focus styles.
- Existing `mathforge-theme` localStorage preference and document `data-theme` application are retained, so the selected theme persists across reloads.
- Updated native control `color-scheme` to follow the selected theme.

Validation: source-level JSX replacement and CSS inspection completed. A full Vite build and browser interaction test have not been run in this environment.
