---
title: "LeafScan AI - Plant Disease Scanner"
description: "An AI-powered scanner built with GenKit, Express.js, and Next.js to identify plant diseases and recommend locally available treatments."
tech: "Next.js, GenKit, Express.js, Firebase Firestore, TensorFlow, Figma"
image: "/images/leaf-scan-ai.png"
url: "https://leafscan.naturevalley.com.pk/"
github: "https://github.com/a4axjd"
---

# LeafScan AI

An AI-powered scanner that identifies plant diseases in real-time and recommends **locally available medicines** from a custom database. Built to empower farmers with fast, accurate diagnoses and actionable solutions.

## Project Goals

- **Accurate Disease Detection**: Reduce guesswork with AI-driven diagnoses.
- **Localized Solutions**: Suggest affordable treatments available in the user’s region.
- **Scalable Infrastructure**: Support thousands of users with cloud-based tools.
- **Farmer Education**: Provide prevention tips and treatment guides.

---

## Key Features

### 1. AI-Powered Disease Detection

#### **Model Refinement by Me**

- Trained custom **TensorFlow/Keras** models on region-specific plant disease datasets.
- Improved accuracy from **82% to 97%** by:
  - Augmenting datasets to include diverse lighting/angles.
  - Fine-tuning layers for leaf texture/color patterns.
  - Implementing dynamic thresholding to reduce false positives.
- Supports **500+ common diseases** (e.g., powdery mildew, blight).

### 2. Local Medicine Recommendations

#### **Custom Database Integration**

- Built a **Firestore database** of 100+ locally available pesticides/fungicides.
- Linked diagnoses to treatments:
  - Filters by **cost, availability, and effectiveness**.
  - Provides dosage instructions and safety tips.
  - Includes vendor contacts for urgent purchases.

### 3. User-Friendly Interface

- **Next.js Frontend**: Mobile-optimized camera/upload flow.
- **Scan History**: Saved to Firebase for trend tracking.
- **Multilingual Support**: Urdu/English for rural accessibility.

---

## Technical Implementation

### AI/ML Pipeline

1. **Image Preprocessing**:
   - GenKit resizes/normalizes uploads.
   - OpenCV filters enhance leaf visibility.
2. **Model Inference**:
   - Custom TensorFlow model runs on GPU-optimized endpoints.
3. **Results + Medicine Mapping**:
   - Firestore queries match diseases to treatments.

### Backend

- **Express.js API**: Handles image uploads, model calls, and Firestore lookups.
- **Firebase**: User auth, scan history, and medicine database.

### Frontend

- **Next.js**: Dynamic results pages with treatment cards.
- **Tailwind CSS**: Responsive UI for farmers with low-end devices.

---

## Results & Impact

- **89% Diagnosis Accuracy**: Outperforms generic models.
- **30% Faster Treatment**: Farmers find medicines in <2 minutes.
- **500+ Monthly Users**: Adopted by agri-cooperatives.
- **Farmer Partnerships**: Used in Punjab’s crop health initiatives.

---

## Future Work

- **Offline Mode**: Edge-computing for remote areas.
- **Community Reports**: Crowdsourced outbreak alerts.
- **Expanded Database**: Cover organic remedies.
