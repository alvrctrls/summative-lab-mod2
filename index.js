
const form = document.querySelector('#search-form');
const wordInput = document.querySelector('#word-input');

const wordElement = document.querySelector('#word');
const phoneticElement = document.querySelector('#phonetic');
const definitionsElement = document.querySelector('#definitions');
const synonymsElement = document.querySelector('#synonyms');
const errorElement = document.querySelector('#error-message');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const word = wordInput.value.trim();

  if (!word) return;

  // Clears previous results
  wordElement.textContent = '';
  phoneticElement.textContent = '';
  definitionsElement.innerHTML = '';
  synonymsElement.innerHTML = '';
  errorElement.textContent = '';

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
    );

    if (!response.ok) {
      throw new Error('Word not found. Try another word.');
    }

    const data = await response.json();

    const entry = data[0];

    wordElement.textContent = entry.word;

    
    const phonetic = entry.phonetic 
      entry.phonetics.find(item => item.text)?.text 
      'Pronunciation unavailable';

    phoneticElement.textContent = phonetic;

    
    entry.meanings.forEach(function (meaning) {
      const heading = document.createElement('h3');
      heading.textContent = meaning.partOfSpeech;

      definitionsElement.appendChild(heading);

      meaning.definitions.forEach(function (definition) {
        const paragraph = document.createElement('p');
        paragraph.textContent = definition.definition;

        definitionsElement.appendChild(paragraph);
      });

      if (meaning.synonyms.length > 0) {
        const synonymParagraph = document.createElement('p');

        synonymParagraph.textContent =
          'Synonyms: ' + meaning.synonyms.join(', ');

        synonymsElement.appendChild(synonymParagraph);
      }
    });

  } catch (error) {
    errorElement.textContent =
      error.message === 'Failed to fetch'
        ? 'Unable to connect to the dictionary API. Check your connection and try again.'
        : error.message;

    console.error(error);
  }
});
