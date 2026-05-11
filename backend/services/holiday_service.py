import requests
from django.core.cache import cache

def get_holidays(year):

    cache_key = f'holidays_{year}'

    holidays = cache.get(cache_key)

    if holidays:
        return holidays

    url = f'https://brasilapi.com.br/api/feriados/v1/{year}'

    response = requests.get(url)

    if response.status_code != 200:
        return []

    holidays = response.json()

    cache.set(cache_key, holidays, 60 * 60 * 24)  # 24h

    return holidays