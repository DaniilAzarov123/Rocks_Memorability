# Rocks Memorability

Online recognition-memory experiments examining how **item distinctiveness** shapes the relationship between **hit rates** and **false-alarm rates**, using real-world rock images as stimuli.

## Overview

A long-standing question in recognition memory is why some items are reliably remembered well (or poorly) regardless of who is tested — so-called "memorability." This project asks a more specific question: what determines the *relationship* between an item's hit rate (*correctly* identified as "old") and its false-alarm rate (*incorrectly* identified as "old")?

Using rock images (from Nosofsky et al., 2018 and Meagher & Nosofsky, 2023) positioned in a multidimensional similarity space, we ran an old/new recognition experiment and modeled item-level responses with the **Hybrid-Similarity Exemplar model** (Nosofsky & Zaki, 2003), which combines:

- **inter-item similarity** — how similar a probe is to *other* studied items, and
- **self-similarity** — how similar a probe is to *its own* memory trace, boosted for items with distinctive features.

**Key findings:**

- For **low-distinctiveness** items, hit rates and false-alarm rates are positively correlated — items that are generally more confusable produce both more hits and more false alarms, as predicted by standard global-familiarity models.
- **Highly distinctive** items break this pattern: they show high hit rates but low false-alarm rates, because their isolation in similarity space suppresses false alarms while a distinctiveness-driven self-match boost raises hits. Including these items attenuates or reverses the overall hit–false-alarm correlation.
- The Hybrid-Similarity model, fit with only four free parameters, reproduces this qualitative pattern; a version with distinctiveness effects turned off does not.
- Split-half reliability analyses confirm that both hit rates and false-alarm rates are highly **stable** across independent groups of participants — but this reliability is **relational** (it depends on an item's position in similarity space) rather than an **intrinsic** property of the image itself.
- The model's known weakness ()it predicts less item-to-item variability in hit rates than what is actually observed) suggests that some **additional recognition mechanism** beyond similarity-to-memory-traces is still missing, particularly for items that *are* in memory.

## Repository Structure

```
Rocks_Memorability/
└── Exp[number_condition]/
    ├── Exp/                          # jsPsych experiment code (runs online via SONA)
    │   ├── Exp[number_condition]_Rocks.html
    │   └── src/
    │       ├── config.js             # Trial timing, stimulus paths, group assignment
    │       ├── instructions.js
    │       ├── utils.js			  # Functions used to run the code
    │       ├── Exp_stim.json         # Stimulus/distinctiveness metadata used at runtime
    │       └── SONA_consent_memorability.html # Written consent to participate in the study
    │
    └── Analysis/                      # Data processing, statistics, and modeling
        ├── Data/                      # Raw per-participant JSON output from jsPsych
        ├── Exp[number_condition]_analysis.ipynb   # Main analysis notebook (see below)
        ├── Exp[number_condition]_analysis.pkl     # Cached analysis variables (dill)
        └── model_parameters_[number_condition].txt   # Fitted model parameters (see below)
```

Rock stimulus images themselves are hosted separately at [Rocks_Database](https://github.com/DaniilAzarov123/Rocks_Database) and loaded at runtime by the experiment.

This structure applies to each of the experiments.

## Analysis Notebook

`Exp1_1rep/Analysis/Exp1_1rep_analysis.ipynb` performs the full pipeline:

1. Loads and concatenates per-participant JSON data from `Data/`.
2. Splits memory-phase and test-phase trials and cleans/types the data.
3. Screens participants on overall accuracy (upper- vs. lower-median hit-minus-false-alarm performance).
4. Computes item-level hit rates and false-alarm rates as a function of distinctiveness (ANOVA, planned comparisons).
5. Computes hit–false-alarm correlations separately for low-distinctiveness items, high-distinctiveness items, and all items combined.
6. Runs split-half reliability analyses (10,000 iterations, Spearman–Brown corrected).
7. Fits the Hybrid-Similarity Exemplar model (full model vs. a reduced model with the distinctiveness terms fixed at zero) via maximum-likelihood estimation, both per-group and pooled.

Fitted parameters (`model_parameters_1cond_1rep.txt`) include the similarity-decay rate (`c`), the inter-item similarity reduction for distinctive items (`alpha`), the self-similarity boost for distinctive items (`beta`), and the response criterion/noise parameter (`k`), reported per group along with NLL, AIC, and BIC.

## Requirements

The analysis notebook uses: `pandas`, `numpy`, `scipy`, `statsmodels`, `matplotlib`, `seaborn`, and `dill`. The online experiment runs on [jsPsych](https://www.jspsych.org/).

```bash
pip install pandas numpy scipy statsmodels matplotlib seaborn dill
```

## References

- Nosofsky, R. M., & Zaki, S. R. (2003). A hybrid-similarity exemplar model for predicting distinctiveness effects in perceptual old-new recognition. *JEP: LMC, 29*(6), 1194.
- Meagher, B. J., & Nosofsky, R. M. (2023). Testing formal cognitive models of classification and old-new recognition in a real-world high-dimensional category domain. *Cognitive Psychology, 145*, 101596.
- Nosofsky, R. M., Sanders, C. A., Meagher, B. J., & Douglas, B. J. (2018). Toward the development of a feature-space representation for a complex natural category domain. *Behavior Research Methods, 50*(2), 530–556.

## Contact

Daniil Azarov — dazarov@iu.edu
