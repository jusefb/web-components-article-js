/* we need to include the component below to make sure to 
  to make web components work with Babel
*/

import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter";

//https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
class RsvpCounter extends HTMLElement {
  get header() {
    return this.getAttribute("header");
  }

  set header(newValue) {
    this.setAttribute("header", newValue);
  }

  get subheader() {
    return this.getAttribute("subheader");
  }

  set subheader(newValue) {
    this.setAttribute("subheader", newValue);
  }

  static get observedAttributes() {
    return ["header", "subheader"];
  }

  constructor() {
    // Always call super first in constructor
    super();
    this.count = 0;
    //usign Shadow DOM
    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
      <style>
      .rsvp-counter-cntr {
        border: 1px solid black;
      }

      :host {
        text-align: center;
        font-family: Arial;
      }

      :host h1 { 
        color: #00e1c6;
      }

      :host h2 {
        color: #184769;
      }

      :host .button{
        color: #fff;
        background-color: #0069d9;
        border-color: #0062cc;
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid transparent;
        padding: .375rem .75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: .25rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
      }

      :host .card {
        position: relative;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid rgba(0,0,0,.125);
        border-radius: .25rem;
        background-color: #F7F7F9;
        margin-bottom: 1rem;

      }
      
      </style> <!-- look ma, scoped styles -->
      <div class="rsvp-counter-cntr card">
        <h1 class="header"></h1>
        <h2 class="subheader"></h2>
        <slot></slot>
        <br>
        <button type="button" class="vc-dislike-btn button">Dislike</button>
        <span class="vc-total"></span>
          <button type="button" class="vc-like-btn button">Like</button>

  <br>
  <sub>Powerd by Native JS</sub>
      </div>
    `;

    let shadowRoot = this.attachShadow({ mode: "open" });
    let componentEl = tmpl.content.cloneNode(true);
    componentEl.querySelector(".header").textContent = this._header;

    shadowRoot.appendChild(componentEl);
    shadowRoot
      .querySelector(".vc-like-btn")
      .addEventListener("click", e => this.onLikeClick(e));
    shadowRoot
      .querySelector(".vc-dislike-btn")
      .addEventListener("click", e => this.ondisLikeClick(e));
    shadowRoot.querySelector(".vc-total").textContent = this.count;
  }

  connectedCallback() {
    //this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
  }

  disconnectedCallback() {}

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === "header") {
      if (oldVal !== newVal) {
        this.shadowRoot.querySelector(".header").textContent = newVal;
      }
    }

    if (attrName === "subheader") {
      if (oldVal !== newVal) {
        this.shadowRoot.querySelector(".subheader").textContent = newVal;
      }
    }
  }

  onLikeClick(e) {
    this.count++;
    this.updateCount(this.count);
  }

  ondisLikeClick(e) {
    this.count--;
    this.updateCount(this.count);
  }

  updateCount(newVal) {
    this.shadowRoot.querySelector(".vc-total").textContent = newVal;
  }
}

window.customElements.define("wc-vote-counter", RsvpCounter);
