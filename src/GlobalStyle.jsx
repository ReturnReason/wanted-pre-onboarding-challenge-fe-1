const { createGlobalStyle } = require('styled-components');

const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: 'NanumSquareNeo-Variable';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
  }

  * {
    box-sizing : border-box;
    font-family: 'NanumSquareNeo-Variable';
  }

  body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

export default GlobalStyle;
