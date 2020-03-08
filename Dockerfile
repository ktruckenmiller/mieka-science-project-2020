FROM node
RUN npm install -g @vue/cli @vue/cli-service-global
WORKDIR /app
CMD ["bash"]
