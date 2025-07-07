interface ImportMetaEnv {
  readonly VITE_WEBHOOK_ID: string
  readonly VITE_WEBHOOK_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
