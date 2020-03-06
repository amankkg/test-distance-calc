/// <reference types="react-scripts" />

declare interface NodeModule {
  hot?: {
    accept: (watchPath: string, watchCallback: () => void) => void
  }
}
