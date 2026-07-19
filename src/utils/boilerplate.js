const HTML_INDEX_TEMPLATE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DevBattles Workspace</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <main id="app">
      <h1>Hello World</h1>
      <p>Edit the starter files to build your solution.</p>
    </main>
    <script defer src="./script.js"></script>
  </body>
</html>
`;

const HTML_STYLE_TEMPLATE = `* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: system-ui, sans-serif;
  background: #f5f7fb;
  color: #0f172a;
}

#app {
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 0.5rem;
  text-align: center;
}
`;

const HTML_SCRIPT_TEMPLATE = `const root = document.getElementById('app');

if (root) {
  console.log('Workspace loaded');
}
`;

const REACT_INDEX_TEMPLATE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DevBattles React Workspace</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

const REACT_APP_TEMPLATE = `export default function App() {
  return (
    <div className="p-6 rounded-2xl bg-white shadow-lg">
      <h1 className="text-2xl font-bold text-slate-900">Hello React</h1>
      <p className="mt-2 text-slate-600">Build your component here.</p>
    </div>
  );
}
`;

const REACT_MAIN_TEMPLATE = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

const REACT_STYLES_TEMPLATE = `body {
  margin: 0;
  min-height: 100vh;
  background: #f8fafc;
  font-family: system-ui, sans-serif;
}
`;

const NODE_APP_TEMPLATE = `import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'DevBattles backend is running' });
});

export default app;
`;

const NODE_SERVER_TEMPLATE = `import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
`;

const NODE_ROUTES_TEMPLATE = `import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true });
});

export default router;
`;

export const DEFAULT_BOILERPLATES = {
  javascript: `/**
 * @param {any[]} args
 * @return {any}
 */
function solve(...args) {
  // Your code here
}
`,
  python: `class Solution:
    def solve(self, *args):
        # Your code here
        pass
`,
  java: `class Solution {
    public void solve() {
        // Your code here
    }
}
`,
  cpp: `class Solution {
public:
    void solve() {
        // Your code here
    }
};
`,
  sql: `-- Write your PostgreSQL query statement below
`,
  html: HTML_INDEX_TEMPLATE,
  css: HTML_STYLE_TEMPLATE,
  react: REACT_APP_TEMPLATE,
  node: NODE_APP_TEMPLATE,
  express: NODE_APP_TEMPLATE,
};

export function getBoilerplateForLanguage(language) {
  return DEFAULT_BOILERPLATES[language] || '';
}

function file(content) {
  return { content };
}

export function getDefaultStarterFiles(language) {
  if (language === 'html_css') {
    return {
      'index.html': file(HTML_INDEX_TEMPLATE),
      'style.css': file(HTML_STYLE_TEMPLATE),
      'script.js': file(HTML_SCRIPT_TEMPLATE),
    };
  }

  if (language === 'react') {
    return {
      'index.html': file(REACT_INDEX_TEMPLATE),
      'App.jsx': file(REACT_APP_TEMPLATE),
      'main.jsx': file(REACT_MAIN_TEMPLATE),
      'styles.css': file(REACT_STYLES_TEMPLATE),
    };
  }

  if (language === 'node' || language === 'express') {
    return {
      'app.js': file(NODE_APP_TEMPLATE),
      'server.js': file(NODE_SERVER_TEMPLATE),
      'routes/index.js': file(NODE_ROUTES_TEMPLATE),
    };
  }

  if (language === 'sql') {
    return {
      'query.sql': file(DEFAULT_BOILERPLATES.sql),
    };
  }

  const extMap = {
    javascript: 'js',
    python: 'py',
    java: 'java',
    cpp: 'cpp',
  };

  const ext = extMap[language] || 'txt';
  return {
    [`main.${ext}`]: file(getBoilerplateForLanguage(language)),
  };
}
