package com.simant.app.secureapiwithfullcrud.controller;

import com.simant.app.secureapiwithfullcrud.api.ApiClient;
import com.simant.app.secureapiwithfullcrud.api.ApiService;
import com.simant.app.secureapiwithfullcrud.models.LoginRequest;
import com.simant.app.secureapiwithfullcrud.models.LoginResponse;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginController {
    private final ApiService apiService;

    public LoginController() {
        apiService = ApiClient.getClient().create(ApiService.class);
    }

    public void loginUser(LoginRequest request, LoginCallback callback) {
        Call<LoginResponse> call = apiService.loginUser(request);
        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    callback.onSuccess(response.body().getMessage(), response.body().getToken());
                } else {
                    callback.onError("Invalid credentials or server error");
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                callback.onError(t.getMessage());
            }
        });
    }

    public interface LoginCallback {
        void onSuccess(String message, String token);
        void onError(String error);
    }
}

