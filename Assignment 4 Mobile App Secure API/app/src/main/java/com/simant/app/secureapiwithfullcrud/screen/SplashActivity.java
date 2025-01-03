/**
 * File name: SplashActivity.java
 * Student Name: Simant Dhakal
 * StudentID: 200563270
 * Date: December 6, 2024 */

package com.simant.app.secureapiwithfullcrud.screen;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import androidx.appcompat.app.AppCompatActivity;

import com.simant.app.secureapiwithfullcrud.R;
import com.simant.app.secureapiwithfullcrud.sharedpreference.SharedPreferenceManager;

public class SplashActivity extends AppCompatActivity {
    private static final int SPLASH_DELAY = 2000; // 2 seconds delay

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);

        // Initialize SharedPreferenceManager
        SharedPreferenceManager sharedPreferenceManager = new SharedPreferenceManager(this);

        // Delay for SPLASH_DELAY and then check token
        new Handler().postDelayed(() -> {
            String token = sharedPreferenceManager.getToken();
            Intent intent;
            if (token != null && !token.isEmpty()) {
                // Token exists, go to MainActivity
                intent = new Intent(SplashActivity.this, MainActivity.class);
            } else {
                // Token does not exist, go to LandingActivity
                intent = new Intent(SplashActivity.this, LandingActivity.class);
            }
//            intent = new Intent(SplashActivity.this, LandingActivity.class);
            startActivity(intent);
            finish(); // Close SplashActivity
        }, SPLASH_DELAY);
    }
}
