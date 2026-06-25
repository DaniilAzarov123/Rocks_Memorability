// instructions.js

// Instructions
let instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: (
    `<div style="max-width: ${spacing_answers*2}px; margin: auto; font-size: ${instructions_font_size}px; line-height: 1.5;">
      <h1 style="text-align:center; font-size: ${instructions_font_size*1.5}px;">Instructions</h1>
      <p>
        Welcome to the study on <b>visual memory</b>. This experiment consists of <b>two phases</b>: 
        a <b>study phase</b> and a <b>test phase</b>.
      </p>
      <p>
        In the study phase, you will see a series of rock images along with their category labels.
        The images will appear one at a time.
        <b>Your task</b> is to learn the categories to which the rock images belong 
        and to remember each image as accurately as possible.
      </p> 
      <p>
        Note that we will repeat the study phase <b>${study_phase_repeats} times</b>, 
        so you will have multiple opportunities to see and remember each image.
      </p>
      <p>
        After the study phase, <b>your memory will be tested</b>. 
        Additional instructions for the test phase will be provided at that time.
      </p>
      <p>
        If your computer has multiple <b>language settings</b> (e.g., English and another language),
        please make sure it is set to English before starting.
      </p>
      <p>
        You can track your progress using the <b>completion bar</b> at the top of the screen. 
        Please note that the bar will refresh when the test phase begins 
        to give you an accurate sense of your progress in both phases.
      </p> 
      <p>
        Press the button below when you are ready to begin.
      </p>
    </div>`
    ),
  choices: ["Begin Study Phase"],
  on_start: function() {
        // Hide progress bar
        var progressBar = document.querySelector('#jspsych-progressbar-container');
        if (progressBar) {
            progressBar.style.display = 'none';
        }
    },
  on_finish: function() {
      // Show progress bar again and set it to 0
      var progressBar = document.querySelector('#jspsych-progressbar-container');
      if (progressBar) {
          progressBar.style.display = 'block';
      }
      updateProgressBar(0, '');
  }
};

// Instructions between the study and test phases
let between_phases = {
  type: jsPsychHtmlButtonResponse,
  stimulus: (
    `<div style="max-width: ${spacing_answers*2}px; margin: auto; font-size: ${instructions_font_size}px; line-height: 1.5;">
      <h1 style="text-align:center; font-size: ${instructions_font_size*1.5}px;">Instructions for the Test Phase</h1>
      <p>
        The study phase is now complete.
      </p>
      <p>
        In the test phase, you will again see a series of rock images. 
        Some will be ones you saw before - during the study phase, while others will be new.  
        <b>Your task</b> is to decide whether you have seen each image before by pressing the corresponding key on your keyboard:<br><br>
          <b>A</b> - NO (you did not see this image before)<br>
          <b>L</b> - YES (you saw this image before)<br><br>
        The test will proceed at your own pace. You will receive feedback after each response.  
        Please try to respond <b>as accurately as possible</b>.
      </p>
      <p>
        <b>Reminder:</b> If your computer has multiple language settings (e.g., English and another language),
        please ensure it is set to English during the test phase.
      </p>
      <p>
        You can track your progress using the <b>completion bar</b> at the top of the screen.  
        Note that it has been refreshed to reflect your progress during this final phase.
      </p>
      <p>
        Press the button below when you are ready to continue.
      </p>
    </div>`
    ),
  choices: ["Begin Test Phase"],
  on_start: function() {
        // Hide progress bar
        var progressBar = document.querySelector('#jspsych-progressbar-container');
        if (progressBar) {
            progressBar.style.display = 'none';
        }
    },
  on_finish: function() {
      // Show progress bar again and set it to 0
      var progressBar = document.querySelector('#jspsych-progressbar-container');
      if (progressBar) {
          progressBar.style.display = 'block';
      }
      updateProgressBar(0, '');
  }
};

// Debriefing
let debrief = {
  type: jsPsychHtmlButtonResponse,
  stimulus: (
    `<div style="max-width: ${spacing_answers*2}px; margin: auto; font-size: ${instructions_font_size}px; line-height: 1.5;">
      <h1 style="text-align:center; font-size: ${instructions_font_size*1.5}px;">Debriefing</h1>
      <p>
        Congratulations! You have completed the experiment. Thank you for your participation. You will receive 1 credit soon; please allow some time for processing. If you do not receive a confirmation email within <b>one week</b>, please contact the experimenter. <b>Important</b>: Please do not run the experiment again.
      </p>
      <p>
        In this study, we are investigating what makes certain items more memorable than others.  
        Our hypothesis is that some items are easier to remember because they stand out within their category.  
        For example, a rock with a distinctive color or shape is more likely to be remembered than one that looks similar to many others in the same category. 
        Your data will allow us to investigate how the distinctiveness of visual objects within their categories influences their memorability.
      </p>
      <p>
        <b>Your data has been successfully saved</b> on our servers.  
        You may now close this window at any time.  
        If you have any questions or concerns, please feel free to contact the experimenter.  
        Thank you again for your time and effort!
      </p>
    </div>`
    ),
  choices: [],
  on_start: function() {
    // Hide progress bar
    var progressBar = document.querySelector('#jspsych-progressbar-container');
    if (progressBar) {
        progressBar.style.display = 'none';
      }
    }
};

