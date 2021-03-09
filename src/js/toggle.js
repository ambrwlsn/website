const template = document.createElement('template');

template.innerHTML = `
  <style>
  /* Box sizing rules */
    *,
    *::before,
    *::after {
    box-sizing: border-box;
    }

    div {
        position: relative;
        width: 30px;
        height: 30px;
        overflow: hidden;
        margin-left: 20px;
    }
    
    div input {
        opacity: 0;
        margin: 0px;
        position: absolute;
    }
    
    div input:focus ~ span,
    div input:hover ~ span {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border: 1px solid var(--textColor);
        border-radius: 3px;
        z-index: 1;
        pointer-events: none;
    }
    
    div label {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        position: relative;
        background-color: #c3e0fc;
        transition: background-color 1s ease-out;
        cursor: pointer;
    }
    
    div input:checked ~ label {
        background-color: #243bbd;
    }
    
    div label::after {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        position: relative;
        top: 2px;
        right: -16px;
        border-radius: 50%;
        color: yellow;
        background-color: currentColor;
        box-shadow: none;
        transition: transform 1s ease-out;
    }
    
    div input:checked ~ label::after {
        transform: translateY(30px);
        transition-timing-function: ease-in;
    }
    
    div label::before {
        opacity: 0;
        content: '';
        display: block;
        width: 2px;
        height: 2px;
        position: absolute;
        top: 3px;
        left: 8px;
        color: white;
        background-color: currentColor;
        box-shadow: 17px 5px 0 0 currentColor, 9px 1px 0 0 currentColor,
        16px 21px 0 0 currentColor, 2px 14px 0 0 currentColor,
        4px 21px 0 0 currentColor, 13px 14px 0 0 currentColor,
        10px 8px 0 0 currentColor, -2px 7px 0 0 currentColor,
        -3px 18px 0 0 currentColor;
        transition: opacity 1s ease-out;
    }
    
    div input:checked ~ label::before {
        opacity: 1;
        transition-delay: 0.5s;
        transition-timing-function: ease-in;
    }

    label span:not(:focus):not(:active) {
        border-top-width: 0 !important;
        border-right-width: 0 !important;
        border-bottom-width: 0 !important;
        border-left-width: 0 !important;
        clip: rect(1px, 1px, 1px, 1px) !important;
        height: 1px !important;
        overflow: hidden !important;
        padding-top: 0 !important;
        padding-right: 0 !important;
        padding-bottom: 0 !important;
        padding-left: 0 !important;
        position: absolute !important;
        white-space: nowrap !important;
        width: 1px !important;
      }
  </style>
 
  <div class="web-toggle-wrapper">
    <input class="web-toggle-input" type="checkbox" id="web-toggle" name="dark">
    <span class="web-toggle-focus-outline"></span>
    <label class="web-toggle-label" for="web-toggle">
      <span class="web-toggle-label-text">Light and Dark Mode Toggle</span>
    </label>
  </div>
`;

class WebToggle extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.input = this._shadowRoot.querySelector('input');
    this.$label = this._shadowRoot.querySelector('label');

    // gets HTML element
    const html = document.getElementsByTagName('html')[0];
    // gets local storage item with name 'color-scheme'
    var localStorageColorScheme = window.localStorage.getItem('color-scheme');
    // checks what, if any, colour scheme is preferred
    var darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // returns true if dark colour scheme is preferred
    var prefersDarkMode = darkModeMediaQuery.matches;

    // if there's a color-scheme local storage item, set a class on the HTML element
    // with that item's value, without overwriting existing classes
    if (localStorageColorScheme) {
      html.classList.add(localStorageColorScheme);
    }

    // ensures the input is checked if either the colour-scheme local storage item value
    // is dark, or dark colour scheme is preferred
    this.input.checked = localStorageColorScheme === 'dark' || prefersDarkMode;

    // when the input (checkbox) is clicked, set either light or dark in the colour-scheme
    // local storage item, and set the HTML class to either dark or light
    this.input.addEventListener(
      'click',
      (event) => {
        localStorage.setItem(
          'color-scheme',
          event.target.checked ? 'dark' : 'light'
        );
        if (event.target.checked) {
          html.classList.remove('light');
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
          html.classList.add('light');
          this.input.checked = false;
        }
      },
      false
    );

    // listen for a switch to "prefers dark mode", and if this activated and there is no
    // local storage item, check the input
    darkModeMediaQuery.addEventListener('change', () => {
      if (!localStorageColorScheme) {
        this.input.checked = darkModeMediaQuery.matches;
      }
    });
  }

  get label() {
    return this.getAttribute('label');
  }

  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    this.$label.innerHTML = this.label
      ? `<span class="hidden">${this.label}</span>`
      : `<span class="hidden">Light and Dark Mode Toggle</span>`;
  }
}

window.customElements.define('web-toggle', WebToggle);
