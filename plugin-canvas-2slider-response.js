var jsPsychCanvas2SliderResponse = (function (jspsych) {
    'use strict';
  
    const info = {
        name: "canvas-2slider-response",
        parameters: {
            /** The drawing function to apply to the canvas. Should take the canvas object as argument. */
            stimulus: {
                type: jspsych.ParameterType.FUNCTION,
                pretty_name: "Stimulus",
                default: undefined,
            },
            /** Sets the minimum value of the slider. */
            min: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Min slider",
                default: 0,
            },
            /** Sets the maximum value of the slider */
            max: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Max slider",
                default: 100,
            },
            min2: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Min2 slider",
                default: 0,
            },
            /** Sets the maximum value of the slider */
            max2: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Max2 slider",
                default: 100,
            },
            /** Sets the starting value of the slider */
            slider_start: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Slider starting value",
                default: 50,
            },
            /** Sets the step of the slider */
            step: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Step",
                default: 1,
            },
            /** Array containing the labels for the slider. Labels will be displayed at equidistant locations along the slider. */
            labels: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Labels",
                default: [],
                array: true,
            },
            /** Width of the slider in pixels. */
            slider_width: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Slider width",
                default: null,
            },
            slider_start: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Slider starting value",
                default: 50,
            },
            /** Sets the step of the slider */
            step2: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Step2",
                default: 1,
            },
            /** Array containing the labels for the slider. Labels will be displayed at equidistant locations along the slider. */
            labels2: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Labels2",
                default: [],
                array: true,
            },
            /** Width of the slider in pixels. */
            slider_width2: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Slider width2",
                default: null,
            },
            /** Label of the button to advance. */
            button_label: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Button label",
                default: "Continue",
                array: false,
            },
            /** If true, the participant will have to move the slider before continuing. */
            require_movement: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Require movement",
                default: false,
            },
            /** Any content here will be displayed below the slider */
            prompt: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Prompt",
                default: null,
            },
            prompt2: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Prompt2",
                default: null,
            },
            /** How long to show the stimulus. */
            stimulus_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Stimulus duration",
                default: null,
            },
            /** How long to show the trial. */
            trial_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Trial duration",
                default: null,
            },
            /** If true, trial will end when user makes a response. */
            response_ends_trial: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Response ends trial",
                default: true,
            },
            /** Array containing the height (first value) and width (second value) of the canvas element. */
            canvas_size: {
                type: jspsych.ParameterType.INT,
                array: true,
                pretty_name: "Canvas size",
                default: [500, 500],
            },
            slider_number: {
                type: jspsych.ParameterType.BOOL,
                default: true
            },
            slider_number2: {
                type: jspsych.ParameterType.BOOL,
                default: true
            }
            
        },
    };
    /**
     * **canvas-2slider-response**
     *
     * Has two  sliders with options for different prompts, labels, mins, maxes
     *
     * @author Samantha Reisman (adapted from Josh de Leeuw, dynamic slider code adapted from modified from Gorka Navarrete)
     * @see {@link https://www.jspsych.org/plugins/jspsych-canvas-slider-response/ canvas-slider-response plugin documentation on jspsych.org}
     * @seeTHISplugin {@link canvas-2slider-response plugin GitHub link}
     */
    class Canvas2SliderResponsePlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }
        trial(display_element, trial) {
            var html = '<div id="jspsych-canvas-2slider-response-wrapper" style="margin: 100px 0px;">';
            html +=
                '<div id="jspsych-canvas-2slider-response-stimulus">' +
                    '<canvas id="jspsych-canvas-stimulus" height="' +
                    trial.canvas_size[0] +
                    '" width="' +
                    trial.canvas_size[1] +
                    '"></canvas>' +
                    "</div>";
            html +=
                '<div class="jspsych-canvas-2slider-response-container" style="position:relative; margin: 0 auto 3em auto; width:';
            if (trial.slider_width !== null) {
                html += trial.slider_width + "px;";
            }
            else {
                html += trial.canvas_size[1] + "px;";
            }
            html += '">';
            html += '<input type="range" value="'+trial.slider_start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 100%;" id="jspsych-canvas-2slider-response-response" oninput="document.getElementById(&quot;output&quot;).value = this.value"></input>';
            if(trial.slider_number){
            html += 
            '<div style="font-weight: bold; vertical-align: top; width: 110%; text-align: right; position: relative; top: -30px; z-index: -1;"><output id = "output">50</output></div>';
            }

          //  html += "<div>";
            for (var j = 0; j < trial.labels.length; j++) {
                var width = 100 / (trial.labels.length - 1);
                var left_offset = j * (100 / (trial.labels.length - 1)) - width / 2;
                html +=
                    '<div style="display: inline-block; position: absolute; left:' +
                        left_offset +
                        "%; text-align: center; width: " +
                        width +
                        '%;">';
                html += '<span style="text-align: center; font-size: 80%;">' + trial.labels[j] + "</span>";
                html += "</div>";
            }
            if (trial.prompt !== null) {
                html += trial.prompt;
            }

            html += "</div>";
            html += "</div>";

            // add second slider
            html +=
                '<div class="jspsych-canvas-2slider-response-container" style="position:relative; margin: 0 auto 3em auto; width:';
                if (trial.slider_width2 !== null) {
                    html += trial.slider_width2 + "px;";
                }
                else {
                    html += trial.canvas_size[1] + "px;";
                }
            html += '">';
    
            html += '<input type="range" value="'+trial.slider_start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 100%;" id="jspsych-canvas-2slider-response-response2" oninput="document.getElementById(&quot;output2&quot;).value = this.value"></input>';
            if(trial.slider_number2){
            html += 
            '<div style="font-weight: bold; vertical-align: top; width: 110%; text-align: right; position: relative; top: -50px; z-index: -1;"><output id = "output2">50</output></div>';
            }
            html += "<div>";
            for (var j = 0; j < trial.labels2.length; j++) {
                var width = 100 / (trial.labels2.length - 1);
                var left_offset = j * (100 / (trial.labels2.length - 1)) - width / 2;
                html +=
                    '<div style="display: inline-block; position: absolute; left:' +
                        left_offset +
                        "%; text-align: center; width: " +
                        width +
                        '%;">';
                html += '<span style="text-align: center; font-size: 80%;">' + trial.labels2[j] + "</span>";
                html += "</div>";
            }
            if (trial.prompt2 !== null) {
                html += trial.prompt2
            }

            html += "</div>";
            html += "</div>";

            // add submit button
            html +=
                '<button id="jspsych-canvas-2slider-response-next" class="jspsych-btn" ' +
                    (trial.require_movement ? "disabled" : "") +
                    ">" +
                    trial.button_label +
                    "</button>";
            display_element.innerHTML = html;
            // draw
            let c = document.getElementById("jspsych-canvas-stimulus");
            trial.stimulus(c);
            var response = {
                rt: null,
                response: null,
                response2: null
            };


            const end_trial = () => {
                this.jsPsych.pluginAPI.clearAllTimeouts();
                // save data
                var trialdata = {
                    rt: response.rt,
                    response: response.response,
                    response2: response.response2,
                    slider_start: trial.slider_start,
                };
                display_element.innerHTML = "";
                // next trial
                this.jsPsych.finishTrial(trialdata);
            };
            if (trial.require_movement) {
                const enable_button = () => {
                    display_element.querySelector("#jspsych-canvas-2slider-response-next").disabled = false;
                };
                display_element
                    .querySelector("#jspsych-canvas-2slider-response-response")
                    .addEventListener("mousedown", enable_button);
                display_element
                    .querySelector("#jspsych-canvas-2slider-response-response")
                    .addEventListener("touchstart", enable_button);
                display_element
                    .querySelector("#jspsych-canvas-2slider-response-response")
                    .addEventListener("change", enable_button);
                display_element
                    .querySelector("#jspsych-canvas-2slider-response-response2")
                    .addEventListener("mousedown", enable_button);
                display_element
                    .querySelector("#jspsych-canvas-2slider-response-response2")
                    .addEventListener("touchstart", enable_button);
                display_element
                    .querySelector("#jspsych-canvas-2slider-response-response2")
                    .addEventListener("change", enable_button);
            }
            display_element
                .querySelector("#jspsych-canvas-2slider-response-next")
                .addEventListener("click", () => {
                // measure response time
                var endTime = performance.now();
                response.rt = Math.round(endTime - startTime);
                response.response = display_element.querySelector("#jspsych-canvas-2slider-response-response").valueAsNumber;
                response.response2 = display_element.querySelector("#jspsych-canvas-2slider-response-response2").valueAsNumber;
                if (trial.response_ends_trial) {
                    end_trial();
                }
                else {
                    display_element.querySelector("#jspsych-canvas-2slider-response-next").disabled = true;
                }
            });
            if (trial.stimulus_duration !== null) {
                this.jsPsych.pluginAPI.setTimeout(() => {
                    display_element.querySelector("#jspsych-canvas-2slider-response-stimulus").style.visibility = "hidden";
                }, trial.stimulus_duration);
            }
            // end trial if trial_duration is set
            if (trial.trial_duration !== null) {
                this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
            }
            var startTime = performance.now();
        }
    }
    Canvas2SliderResponsePlugin.info = info;
  
    return Canvas2SliderResponsePlugin;
  
  })(jsPsychModule);
  