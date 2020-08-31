function convertToKebabCase(string) {
  return string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase()
}

function getChunkName(filename) {
  return filename
    .split("/")
    .map((part) => part.replace(/\..*$/, ""))
    .filter(Boolean)
    .map(convertToKebabCase)
    .join("--")
}

function hasComment(comment) {
  return (
    comment &&
    comment.value.replace(/\*+/g, "").trim().startsWith("webpackChunkName")
  )
}

/**
 * @param {import('@babel/core')}
 * @returns {import('@babel/core').PluginObj}
 */
module.exports = function ({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
        if (path.node.callee.type !== "Import") {
          return
        }

        const [arg] = path.node.arguments
        const [comment] = arg.leadingComments || []

        if (!hasComment(comment)) {
          t.addComment(
            arg,
            "leading",
            `webpackChunkName: '${getChunkName(arg.value)}'`
          )
        }
      },
    },
  }
}
