import App from "./src/App";
// import cssText from "data-text:~/contents/src/App.css"
import indexCssText from "data-text:~/contents/src/index.css"
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true // Match the URL of the page
}

export const getStyle = () => {
  const style = document.createElement("style")
  // style.textContent = indexCssText + cssText
  style.textContent = indexCssText
  return style
}


const EntryPoint = () => {
  return (
    <>
    <App />
    </>
  )
}
 
export default EntryPoint