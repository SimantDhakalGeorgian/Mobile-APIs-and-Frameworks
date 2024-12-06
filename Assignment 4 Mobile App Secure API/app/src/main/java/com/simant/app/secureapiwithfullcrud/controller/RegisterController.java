package com.simant.app.secureapiwithfullcrud.controller;

import com.simant.app.secureapiwithfullcrud.api.ApiClient;
import com.simant.app.secureapiwithfullcrud.api.ApiService;
import com.simant.app.secureapiwithfullcrud.models.User;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterController {
    private final ApiService apiService;

    public RegisterController() {
        apiService = ApiClient.getClient().create(ApiService.class);
    }

    public void registerUser(User user, RegisterCallback callback) {
        Call<Void> call = apiService.registerUser(user);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    callback.onSuccess("User registered successfully");
                } else {
                    callback.onError("Failed to register user");
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                callback.onError(t.getMessage());
            }
        });
    }

    public interface RegisterCallback {
        void onSuccess(String message);

        void onError(String error);

        void onUserExists(String message);
    }
}

