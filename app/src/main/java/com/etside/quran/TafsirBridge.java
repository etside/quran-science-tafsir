package com.etside.quran;

import android.webkit.JavascriptInterface;
import android.content.Context;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * WebView bridge: exposes DB queries to JavaScript via @JavascriptInterface
 * Usage in JS: window.TafsirBridge.search("rahman")
 */
public class TafsirBridge {
    private final TafsirDatabase db;
    public TafsirBridge(Context ctx) {
        this.db = TafsirDatabase.get(ctx);
    }

    @JavascriptInterface
    public String getSurah(int id) {
        try {
            Surah s = db.surahDao().getById(id);
            if (s == null) return "{}";
            JSONObject o = new JSONObject();
            o.put("id", s.id); o.put("ar", s.ar); o.put("en", s.en); o.put("bn", s.bn);
            return o.toString();
        } catch (Exception e) { return "{\"error\":\"" + e.getMessage() + "\"}"; }
    }

    @JavascriptInterface
    public String search(String q) {
        try {
            JSONArray arr = new JSONArray();
            for (Verse v : db.surahDao().search(q)) {
                JSONObject o = new JSONObject();
                o.put("surah_id", v.surah_id); o.put("ayah_num", v.ayah_num);
                o.put("en", v.en); o.put("bn", v.bn);
                arr.put(o);
            }
            return arr.toString();
        } catch (Exception e) { return "[]"; }
    }

    @JavascriptInterface
    public String getVerses(int surahId) {
        try {
            JSONArray arr = new JSONArray();
            for (Verse v : db.surahDao().getVerses(surahId)) {
                JSONObject o = new JSONObject();
                o.put("ayah_num", v.ayah_num); o.put("en", v.en);
                arr.put(o);
            }
            return arr.toString();
        } catch (Exception e) { return "[]"; }
    }
}
