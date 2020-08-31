const babel = require("@babel/core")
const plugin = require("../")

function transform(code) {
  return babel.transform(`import(${code})`, {
    plugins: [plugin, "@babel/plugin-syntax-dynamic-import"],
  }).code
}

it("should transform simple file paths", () => {
  const code = transform(`"./file"`)
  expect(code).toMatchInlineSnapshot(`
    "import(
    /*webpackChunkName: 'file'*/
    \\"./file\\");"
  `)
})

it("should transform paths with folders", () => {
  const code = transform(`"./folder/file"`)
  expect(code).toMatchInlineSnapshot(`
    "import(
    /*webpackChunkName: 'folder--file'*/
    \\"./folder/file\\");"
  `)
})

it("should transform paths without leading periods", () => {
  const code = transform(`"folder/file"`)
  expect(code).toMatchInlineSnapshot(`
    "import(
    /*webpackChunkName: 'folder--file'*/
    \\"folder/file\\");"
  `)
})

it("should transform camel case to kebab case", () => {
  const code = transform(`"./folderA/fileName"`)
  expect(code).toMatchInlineSnapshot(`
    "import(
    /*webpackChunkName: 'folder-a--file-name'*/
    \\"./folderA/fileName\\");"
  `)
})

it("should transform nested folders", () => {
  const code = transform(`"../folder-a/folderB/FileName"`)
  expect(code).toMatchInlineSnapshot(`
    "import(
    /*webpackChunkName: 'folder-a--folder-b--file-name'*/
    \\"../folder-a/folderB/FileName\\");"
  `)
})

it("should transform paths with extensions", () => {
  const code = transform(`"fileName.ts"`)
  expect(code).toMatchInlineSnapshot(`
    "import(
    /*webpackChunkName: 'file-name'*/
    \\"fileName.ts\\");"
  `)
})

it("should not transform imports which already have the chunk name", () => {
  const normal = transform(`/* webpackChunkName: 'keep-me' */ "fileName"`)
  const noSpace = transform(`/*webpackChunkName:'keep-me'*/ "fileName"`)
  const extra = transform(`/**  webpackChunkName:   'keep-me'  **/ "fileName"`)

  expect(normal).toMatchInlineSnapshot(`
    "import(
    /* webpackChunkName: 'keep-me' */
    \\"fileName\\");"
  `)
  expect(noSpace).toMatchInlineSnapshot(`
    "import(
    /*webpackChunkName:'keep-me'*/
    \\"fileName\\");"
  `)
  expect(extra).toMatchInlineSnapshot(`
    "import(
    /**  webpackChunkName:   'keep-me'  **/
    \\"fileName\\");"
  `)
})
