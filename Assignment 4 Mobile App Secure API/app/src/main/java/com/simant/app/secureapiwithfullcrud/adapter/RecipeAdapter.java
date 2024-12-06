package com.simant.app.secureapiwithfullcrud.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.squareup.picasso.Picasso;

import java.util.List;

public class RecipeAdapter extends RecyclerView.Adapter<RecipeAdapter.RecipeViewHolder> {
    private final Context context;
    private final List<Recipe> recipeList;

    public RecipeAdapter(Context context, List<Recipe> recipeList) {
        this.context = context;
        this.recipeList = recipeList;
    }

    @NonNull
    @Override
    public RecipeViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_recipe, parent, false);
        return new RecipeViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull RecipeViewHolder holder, int position) {
        Recipe recipe = recipeList.get(position);
        holder.tvRecipeName.setText(recipe.getRecipeName());
        holder.tvCuisine.setText(recipe.getCuisine());
        holder.tvRating.setText(String.valueOf(recipe.getAverageRating()));

        Picasso.get()
                .load(recipe.getPhotoLink())
                .into(holder.ivPhoto);
    }

    @Override
    public int getItemCount() {
        return recipeList.size();
    }

    public static class RecipeViewHolder extends RecyclerView.ViewHolder {
        TextView tvRecipeName, tvCuisine, tvRating;
        ImageView ivPhoto;

        public RecipeViewHolder(@NonNull View itemView) {
            super(itemView);
            tvRecipeName = itemView.findViewById(R.id.tvRecipeName);
            tvCuisine = itemView.findViewById(R.id.tvCuisine);
            tvRating = itemView.findViewById(R.id.tvRating);
            ivPhoto = itemView.findViewById(R.id.ivPhoto);
        }
    }
}

