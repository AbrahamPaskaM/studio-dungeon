# Studio Dungeon — Asset Replacement Guide

All dummy/placeholder images are located in the `/assets/dummy/` folder.

To replace dummy images with real photos, place your optimized images in `/assets/` or `/assets/dummy/` and update (or overwrite) the respective files:

| Placeholder File | Section / Spot | Recommended Dimensions | Notes |
| :--- | :--- | :--- | :--- |
| `assets/dummy/hero.jpg` | **Hero Section** (Background / side image) | 1920 × 1080 px (16:9) | Dark, moody tone. CSS applies dark vignette & brutalist overlay. |
| `assets/dummy/about.jpg` | **About Section** (Trainer portrait) | 800 × 1000 px (4:5) | High contrast portrait of Fachrudi. |
| `assets/dummy/gallery-1.jpg` to `gallery-6.jpg` | **Gallery Section** (Brutalist grid) | 800 × 800 px or varied | Workout, barbell, deadlift, and coaching shots. |
| `assets/dummy/testimonial-1.jpg` to `testimonial-3.jpg` | **Testimonials** (Client avatars) | 200 × 200 px (1:1) | Client portrait/avatar. |
| `assets/dummy/location-srikandi.jpg` | **Location Section** (Srikandi Gym Jambangan) | 800 × 500 px (16:10) | Interior equipment / power rack photo. |
| `assets/dummy/location-homevisit.jpg` | **Location Section** (Home Visit) | 800 × 500 px (16:10) | Mobile gear / home workout setting. |

### Global Image Treatment
Every image on the site automatically inherits a consistent gothic-brutalist treatment in CSS (`filter: grayscale(80%) contrast(115%) brightness(90%)` with a red accent border/tint on hover), so any future real photos will instantly look cohesive with the underground brand.
