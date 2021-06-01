import { createApp, resolveComponent, h } from "vue";
import { renderToStream as _renderToStream } from "@vue/server-renderer";

const app = createApp({
  render() {
    const Foo = resolveComponent("foo");
    return h(Foo);
  },
});
app.component("foo", {
  render: () => h("div", "foo"),
});

const promisifyStream = (stream) => {
  return new Promise((resolve, reject) => {
    let result = "";
    stream.on("data", (data) => {
      result += data;
    });
    stream.on("error", () => {
      reject(result);
    });
    stream.on("end", () => {
      resolve(result);
    });
  });
};

const renderToStream = (app) => promisifyStream(_renderToStream(app));

renderToStream(app).then((v) => {
  console.log(v);
});
