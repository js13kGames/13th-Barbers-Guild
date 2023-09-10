export default {
  build: {
    minify: "terser",
    cssMinify: "lightningcss",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  server: {
    host: true,
  },
};
