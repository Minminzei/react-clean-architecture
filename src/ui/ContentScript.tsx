// Chrome拡張のコンテンツスクリプト
import { Application } from "@/ui/Application";
import cssText from "@/ui/index.css?raw";

const containerId = "chrome-extension-container";
const rootId = "chrome-extension-root";

// Shadow DOM を作成
const containerElement = document.createElement("chrome-extension-container");
containerElement.id = containerId;
const shadow = containerElement.attachShadow({ mode: "open" });
document.body.appendChild(containerElement);

// Shadow DOM にStyleを追加
const styleElement = document.createElement("style");
styleElement.textContent = cssText;
shadow.appendChild(styleElement);

// Root Element を作成
const rootElement = document.createElement("div");
rootElement.id = rootId;

shadow.appendChild(rootElement);
const apps = new Application(rootElement, shadow);
apps.start();
