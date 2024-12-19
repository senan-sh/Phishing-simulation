import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
  get(key: string): string {
    return process.env[key] || "";
  }

  getMongoUri(): string {
    return this.get("MONGO_URI") || "mongodb://localhost:27017/phishing-app";
  }

  getJwtSecret(): string {
    return this.get("JWT_SECRET") || "default_secret";
  }
}
