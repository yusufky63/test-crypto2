import React, {useState} from "react";
function TextAnalyzer() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [vowelCount, setVowelCount] = useState(0);
  const [consonantCount, setConsonantCount] = useState(0);
  const [mostFrequentWord, setMostFrequentWord] = useState("");
  const [numberCount, setNumberCount] = useState(0);

  function analyzeText() {
    const words = text.split(/\s+/);
    setWordCount(words.length);
    const chars = text.replace(/\s/g, "");
    setCharCount(chars.length);

    const vowels = chars.match(/[aeıioöuü]/gi);
    setVowelCount(vowels ? vowels.length : 0);

    const consonants = chars.match(/[bcçdfgğhjklmnprsştvyz]/gi);
    setConsonantCount(consonants ? consonants.length : 0);

    const number = chars.match(/[0-9]/gi);
    setNumberCount(number ? number.length : 0);

    const frequency = {};
    let maxCount = 0;
    let mostFrequent = "";
    words.forEach((word) => {
      if (!frequency[word]) {
        frequency[word] = 1;
      } else {
        frequency[word]++;
      }
      if (frequency[word] > maxCount) {
        maxCount = frequency[word];
        mostFrequent = word;
      }
    });
    setMostFrequentWord(mostFrequent);
  }

  function handleClear() {
    setText("");
    setWordCount(0);
    setCharCount(0);
    setVowelCount(0);
    setConsonantCount(0);
    setMostFrequentWord("");

    setNumberCount(0);
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className=" max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Metin Analizörü</h1>
        <div className="flex flex-col space-y-4 sm:space-x-4  sm:items-center mb-8">
          <textarea
            className="border w-full border-gray-400 p-2 rounded-md flex-grow resize-none"
            rows="8"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Metin girin..."
          />
          <div className="flex  justify-between  w-full">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded"
              onClick={analyzeText}
            >
              Analiz Et
            </button>
            <button
              onClick={handleClear}
              className="bg-red-500  hover:bg-red-700 text-white font-bold py-2 px-12 rounded"
            >
              Temizle
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Kelime Sayısı</h2>
            <p className="text-4xl font-bold text-center">{wordCount}</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Karakter Sayısı</h2>
            <p className="text-4xl font-bold text-center">{charCount}</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Ünlü Harf Sayısı</h2>
            <p className="text-4xl font-bold text-center">{vowelCount}</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Sessiz Harf Sayısı</h2>
            <p className="text-4xl font-bold text-center">{consonantCount}</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">En Sık Geçen Kelime</h2>
            <p className="text-4xl font-bold text-center">{mostFrequentWord}</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Sayı Sayısı</h2>
            <p className="text-4xl font-bold text-center">{numberCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TextAnalyzer;
