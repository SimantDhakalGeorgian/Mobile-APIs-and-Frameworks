package com.simant.app.secureapiwithfullcrud.screen;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.simant.app.secureapiwithfullcrud.R;
import com.simant.app.secureapiwithfullcrud.controller.RegisterController;
import com.simant.app.secureapiwithfullcrud.models.User;

public class RegisterActivity extends AppCompatActivity {
    private EditText etFullName, etEmail, etPassword;
    private Button btnRegister, btnMyCancel;
    private RegisterController registerController;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);

        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        btnMyCancel = findViewById(R.id.btnCancel);
        btnMyCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate to LoginActivity
                Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(intent);
                finish();
            }
        });

        etFullName = findViewById(R.id.etFullName);
        etEmail = findViewById(R.id.etEmail);
        etPassword = findViewById(R.id.etPassword);
        btnRegister = findViewById(R.id.btnRegister);

        registerController = new RegisterController(getApplicationContext());

        btnRegister.setOnClickListener(view -> {
            String fullname = etFullName.getText().toString().trim();
            String email = etEmail.getText().toString().trim();
            String password = etPassword.getText().toString().trim();

            if (fullname.isEmpty() || email.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "All fields are required", Toast.LENGTH_SHORT).show();
            } else {
                User user = new User(fullname, email, password);
                registerController.registerUser(user, new RegisterController.RegisterCallback() {
                    @Override
                    public void onSuccess(String message) {
                        Toast.makeText(RegisterActivity.this, message, Toast.LENGTH_SHORT).show();
                        // Handle successful registration, e.g., navigate to the Login screen
                        // Navigate to LoginActivity
                        Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                        startActivity(intent);
                        finish();
                    }

                    @Override
                    public void onError(String error) {
                        Toast.makeText(RegisterActivity.this, error, Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onUserExists(String message) { // Handle "User already exists"
                        Toast.makeText(RegisterActivity.this, message, Toast.LENGTH_SHORT).show();
                        // Navigate back to the Login screen
                        startActivity(new Intent(RegisterActivity.this, LoginActivity.class));
                        finish();
                    }
                });
            }
        });
    }

}
