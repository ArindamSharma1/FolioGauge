from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="backend/app/enviroment-variables.env")

security = HTTPBearer()
JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        # Decode and verify token
        # verify_aud=False is sometimes needed if the audience claim doesn't strictly match 'authenticated'
        payload = jwt.decode(
            token, 
            JWT_SECRET, 
            algorithms=["HS256"], 
            options={"verify_aud": False} 
        )
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        print("Error: Token expired")
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError as e:
        print(f"Error: JWT Decode failed: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        print(f"Error: Unknown Auth Error: {str(e)}")
        raise HTTPException(status_code=401, detail="Authentication failed")
