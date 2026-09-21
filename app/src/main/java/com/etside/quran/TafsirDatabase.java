package com.etside.quran;

import androidx.room.Dao;
import androidx.room.Database;
import androidx.room.Query;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import android.content.Context;
import java.util.List;

// Entities
@androidx.room.Entity(tableName = "surahs")
class Surah {
    @androidx.room.PrimaryKey public int id;
    public String ar, en, bn;
    public int verses;
    public String type;
}

@androidx.room.Entity(tableName = "verses")
class Verse {
    @androidx.room.PrimaryKey(autoGenerate = true) public int id;
    public int surah_id, ayah_num;
    public String ar, en, bn;
}

@Dao
interface SurahDao {
    @Query("SELECT * FROM surahs ORDER BY id")
    List<Surah> getAll();
    @Query("SELECT * FROM surahs WHERE id = :id")
    Surah getById(int id);
    @Query("SELECT * FROM verses WHERE surah_id = :surahId ORDER BY ayah_num")
    List<Verse> getVerses(int surahId);
    @Query("SELECT * FROM verses WHERE en LIKE '%' || :q || '%' OR bn LIKE '%' || :q || '%' LIMIT 50")
    List<Verse> search(String q);
}

@Database(entities = {Surah.class, Verse.class}, version = 1, exportSchema = false)
public abstract class TafsirDatabase extends RoomDatabase {
    public abstract SurahDao surahDao();
    private static volatile TafsirDatabase INSTANCE;
    public static TafsirDatabase get(Context ctx) {
        if (INSTANCE == null) {
            synchronized (TafsirDatabase.class) {
                if (INSTANCE == null) {
                    INSTANCE = Room.databaseBuilder(ctx.getApplicationContext(),
                            TafsirDatabase.class, "tafsir.db")
                            .createFromAsset("databases/tafsir.db.gz")
                            // Room will handle gzip? If not, use SQLiteAssetHelper to copy manually
                            .fallbackToDestructiveMigration()
                            .build();
                }
            }
        }
        return INSTANCE;
    }
}
