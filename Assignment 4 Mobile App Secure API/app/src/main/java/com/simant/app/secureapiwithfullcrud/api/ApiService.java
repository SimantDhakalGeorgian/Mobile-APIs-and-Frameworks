package com.simant.app.secureapiwithfullcrud.api;

import com.simant.app.secureapiwithfullcrud.models.LoginRequest;
import com.simant.app.secureapiwithfullcrud.models.LoginResponse;
import com.simant.app.secureapiwithfullcrud.models.Recipe;
import com.simant.app.secureapiwithfullcrud.models.User;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ApiService {
    @POST("auth/register")
    Call<Void> registerUser(@Body User user);

    @POST("auth/login")
    Call<LoginResponse> loginUser(@Body LoginRequest loginRequest);

    // No need to manually pass the Authorization token here
    @GET("recipe/")
    Call<List<Recipe>> getRecipes(@Header("Authorization") String token);

    @DELETE("recipe/{id}")
    Call<Void> deleteRecipe(
            @Header("Authorization") String authorizationToken,
            @Path("id") String recipeId
    );
}
