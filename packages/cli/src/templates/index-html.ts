import type { ScaffoldContext } from '../types';

export default ({ pascalCaseName }: ScaffoldContext) => {
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${pascalCaseName}</title>
  </head>
  <body>
    <div>
        <hello-sayer name="World"></hello-sayer>
    </div>
  </body>
</html>`;
};
