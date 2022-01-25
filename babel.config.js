module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "inline-dotenv",
      ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ]
  };
};
