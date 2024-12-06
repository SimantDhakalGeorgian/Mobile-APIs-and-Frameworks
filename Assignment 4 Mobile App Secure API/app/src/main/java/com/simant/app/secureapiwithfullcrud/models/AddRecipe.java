package com.simant.app.secureapiwithfullcrud.models;

public class AddRecipe {
    private String recipeName;
    private String cuisine;
    private String difficulty;
    private int cookingTime;
    private String description;
    private String ingredients;
    private String photoLink;

    // Constructor
    public AddRecipe(String recipeName, String cuisine, String difficulty, int cookingTime,
                  String description, String ingredients, String photoLink) {
        this.recipeName = recipeName;
        this.cuisine = cuisine;
        this.difficulty = difficulty;
        this.cookingTime = cookingTime;
        this.description = description;
        this.ingredients = ingredients;
        this.photoLink = photoLink;
    }

    // Getters and setters
    public String getRecipeName() { return recipeName; }
    public void setRecipeName(String recipeName) { this.recipeName = recipeName; }

    public String getCuisine() { return cuisine; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public int getCookingTime() { return cookingTime; }
    public void setCookingTime(int cookingTime) { this.cookingTime = cookingTime; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIngredients() { return ingredients; }
    public void setIngredients(String ingredients) { this.ingredients = ingredients; }

    public String getPhotoLink() { return photoLink; }
    public void setPhotoLink(String photoLink) { this.photoLink = photoLink; }
}

