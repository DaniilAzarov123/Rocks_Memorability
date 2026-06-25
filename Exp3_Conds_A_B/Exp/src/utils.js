// utils.js

// Device check (make sure the participant is using a non-mobile device in fullscreen mode)
let device_check = {
  type: jsPsychBrowserCheck,
  inclusion_function: (data) => !(data.mobile || !data.fullscreen),
  exclusion_message: (data) => {
    return (
    `<div style="max-width: ${spacing_answers*2}px; margin: auto; 
    font-size: ${instructions_font_size}px; line-height: 1.5;">
      <p>
        Please use a desktop or laptop to complete this experiment. 
        Ensure your computer can switch to fullscreen mode.
      </p>
      <p>
        If you believe this is an error, try refreshing the page.
        If the issue persists, please contact the experimenter.
      </p>
    </div>`
    );
  }
};

// Function to check consent
let check_consent = function(elem) {
  if (document.getElementById('consent_checkbox').checked) {
    return true;
  }
  else {
    alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study'.");
    return false;
  }
  return false;
};

// Check consent (the trial itself)
let consentTrial = {
  type:jsPsychExternalHtml,
  url: consent_html,
  cont_btn: "start",
  check_fn: check_consent
};

// Run Exp in the fullscreen mode
let enter_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  on_start: function() {
    // Hide progress bar
    var progressBar = document.querySelector('#jspsych-progressbar-container');
    if (progressBar) {
        progressBar.style.display = 'none';
    }
  }
};
let exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  delay_after: 0,
  on_start: function() {
    // Hide progress bar
    var progressBar = document.querySelector('#jspsych-progressbar-container');
    if (progressBar) {
        progressBar.style.display = 'none';
    }
  }
};

// Update progress bar with text, height, color, etc.
function updateProgressBar(progress, text) {
  // Update progress value
  jsPsych.progressBar.progress = progress;
  // Get the progress bar container
  var progress_bar = document.querySelector('#jspsych-progressbar-container');
  
  if (progress_bar) {
    var span = progress_bar.querySelector('span');

    // Set text in <span>
    if (span) {
      span.textContent = text;
      span.style.fontSize = "16px";
    }

    // Outer bar styling (contours)
    var outer_bar = progress_bar.querySelector('#jspsych-progressbar-outer');
    if (outer_bar) {
      outer_bar.style.border = "3px solid grey"; // border color
      outer_bar.style.borderRadius = "12px"; // "roundness" of the bar
      outer_bar.style.boxShadow = "0 0 6px rgba(0,0,0,0.4)"; // shadow
      outer_bar.style.height = "25px";
      outer_bar.style.overflow = "hidden"; // clip inner bar
    }

    // Inner bar styling (filling)
    var inner_bar = progress_bar.querySelector('#jspsych-progressbar-inner');
    if (inner_bar) {
      inner_bar.style.borderRadius = "8px 8px 8px 8px"; // top-left, top-right, bottom-right, bottom-left
      inner_bar.style.backgroundColor = "rgba(76, 175, 80, 0.7)"; // green with transparency (70% opacity)
    }
  }
}

// Break memory phase into chunks (so that the computer doesn't go to sleep)
function chunkArray(array, size) {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
