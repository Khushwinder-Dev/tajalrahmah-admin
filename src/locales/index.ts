/* eslint-disable @typescript-eslint/no-explicit-any */
// locales/index.ts
import en from "./en.json";
import ur from "./ur.json";
import hi from "./hi.json";
import ar from "./ar.json";
import bn from "./bn.json";

export const LANGUAGE_LABELS: any = {
  en,
  ur,
  hi,
  ar,
  bn,
};

export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_LABELS);
