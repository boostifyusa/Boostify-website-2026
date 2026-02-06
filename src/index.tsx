import React from 'react';
import './index.css';
import { render } from 'react-dom';
import { App } from './App';
// Strip all HTML comments from the DOM
function removeHtmlComments(node: Node) {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_COMMENT);
  const comments: Comment[] = [];
  while (walker.nextNode()) {
    comments.push(walker.currentNode as Comment);
  }
  comments.forEach((c) => c.remove());
}
// Run on load and observe for any injected later
removeHtmlComments(document);
const observer = new MutationObserver((mutations) => {
  mutations.forEach((m) => {
    m.addedNodes.forEach((node) => {
      if (node.nodeType === Node.COMMENT_NODE) {
        node.parentNode?.removeChild(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        removeHtmlComments(node);
      }
    });
  });
});
observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

render(
  <GoogleReCaptchaProvider
    reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} // Test Key
    scriptProps={{
      async: false,
      defer: false,
      appendTo: 'head',
      nonce: undefined,
    }}
  >
    <App />
  </GoogleReCaptchaProvider>,
  document.getElementById('root')
);