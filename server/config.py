from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Railway provides DATABASE_URL automatically.
    # In local development, you must provide it in a .env file.
    DATABASE_URL: str
    SECRET_KEY: str = "unsafe_default_key_change_me_in_production"
    FRONTEND_URL: str = "http://localhost:5173"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
