import { Country } from "../types";

const BASE_URL = "https://restcountries.com/v3.1";
const FALLBACK_URL = "https://raw.githubusercontent.com/fayazara/restcountries/main/all.json";

// Simple in-memory cache to prevent redundant API calls
let cachedCountries: Country[] | null = null;
const cacheByCode: { [key: string]: Country } = {};

// Helper to fetch with timeout and exponential backoff retry logic
async function fetchWithRetry(url: string, options?: RequestInit, retries = 3, delay = 1000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000); // 12 seconds timeout

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (retries > 0) {
      console.warn(`Fetch failed. Retrying in ${delay}ms... (${retries} attempts left). Error:`, error);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    throw error;
  }
}

export async function fetchAllCountries(): Promise<Country[]> {
  if (cachedCountries) {
    return cachedCountries;
  }

  try {
    const response = await fetchWithRetry(`${BASE_URL}/all`);
    const data: Country[] = await response.json();
    
    // Sort alphabetically by English common name by default
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    
    cachedCountries = data;
    // Cache individual countries while iterating to optimize sub-page loads
    for (const country of data) {
      cacheByCode[country.cca3.toUpperCase()] = country;
    }
    return data;
  } catch (error) {
    console.warn("Primary REST Countries API failed. Trying high-fidelity fallback mirror...", error);
    try {
      const response = await fetchWithRetry(FALLBACK_URL);
      const data: Country[] = await response.json();
      
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      cachedCountries = data;
      for (const country of data) {
        cacheByCode[country.cca3.toUpperCase()] = country;
      }
      return data;
    } catch (fallbackError) {
      console.error("Critical: Both primary API and fallback mirror failed.", fallbackError);
      throw fallbackError;
    }
  }
}

export async function fetchCountryByCca3(cca3: string): Promise<Country> {
  const code = cca3.toUpperCase();
  if (cacheByCode[code]) {
    return cacheByCode[code];
  }

  try {
    const response = await fetchWithRetry(`${BASE_URL}/alpha/${code}`);
    const data: Country[] = await response.json();
    if (!data || data.length === 0) {
      throw new Error(`Country with code "${code}" not found`);
    }

    const country = data[0];
    cacheByCode[code] = country;
    return country;
  } catch (error) {
    console.warn(`Individual fetch failed for ${code}. Attempting to sync catalog from highly available backup...`, error);
    try {
      // Trigger full catalog fetch to populate cached codes offline or from mirror
      await fetchAllCountries();
      if (cacheByCode[code]) {
        return cacheByCode[code];
      }
    } catch (catalogErr) {
      console.error("Individual fallback country retrieval failed:", catalogErr);
    }
    throw error;
  }
}

export async function fetchCountriesByCodes(codes: string[]): Promise<Country[]> {
  if (!codes || codes.length === 0) return [];
  
  // Filter codes that are not in cache
  const cleanCodes = codes.map(c => c.toUpperCase());
  const uncachedCodes: string[] = [];
  const results: Country[] = [];

  for (const code of cleanCodes) {
    if (cacheByCode[code]) {
      results.push(cacheByCode[code]);
    } else {
      uncachedCodes.push(code);
    }
  }

  if (uncachedCodes.length === 0) {
    return results;
  }

  try {
    const response = await fetchWithRetry(`${BASE_URL}/alpha?codes=${uncachedCodes.join(",")}`);
    const data: Country[] = await response.json();
    
    for (const country of data) {
      cacheByCode[country.cca3.toUpperCase()] = country;
      results.push(country);
    }

    return results;
  } catch (error) {
    console.warn("Batch codes request failed. Attempting to synchronize from general fallback catalog...", error);
    try {
      await fetchAllCountries();
      for (const code of uncachedCodes) {
        if (cacheByCode[code]) {
          results.push(cacheByCode[code]);
        }
      }
      return results;
    } catch (catalogErr) {
      console.error("General catalog sync failed, attempting individual requests, fallback logic:", catalogErr);
      try {
        const promises = uncachedCodes.map(code => fetchCountryByCca3(code).catch(() => null));
        const individualResults = await Promise.all(promises);
        for (const res of individualResults) {
          if (res) results.push(res);
        }
        return results;
      } catch {
        return results;
      }
    }
  }
}
