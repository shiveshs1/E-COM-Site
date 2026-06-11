// React Strict Mode is a development tool in React that helps you find bugs and unsafe code patterns.

// What does it do?

// In development mode only, React intentionally does some extra checks:

// Warns about deprecated features.
// Detects unexpected side effects.
// Helps find bugs in components.
// Runs some functions twice to ensure they're pure. 


// -->
// React Browser Router is used for client-side routing in React applications.

// Instead of reloading the entire page when moving between pages, React changes the displayed component while staying on the same webpage. Humans wanted websites to feel like apps, so now we have routers pretending multiple pages are one page. It works surprisingly well.

// ->Client-side routing means the browser changes what is displayed without requesting a completely new HTML page from the server.

import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'


// react-router-dom is a library that provides routing features for React applications running in a web browser (DOM).

// The name breaks down like this:

// React → React framework
// Router → Handles navigation between pages/components
// DOM → Works with the browser's Document Object Model (web pages)


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

