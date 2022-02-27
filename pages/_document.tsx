import React from "react";
import { ServerStyleSheets } from "@mui/styles";
import Document, {
  Head,
  Html,
  DocumentContext,
  Main,
  NextScript,
} from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets(); // 추가하지 않으면 CSS-in-JS와 같은 스타일 패키지들이 적용되지 않습니다.
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => {
      return originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });
    };
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <link
            rel="stylesheet"
            href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

/**
 * _document.js
 *
 * _document 파일은 <html> 과 <body> 태그를 업데이트 할 수 있습니다.
 * 하지만 서버에서 렌더링 뒤기 때문에 onClick과 같은 이벤트를 사용하는 것은 불가능합니다.
 * 보통 Styled-compoents 와 같은 CSS-in-JS 와 같은 기술을 사용할 때 많이 이용합니다.
 *
 * 공식문서에서는 React 18을 대비하여 getinitialProps 나,
 * renderPage 와 같은 함수를 커스텀하지 않는 것은 추천합니다.
 * React 18이 많이 사용될 쯤에는 getInitialProps를 사용하지 않으려나요.
 * 잘모르겠습니다. React 18을 문서를 빨리 읽어봐야겠네요.
 *
 */
