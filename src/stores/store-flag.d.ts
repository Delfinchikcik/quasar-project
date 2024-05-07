// Импортируем модуль quasar/dist/types/feature-flag;
import "quasar/dist/types/feature-flag";

// Расширяем интерфейс QuasarFeatureFlags, добавляя новый флаг "store"
declare module "quasar/dist/types/feature-flag" {
  interface QuasarFeatureFlags {
    store: true;
  }
}

