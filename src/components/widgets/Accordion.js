import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/night-owl.css";
import html from "highlight.js/lib/languages/xml";

function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionTitleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <h3 className={`accordion-title ${isOpen ? "arrow-up" : "arrow-down"}`} onClick={handleAccordionTitleClick}>{title}</h3>
      {isOpen && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Accordion() {
  const codeRef = useRef(null);
  const [buttonText, setButtonText] = useState("Copy code");

  hljs.registerLanguage("html", html);
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const handleCopyCode = () => {
    const codeElement = codeRef.current;
    const range = document.createRange();
    range.selectNode(codeElement);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    setButtonText("Copied!");

    setTimeout(() => {
      setButtonText("Copy code");
    }, 2000);
  };

  return (
    <section className="wd-content" id="toc-accordion">
      <h2 id="accordion" className="section-top anchor">Accordion</h2>
      <p>Use the <strong>Accordion</strong> to display content in collapsible compartments.</p>
      <p>Use <span className="wd-monospace">&lt;div class="accordion"&gt;&lt;/div&gt;</span> to wrap your content.</p>
      <div className="wd-window">
        <div className="wd-visual-ex">
          <div className="accordion">
          <AccordionItem title="Read">
					<p>Making News, March/April 2018. By Deb Venasse, Reporter, <em>IBPA Independent</em> magazine</p>
          </AccordionItem>
          <AccordionItem title="Discuss">
					<p>Adweek is a well-known organization that covers media and communication people, places, and things. Some of its popular elements with journalists, creatives, and media workers are the newsletters with news about the actual people doing the media work.</p>
          </AccordionItem>
          </div>
        </div>
        <div className="wd-btn-container">
          <button className="wd-copy-btn" onClick={handleCopyCode}>{buttonText}</button>
        </div>
        <div className="wd-html-code">
          <pre>
            <code className="language-html" ref={codeRef}>
            {String.raw`<div class="accordion">
   <div class="accordion-item">
      <h3 class="accordion-title arrow-down toggle-btn">Read</h3>
      <div class="accordion-content toggle-btn-content">
         <p>Making News, March/April 2018. By Deb Venasse...</p>
      </div>
   </div>
   <div class="accordion-item">
      <h3 class="accordion-title arrow-down toggle-btn">Discuss</h3>
      <div class="accordion-content toggle-btn-content">
         <p>Adweek is a well-known organization that...</p>
      </div>
   </div>
</div>`}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}