from datetime import date
from .supabase_client import supabase

TIER_LIMITS = {
    "free": 3,
    "pro": 5,
    "super_pro": 50
}

def get_user_tier(user_id: str):
    try:
        res = supabase.table("profiles").select("tier").eq("id", user_id).single().execute()
        if res.data:
            return res.data.get("tier", "free")
    except Exception as e:
        print(f"Error getting tier for {user_id}: {e}")
        pass
    return "free"

def can_user_scan(user_id: str):
    today = date.today().isoformat()
    tier = get_user_tier(user_id)
    limit = TIER_LIMITS.get(tier, 3)

    res = supabase.table("scan_usage") \
        .select("*") \
        .eq("user_id", user_id) \
        .eq("scan_date", today) \
        .execute()

    if res.data:
        return res.data[0]["scan_count"] < limit

    return True


def increment_scan(user_id: str):
    today = date.today().isoformat()

    res = supabase.table("scan_usage") \
        .select("*") \
        .eq("user_id", user_id) \
        .eq("scan_date", today) \
        .execute()

    if res.data:
        supabase.table("scan_usage") \
            .update({"scan_count": res.data[0]["scan_count"] + 1}) \
            .eq("user_id", user_id) \
            .eq("scan_date", today) \
            .execute()
    else:
        supabase.table("scan_usage").insert({
            "user_id": user_id,
            "scan_date": today,
            "scan_count": 1
        }).execute()

def get_usage_stats(user_id: str):
    today = date.today().isoformat()
    tier = get_user_tier(user_id)
    limit = TIER_LIMITS.get(tier, 3)
    scan_count = 0

    try:
        res = supabase.table("scan_usage") \
            .select("scan_count") \
            .eq("user_id", user_id) \
            .eq("scan_date", today) \
            .single() \
            .execute()
        
        if res.data:
            scan_count = res.data.get("scan_count", 0)
    except Exception:
        # If no record found, scan_count remains 0
        pass

    return {
        "tier": tier,
        "used": scan_count,
        "limit": limit
    }
