module.exports = {
  transpileDependencies: ["vuetify"],
  pages: {
    index: {
      entry: "src/main.ts",
      title: "牧場物語リアルタイムマップ"
    }
  },
  devServer: {
    headers: {
      "Cache-Control": "no-cache; max-age=0",
      Vary: "*"
    }
  }
};
