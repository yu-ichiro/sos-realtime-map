module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    headers: {
      "Cache-Control": "no-cache; max-age=0",
      Vary: "*"
    }
  }
};
