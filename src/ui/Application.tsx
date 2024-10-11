// Chrome拡張のコンテンツスクリプト
import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { CacheProvider } from "@emotion/react";
import createCache, { EmotionCache } from "@emotion/cache";
import App from "@/ui/navigation/ContentService";

export class Application {
  root: ReactDOM.Root;

  shadowCache: EmotionCache;

  constructor(rootElement: HTMLElement, shadow: ShadowRoot) {
    this.root = ReactDOM.createRoot(rootElement);
    this.shadowCache = createCache({
      key: "mui-shadow-dom",
      container: shadow,
    });
  }

  start() {
    this.root.render(
      <CacheProvider value={this.shadowCache}>
        <React.StrictMode>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </React.StrictMode>
      </CacheProvider>
    );
  }
}
