/* eslint-disable @typescript-eslint/no-unnecessary-condition */
export const IS_PROD = false;

export const BASE_URL = IS_PROD
  ? "https://devmjs.literasiin.com/api"
  : "https://devmjs.literasiin.com/api";
