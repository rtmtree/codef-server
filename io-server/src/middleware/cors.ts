import { ADDITIONAL_CORS_HOSTS } from "../rawConfig";

const additionalSafeHosts =
  "ADDITIONAL_CORS_HOSTS" in process.env
    ? ADDITIONAL_CORS_HOSTS.split(",")
    : [];

const CORSSafeList = additionalSafeHosts;

interface CorsConfig {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => void;
}

export const corsOptions: CorsConfig = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (CORSSafeList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
