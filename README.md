# remark-mdc

Remark plugin to support MDC Syntax

## Install

```bash
# Using Yarn
yarn add --dev remark-mdc
# Using NPM
npm install --save-dev remark-mdc
```

## Use

```js
import { unified } from 'unified';
import parse from 'remark-parse';
import remarkMDC from 'remark-mdc';

function compiler() {
  this.Compiler = function(root) {
    return root;
  }
}

export async function markdownToAST(markdown) {
  let stream = unified()
    .use(parse)
    .use(remarkMDC)
    .use(compiler);

  const file = await stream.process(markdown);
  return file.result;
}
```

## 💻 Development

- Clone the repository
- Install dependencies using `pnpm install`
- Prepare using `pnpm run dev:prepare`
- Try the playground using `pnpm run dev`

## License

[MIT](./LICENSE) - Made with 💚
