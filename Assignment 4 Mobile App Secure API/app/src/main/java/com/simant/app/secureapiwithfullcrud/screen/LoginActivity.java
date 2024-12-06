/**
 * File name: LoginActivity.java
 * Student Name: Simant Dhakal
 * StudentID: 200563270
 * Date: December 6, 2024 */

package com.simant.app.secureapiwithfullcrud.screen;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import com.simant.app.secureapiwithfullcrud.R;
import com.simant.app.secureapiwithfullcrud.controller.LoginController;
import com.simant.app.secureapiwithfullcrud.models.LoginRequest;
import com.simant.app.secureapiwithfullcrud.sharedpreference.SharedPreferenceManager;

public class LoginActivity extends AppCompatActivity {
    private EditText editTextEmail, editTextPassword;
    private Button buttonLogin;
    private LoginController loginController;
    private TextView textViewRegister;
    private SharedPreferenceManager sharedPreferenceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        editTextEmail = findViewById(R.id.editTextEmail);
        editTextPassword = findViewById(R.id.editTextPassword);
        buttonLogin = findViewById(R.id.buttonLogin);

        textViewRegister = findViewById(R.id.txtRegister);
        textViewRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(LoginActivity.this, RegisterActivity.class); // Replace with your Home screen activity
                startActivity(intent);
                finish();
            }
        });

        loginController = new LoginController(getApplicationContext());
        sharedPreferenceManager = new SharedPreferenceManager(this);

        buttonLogin.setOnClickListener(v -> {
            String email = editTextEmail.getText().toString().trim();
            String password = editTextPassword.getText().toString().trim();

            if (email.isEmpty() || password.isEmpty()) {
                Toast.makeText(LoginActivity.this, "Please fill in all fields", Toast.LENGTH_SHORT).show();
            } else {
                performLogin(email, password);
            }
        });
    }

    private void performLogin(String email, String password) {
        LoginRequest request = new LoginRequest(email, password);
        loginController.loginUser(request, new LoginController.LoginCallback() {
            @Override
            public void onSuccess(String message, String token) {
                sharedPreferenceManager.saveToken(token);
                Toast.makeText(LoginActivity.this, message, Toast.LENGTH_SHORT).show();
                navigateToHome();
            }

            @Override
            public void onError(String error) {
                Toast.makeText(LoginActivity.this, error, Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void navigateToHome() {
        Intent intent = new Intent(LoginActivity.this, MainActivity.class); // Replace with your Home screen activity
        startActivity(intent);
        finish();
    }
}
