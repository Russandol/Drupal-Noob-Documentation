FROM node:20-alpine

WORKDIR /app
EXPOSE 5173

CMD sh -c "if [ ! -f package.json ]; then npm init -y && npm install vitepress; fi; npx vitepress dev docs --host 0.0.0.0 --port 5173"
