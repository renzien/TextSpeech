const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// Init Voices
let voices = [];
const getVoices = () => {
    voices = synth.getVoices();
    // Loop
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name + '(' + voice.lang + ')';

        // Attribute Voice
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-lang', voice.name);
        voiceSelect.appendChild(option);
    });
};

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

// Speak Button
const speak = () => {
    if(synth.speaking){
        console.error('Already Speaking');
        return;
    }

    if(textInput.value !== ''){
        // Background
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';

        // Get Speak
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        // Speak End
        speakText.onend = e => {
            console.log('Done Speaking');
            body.style.background = '#141414';
        }

        // Speak Error
        speakText.onerror = e => {
            console.error('Something went wrong.. I think');
        }

        // Selected Voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop Voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });

        // Pitch and Rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // Speak
        synth.speak(speakText);
    }
};

// Event Listeners

// Submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate Value Change
rate.addEventListener('change', e => rateValue.textContent = rate.value);

// Pitch Value Change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

// Voice Select Change
voiceSelect.addEventListener('change', e => speak());