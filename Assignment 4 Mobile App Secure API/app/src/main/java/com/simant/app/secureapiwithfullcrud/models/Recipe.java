package com.simant.app.secureapiwithfullcrud.models;

import java.util.List;

public class Recipe {
    private String id; // Added for unique identifier
    private String recipeName;
    private List<String> ingredients; // Changed to a list of ingredients
    private int cookingTime; // Cooking time in minutes
    private String difficulty; // Difficulty level of the recipe
    private String cuisine;
    private String description; // Added description for recipe details
    private String photoLink;
    private double averageRating;

    // Constructor
    public Recipe(String id, String recipeName, List<String> ingredients, int cookingTime,
                  String difficulty, String cuisine, String description, String photoLink,
                  double averageRating) {
        this.id = id;
        this.recipeName = recipeName;
        this.ingredients = ingredients;
        this.cookingTime = cookingTime;
        this.difficulty = difficulty;
        this.cuisine = cuisine;
        this.description = description;
        this.photoLink = photoLink;
        this.averageRating = averageRating;
    }

    // Getter and Setter methods
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public int getCookingTime() {
        return cookingTime;
    }

    public void setCookingTime(int cookingTime) {
        this.cookingTime = cookingTime;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }
}
