
import os
from supabase import create_client
from dotenv import load_dotenv

# Load env vars
load_dotenv(dotenv_path="backend/app/enviroment-variables.env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: Missing Supabase credentials in env file.")
    exit(1)

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

email = "arindamsharma693@gmail.com"

try:
    # Service role can access auth.users via admin api usually, 
    # but supabase-py might differ. Let's try listing users or getting by email if possible.
    # Actually, supabase-py admin auth is:
    user_data = supabase.auth.admin.list_users()
    
    target_user = None
    for user in user_data:
        if user.email == email:
            target_user = user
            break
            
    if target_user:
        print(f"FOUND_USER_ID={target_user.id}")
    else:
        print("User not found via list_users. Trying alternative...")

except Exception as e:
    print(f"Error: {e}")
