package com.simant.app.secureapiwithfullcrud.models;

public class Recipe {
    private String recipeName;
    private String cuisine;
    private double averageRating;
    private String photoLink;

    // Constructor
    public Recipe(String recipeName, String cuisine, double averageRating, String photoLink) {
        this.recipeName = recipeName;
        this.cuisine = cuisine;
        this.averageRating = averageRating;
        this.photoLink = photoLink;
    }

    // Getter and Setter methods
    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }
}
