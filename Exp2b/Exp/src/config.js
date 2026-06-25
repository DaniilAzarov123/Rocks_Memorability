// config.js

/* Randomly assign a participant to a group
Depending on the group, certain images will be designated as targets or foils */
const group = Math.random() < 0.5 ? "Group1" : "Group2"; 

// Date
const full_date = new Date().toISOString();  // Full date and time (for data saving)
const date = full_date.split("T")[0]; // Date only (for data saving)
// Note the time is in UTC
const time = full_date.split("T")[1].split(".")[0]; // Time only (for data saving)
// Replace all ":" with "-"
const safe_time = time.replaceAll(":", "-");  // "16:25:32" --> "16-25-32"

// Durations
const ISI = 1000; // ms
const image_duration = 2500; 
const feedback_duration = 500;
const memory_phase_chunk_size = 25; // Number of images in each chunk of the memory phase
const study_phase_repeats = 3; // How many times to repeat the study phase (1 = once, 2 = twice, etc.)

// Screen dimensions (in CSS pixels, not physical pixels!)
const img_size = 300; // image size (pixels)
const fix_cross_size = 50; // fixation cross size
const feedback_font_size = 50; // for feedback
const question_font_size = 35; // for questions under images
const instructions_font_size = 20; // for instructions
const spacing_answers = 380; // spacing between "A - NO" and "L - YES"

const consent_html = 'src/SONA_consent_memorability.html';
const distinct_ratings = 'src/Exp2_dataset.json';
const rocks_database = 'https://raw.githubusercontent.com/DaniilAzarov123/Rocks_Database/main/Rocks480/';