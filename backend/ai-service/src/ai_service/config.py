from functools import lru_cache
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class PostgresSettings(BaseSettings):
    host: str = "localhost"
    port: int = 5432
    user: str = "stylesense"
    password: str = "stylesense_dev"
    database: str = "stylesense"

    model_config = SettingsConfigDict(env_prefix="POSTGRES_", extra="ignore")


class RedisSettings(BaseSettings):
    host: str = "localhost"
    port: int = 6379

    model_config = SettingsConfigDict(env_prefix="REDIS_", extra="ignore")


class Settings(BaseSettings):
    port: int = 8000
    log_level: Literal["debug", "info", "warning", "error", "critical"] = "info"

    jwt_secret: str = Field(default="dev_secret_replace_me_replace_me", min_length=16)

    openai_api_key: str = ""
    openai_model: str = "gpt-4o-mini"

    postgres: PostgresSettings = Field(default_factory=PostgresSettings)
    redis: RedisSettings = Field(default_factory=RedisSettings)

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
