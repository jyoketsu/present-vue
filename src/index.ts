import { App } from "vue";
import Present from "./stories/Present.vue";

export { Present };

export default {
  install(app: App) {
    app.component("Present", Present);
  },
};
