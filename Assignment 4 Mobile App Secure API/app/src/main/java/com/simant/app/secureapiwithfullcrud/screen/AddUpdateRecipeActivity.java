package com.simant.app.secureapiwithfullcrud.screen;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.simant.app.secureapiwithfullcrud.R;
import com.simant.app.secureapiwithfullcrud.api.ApiClient;
import com.simant.app.secureapiwithfullcrud.api.ApiService;
import com.simant.app.secureapiwithfullcrud.models.AddRecipe;
import com.simant.app.secureapiwithfullcrud.sharedpreference.SharedPreferenceManager;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddUpdateRecipeActivity extends AppCompatActivity {
    private EditText etRecipeName, etCuisine, etCookingTime, etDescription, etIngredients, etPhotoLink, etRating;
    private AutoCompleteTextView etDifficulty;  // Use AutoCompleteTextView for difficulty
    private Button btnSave, btnCancel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_update_recipe);

        // Initialize views
        etRecipeName = findViewById(R.id.etRecipeName);
        etCuisine = findViewById(R.id.etCuisine);
        etDifficulty = findViewById(R.id.etDifficulty);  // Reference to AutoCompleteTextView
        etCookingTime = findViewById(R.id.etCookingTime);
        etDescription = findViewById(R.id.etDescription);
        etIngredients = findViewById(R.id.etIngredients);
        etPhotoLink = findViewById(R.id.etPhotoLink);
        etRating = findViewById(R.id.etAverageRating);
        btnSave = findViewById(R.id.btnSave);
        btnCancel = findViewById(R.id.btnCancel);

        // Set up difficulty options in AutoCompleteTextView
        String[] difficultyOptions = {"Easy", "Medium", "Hard"};
        ArrayAdapter<String> difficultyAdapter = new ArrayAdapter<>(this, android.R.layout.simple_dropdown_item_1line, difficultyOptions);
        etDifficulty.setAdapter(difficultyAdapter);

        // Get the recipe data from the Intent
        Intent intent = getIntent();
        String recipeName = intent.getStringExtra("recipe_name");
        String cuisine = intent.getStringExtra("cuisine");
        String difficulty = intent.getStringExtra("difficulty");
        int cookingTime = intent.getIntExtra("cooking_time", 0);
        String description = intent.getStringExtra("description");
        String photoLink = intent.getStringExtra("photo_link");
        String ingredients = intent.getStringExtra("ingredients");
        String rating = intent.getStringExtra("rating");

        // Set the values to the EditText fields
        etRecipeName.setText(recipeName);
        etCuisine.setText(cuisine);
        etDifficulty.setText(difficulty);
        etCookingTime.setText(String.valueOf(cookingTime));
        etDescription.setText(description);
        etPhotoLink.setText(photoLink);
        etIngredients.setText(ingredients);
        etRating.setText(rating);

        // Handle Save and Cancel button actions
        btnSave.setOnClickListener(v -> saveRecipe());
        btnCancel.setOnClickListener(v -> finish());
    }

    private void saveRecipe() {
        // Get the data from EditText fields
        String recipeName = etRecipeName.getText().toString();
        String cuisine = etCuisine.getText().toString();
        String difficulty = etDifficulty.getText().toString();
        int cookingTime;
        try {
            cookingTime = Integer.parseInt(etCookingTime.getText().toString());
        } catch (NumberFormatException e) {
            Toast.makeText(this, "Invalid cooking time", Toast.LENGTH_SHORT).show();
            return;
        }
        String description = etDescription.getText().toString();
        String photoLink = etPhotoLink.getText().toString();
        String ingredientsText = etIngredients.getText().toString(); // Get ingredients text
        String averageRatinging = etRating.getText().toString();

        // Split ingredients into a list
        String[] ingredientsArray = ingredientsText.split(",");
        List<String> ingredientsList = Arrays.asList(ingredientsArray);

        // Validate inputs
        if (recipeName.isEmpty() || cuisine.isEmpty() || difficulty.isEmpty() || description.isEmpty() || ingredientsText.isEmpty()) {
            Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show();
            return;
        }

        // Create the Recipe object to send to the API
        AddRecipe addRecipe = new AddRecipe(recipeName, ingredientsList, cookingTime, difficulty, cuisine, description, photoLink, Float.valueOf(averageRatinging.toString()));

        // Get the authorization token from SharedPreferences
        SharedPreferenceManager sharedPreferenceManager = new SharedPreferenceManager(this);
        String token = sharedPreferenceManager.getToken();

        // Make the API call to create the recipe
        ApiService apiService = ApiClient.getClient(this).create(ApiService.class);
        Call<AddRecipe> call = apiService.createRecipe("Bearer " + token, addRecipe);

        // Execute the API call asynchronously
        call.enqueue(new Callback<AddRecipe>() {
            @Override
            public void onResponse(Call<AddRecipe> call, Response<AddRecipe> response) {
                if (response.isSuccessful()) {
                    // Handle successful response
                    Toast.makeText(AddUpdateRecipeActivity.this, "Recipe saved successfully", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(AddUpdateRecipeActivity.this, MainActivity.class);
                    startActivity(intent);
                    finish();
                } else {
                    // Handle unsuccessful response
                    Toast.makeText(AddUpdateRecipeActivity.this, "Error: " + response.message(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<AddRecipe> call, Throwable t) {
                // Handle failure (e.g., network error)
                Toast.makeText(AddUpdateRecipeActivity.this, "Network error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

}