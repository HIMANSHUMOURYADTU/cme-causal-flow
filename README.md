# ☀ CME-CausalFlow: Causal Discovery & Neural ODE Pipeline for Halo CME Detection

CME-CausalFlow is a novel pipeline that fuses *causal inference* and *Neural Ordinary Differential Equations (Neural ODEs)* to model the solar wind as a continuous dynamical system. It detects *Halo Coronal Mass Ejection (CME)* events by identifying disruptions in causal solar wind flow using data from the *SWIS-ASPEX* instrument onboard ISRO's Aditya-L1 mission.

---

## 🚀 Demo

🧪 Try the live version: [Visit Live Demo](https://cme-causal-flow.vercel.app/)  
🎥 3D visualizations | Interactive Causal Graph | Flow Divergence Maps | CME Prediction Output

---

## 📌 Project Highlights

- 🔁 *Causal Graph Discovery* using PC Algorithm & Granger Causality
- 🧠 *Neural ODE Modeling* of solar plasma flow with physics-aware constraints
- ⚠ *Anomaly Detection* via divergence from learned flow fields
- 📈 *Bayesian Uncertainty Quantification* for confidence scoring
- 📊 Interactive Dashboard: Causal Graph + 3D Trajectory + Heatmap Visuals
- 🔄 Accepts 6 daily .cdf files from TH1, TH2, and BLK (v01 & v02)

---

## 🧬 Architecture Overview

```text
 Raw Data (CDF) ──► Feature Extraction ──► Causal Discovery ──► Neural ODE Flow
                                      │                          │
                                      ▼                          ▼
                              Divergence Detector        Bayesian Inference
                                      │                          │
                                      ▼                          ▼
                              CME Classification         Visualization Dashboard
