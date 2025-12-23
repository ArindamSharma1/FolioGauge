from supabase import create_client
from supabase import create_client
import os
from dotenv import load_dotenv

# Flexibly load env vars
load_dotenv() 

SUPABASE_URL = os.getenv("SUPABASE_URL")
# Use Service Role Key if available (best for backend), otherwise fallback to Anon/Generic Key
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
