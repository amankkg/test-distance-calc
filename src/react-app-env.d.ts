/// <reference types="react-scripts" />

declare interface NodeModule {
  hot?: {
    accept: (watchPath: string, watchCallback: () => void) => void
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_GOOGLE_MAPS_JS_API_KEY: string
  }
}
