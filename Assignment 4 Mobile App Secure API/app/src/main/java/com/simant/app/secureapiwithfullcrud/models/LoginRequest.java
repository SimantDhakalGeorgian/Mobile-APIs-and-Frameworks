/**
 * File name: LoginRequest.java
 * Student Name: Simant Dhakal
 * StudentID: 200563270
 * Date: December 6, 2024 */

package com.simant.app.secureapiwithfullcrud.models;

public class LoginRequest {
    private String email;
    private String password;

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}