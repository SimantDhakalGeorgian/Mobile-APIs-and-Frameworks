package com.simant.app.secureapiwithfullcrud.screen;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import androidx.appcompat.app.AppCompatActivity;
import com.simant.app.secureapiwithfullcrud.R;

public class AddUpdateRecipeActivity extends AppCompatActivity {
    private EditText etRecipeName, etCuisine, etDifficulty, etCookingTime, etDescription, etIngredients, etPhotoLink;
    private Button btnSave, btnCancel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_update_recipe);

        // Initialize views
        etRecipeName = findViewById(R.id.etRecipeName);
        etCuisine = findViewById(R.id.etCuisine);
        etDifficulty = findViewById(R.id.etDifficulty);
        etCookingTime = findViewById(R.id.etCookingTime);
        etDescription = findViewById(R.id.etDescription);
        etIngredients = findViewById(R.id.etIngredients);
        etPhotoLink = findViewById(R.id.etPhotoLink);
        btnSave = findViewById(R.id.btnSave);
        btnCancel = findViewById(R.id.btnCancel);

        // Get the recipe data from the Intent
        Intent intent = getIntent();
        String recipeName = intent.getStringExtra("recipe_name");
        String cuisine = intent.getStringExtra("cuisine");
        String difficulty = intent.getStringExtra("difficulty");
        int cookingTime = intent.getIntExtra("cooking_time", 0);
        String description = intent.getStringExtra("description");
        String photoLink = intent.getStringExtra("photo_link");
        String ingredients = intent.getStringExtra("ingredients");

        // Set the values to the EditText fields
        etRecipeName.setText(recipeName);
        etCuisine.setText(cuisine);
        etDifficulty.setText(difficulty);
        etCookingTime.setText(String.valueOf(cookingTime));
        etDescription.setText(description);
        etPhotoLink.setText(photoLink);
        etIngredients.setText(ingredients);

        // Handle Save and Cancel button actions
        btnSave.setOnClickListener(v -> saveRecipe());
        btnCancel.setOnClickListener(v -> finish());
    }

    private void saveRecipe() {
        // Code to save the recipe (add/update)
    }
}
