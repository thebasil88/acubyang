
### old build
set ELEVENTY_PRODUCTION=true & set NODE_ENV=production & npx tailwindcss -i styles/tailwind.css -c styles/tailwind.config.js -o _site/style.css --minify & eleventy