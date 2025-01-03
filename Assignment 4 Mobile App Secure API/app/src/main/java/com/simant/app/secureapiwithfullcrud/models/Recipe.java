/**
 * File name: Recipe.java
 * Student Name: Simant Dhakal
 * StudentID: 200563270
 * Date: December 6, 2024 */

package com.simant.app.secureapiwithfullcrud.models;

import java.util.List;

public class Recipe {
    private String _id; // Changed from id to _id to match the JSON field
    private String recipeName;
    private List<String> ingredients;
    private int cookingTime;
    private String difficulty;
    private String cuisine;
    private String description;
    private String photoLink;
    private double averageRating;

    // Constructor
    public Recipe(String _id, String recipeName, List<String> ingredients, int cookingTime,
                  String difficulty, String cuisine, String description, String photoLink,
                  double averageRating) {
        this._id = _id;
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
    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
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