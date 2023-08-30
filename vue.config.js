const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    /[/\\]node_modules[/\\]@vue[/\\]composition-api[/\\]/,
    /[/\\]node_modules[/\\]element-ui[/\\]/ // Fügen Sie hier weitere Abhängigkeiten hinzu, falls erforderlich
  ]
})
