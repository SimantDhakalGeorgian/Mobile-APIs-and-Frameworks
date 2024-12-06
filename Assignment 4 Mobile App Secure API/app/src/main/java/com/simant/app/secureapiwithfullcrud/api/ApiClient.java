package com.simant.app.secureapiwithfullcrud.api;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ApiClient {
    //  private static final String BASE_URL = "http://localhost:3000/api/";
    //  private static final String BASE_URL = "http://10.0.2.2:3000/api/";
    private static final String BASE_URL = "http://192.168.2.31:3000/api/";
    public static final String IMAGE_URL = "http://192.168.2.31:3000";
    private static Retrofit retrofit;

    public static Retrofit getClient() {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit;
    }
}
