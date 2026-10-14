# Experiment 2: 1-rep vs. 3-rep (Hits vs. False Alarms by Distinctiveness)

Old/new recognition experiment with real-world rock images. It tests whether **item distinctiveness** moderates the item-wise correlation between **hit rates (H)** and **false-alarm rates (FA)**, and whether the effect grows with **study repetition** (each target studied once vs. three times). This is the main experiment reported in Azarov & Nosofsky, *"On the Relation Between Item-Wise Hits and False Alarms in Recognition Memory: Computational Modeling of the Role of Item Distinctiveness"* (Experiment 1 in the manuscript).

## Design

- **Stimuli:** 100 rock images from the 480-item set (Nosofsky et al., 2018; Meagher & Nosofsky, 2023), split into **Set A** and **Set B**. Each set has 50 items: **8 distinctive** items (high distinctive-feature ratings, isolated in MDS space) and **42 typical** items (low ratings; 3 rocks from each of 14 categories per set).
- **Groups:** Group 1 studies Set A, Group 2 studies Set B. Both groups are tested on all 100 items, so every item is a **target** for one group and a **lure** for the other.
- **Repetition condition (between subjects):** `1_Rep` means each target is shown once during study. `3_Rep` means each target is shown three times, in randomized blocks.
- **Timing:** study images are shown for 2500 ms with their category label, followed by a 1000 ms ISI. At test, probes stay on screen until the participant responds old/new (`L` = yes, `A` = no), followed by 500 ms of corrective feedback.
- **Participants:** 309 IU undergraduates recruited through SONA. The lowest 25% on Hit − FA in each condition × group cell were excluded, which left **232** (1-rep: 65 / 61; 3-rep: 50 / 56 for Group 1 / Group 2).

## Folder Structure

```
Exp2_2conds/
├── Exp/                              # jsPsych experiment (runs online)
│   ├── Exp2_2conds_Rocks.html        # Entry point: open in a browser to run the experiment
│   └── src/
│       ├── config.js                 # Group/condition assignment, timings, sizes, stimulus paths
│       ├── instructions.js           # Instruction screens
│       ├── utils.js                  # Helper functions (trial building, data saving, etc.)
│       ├── Exp_stim.json             # Stimulus list: set, item type, distinctiveness ratings
│       └── SONA_consent_memorability.html  # Consent form
│
└── Analysis/
    ├── Data/                         # Raw per-participant jsPsych output (309 JSON files)
    ├── Exp2_2conds_analysis.ipynb    # Full analysis pipeline
    ├── Exp2_2conds_analysis.pkl      # Cached results (dill); see below
    └── plots/                        # Saved figures (git-ignored)
```

Each participant is randomly assigned to a group and a condition in `config.js`. Data files are named `Group{1,2}_{1,3}_Rep_<subjectID>_<date>_<time>.json`. Rock images load at runtime from [Rocks_Database](https://github.com/DaniilAzarov123/Rocks_Database).

**Run the experiment:**  `LINK`

## Analysis Notebook

`Analysis/Exp2_2conds_analysis.ipynb` runs these steps:

1. **Load & preprocess:** reads all JSON files from `Data/` and splits them into memory-phase and test-phase trials. It labels each item's set (A/B) and type (distinctive/typical).
2. **Subject-level EDA:** computes accuracy, hit/FA rates and d′ (with the Macmillan & Kaplan, 1985 correction) for each subject.
3. **Exclusion:** removes the lowest 25% on Hit − FA within each condition × group cell.
4. **Item-level analysis of H and FA:** fits separate 2 (condition) × 2 (distinctiveness type) × 2 (set) OLS models with cluster-robust SEs clustered on item, tested with Wald F tests. It also runs Holm-corrected post-hoc contrasts and reports partial η².
5. **Split-half reliability:** 10,000 random splits, with Spearman–Brown correction, within and across groups.
6. **H–FA correlations:** correlates item-wise hits from one group with false alarms from the other group. This is done for typical items, distinctive items and all items, per condition × set.
7. **Modeling:** fits the hybrid-similarity exemplar model by maximum likelihood on trial-level data, separately per condition, using the 8-D MDS solution and distinctiveness ratings. The parameters are `c` (sensitivity), `k` (criterion), `α` (inter-item similarity reduction) and `β` (self-similarity boost). Three versions are fitted:
   - `full_model`: all 4 parameters are group-specific (8 in total).
   - `hs_model`: all 4 parameters are shared across groups (pooled; the main model).
   - `base_model`: `α = β = 0`, with `c` and `k` group-specific.
8. **Model evaluation:** compares predicted and observed H/FA, model-predicted H–FA correlations, binomial simulations (10,000 iterations) that add sampling noise to the predicted correlations, and an AIC/BIC comparison.

### Cached results (`.pkl`)

You can skip the slow steps (split-half and optimization) by uncommenting the loading cell at the top of the notebook:

```python
with open("Exp2_2conds_analysis.pkl", "rb") as f:
    globals().update(dill.load(f))
```

The cache contains:

- `data_set`: the raw combined data.
- `filtered_data_test` and `filtered_data_memory`: data after exclusion.
- `df_by_item` and `df_by_item_wide`: item-level H/FA rates.
- `split_half_*_dict`: split-half results.
- `dist_mat_gr1` and `dist_mat_gr2`: test × study MDS distance matrices.
- `distinctiveness_image_id`: distinctiveness ratings by image.
- `optimization_result`, `all_params` and `ic`: model fits, parameters and information criteria.

## Main Findings

- **False alarms:** distinctive lures got far fewer false alarms than typical lures in both conditions (≈ .15 vs. ≈ .50).
- **Hits:** distinctive targets had higher hit rates than typical targets in the **3-rep** condition (+.10, p < .001) but **not** in the 1-rep condition (+.003, p = .92). Repetition raised hits much more for distinctive items (+.13) than for typical items (+.03).
- **H–FA correlations:**
  - **Typical items:** the correlation is positive in every condition and set (r = .46–.62).
  - **All items together:** adding the distinctive items, which sit in the high-H / low-FA corner, cuts the correlation sharply. In 3-rep it is r = .06 / .12 (n.s.) and in 1-rep it is r = .35 / .34.
- **Modeling:** the pooled hybrid-similarity model gives the best BIC and captures the qualitative pattern. Its `β` is larger in 3-rep (.25) than in 1-rep (.17) but is above zero in both. The baseline model (no distinctiveness terms) wrongly predicts *lower* hits for distinctive targets and a strongly positive overall H–FA correlation.
- **Conclusion:** distinctiveness moderates the item-wise H–FA relation, as global-familiarity models with a self-similarity boost predict. Interitem similarity drives the positive H–FA correlation for typical items. Self-similarity raises hits for distinctive items without raising their false alarms.

## Requirements

```bash
pip install pandas numpy scipy statsmodels patsy matplotlib dill
```

The experiment uses [jsPsych](https://www.jspsych.org/) 8.2.2, loaded from unpkg.
