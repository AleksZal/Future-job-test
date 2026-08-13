from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    database_url: str = "postgresql://postgres:password@localhost:5432/future_job_db"
    frontend_url: str = "http://localhost:5173"
    
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
