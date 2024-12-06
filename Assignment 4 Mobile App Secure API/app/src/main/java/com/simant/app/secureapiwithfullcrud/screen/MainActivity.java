package com.simant.app.secureapiwithfullcrud.screen;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.simant.app.secureapiwithfullcrud.R;
import com.simant.app.secureapiwithfullcrud.adapter.RecipeAdapter;
import com.simant.app.secureapiwithfullcrud.api.ApiClient;
import com.simant.app.secureapiwithfullcrud.api.ApiService;
import com.simant.app.secureapiwithfullcrud.models.Recipe;
import com.simant.app.secureapiwithfullcrud.sharedpreference.SharedPreferenceManager;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    private RecyclerView recyclerView;
    private RecipeAdapter adapter;
    FloatingActionButton floatingActionButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        recyclerView = findViewById(R.id.recipeRecyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        floatingActionButton = findViewById(R.id.fab);
        floatingActionButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, AddUpdateRecipeActivity.class);
                startActivity(intent);
            }
        });

        fetchRecipes();
    }

    private void fetchRecipes() {
        // Get the token from shared preferences
        SharedPreferenceManager preferenceManager = new SharedPreferenceManager(this);
        String token = preferenceManager.getToken();

        if (token == null) {
            Toast.makeText(this, "Token not found. Please log in.", Toast.LENGTH_SHORT).show();
            return;
        }

        // Create the ApiService using ApiClient
        ApiService apiService = ApiClient.getClient(this).create(ApiService.class);

        // Call the API to fetch recipes with the Authorization token
        Call<List<Recipe>> call = apiService.getRecipes(token);

        call.enqueue(new Callback<List<Recipe>>() {
            @Override
            public void onResponse(Call<List<Recipe>> call, Response<List<Recipe>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    // Get the list of recipes from the response
                    List<Recipe> recipes = response.body();

                    // Initialize the adapter with the recipes list
                    adapter = new RecipeAdapter(MainActivity.this, recipes, apiService);

                    // Set the adapter for the RecyclerView
                    recyclerView.setAdapter(adapter);
                } else {
                    Log.e(TAG, "Failed to fetch recipes: " + response.code());
                    Toast.makeText(MainActivity.this, "Failed to fetch recipes", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Recipe>> call, Throwable t) {
                Log.e(TAG, "Error fetching recipes", t);
                Toast.makeText(MainActivity.this, "Error fetching recipes", Toast.LENGTH_SHORT).show();
            }
        });
    }
}

