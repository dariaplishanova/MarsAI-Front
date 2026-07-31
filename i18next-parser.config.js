export default {
  // Save new keys in alphabetical order inside the JSON files
  lexicalOrder: true,

  // Look through all React and TypeScript files inside the src directory
  input: ['src/**/*.{ts,tsx}'],

  // CRITICAL: Set to false to automatically wipe out keys no longer found in the code
  keepRemoved: false,

  // Supported languages (adjust if you use more or different locales)
  locales: ['en', 'fr'],

  // Where to output the parsed files. Assumes your translation files live in src/i18n/
  // $LOCALE will automatically switch to 'en' or 'fr' during execution
  output: 'src/i18n/$LOCALE.json', 

  // Matches your default setup using the standard t() function wrapper
  keySeparator: false,
  namespaceSeparator: false,
};