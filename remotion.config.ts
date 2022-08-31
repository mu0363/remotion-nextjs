import { Config } from "remotion";
import { enableTailwind } from "./enable-tailwind";
Config.Bundling.overrideWebpackConfig(enableTailwind);
