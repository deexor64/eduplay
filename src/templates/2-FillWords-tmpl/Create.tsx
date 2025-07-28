"use client"

import { useEffect, useState } from "react";
import { CreateActivityProps } from "@/components/templates/CreateActivityLayout";

export type ActivityDataType = {
  paragraph: string,
  options: Array<string>,
  used: Array<string>,
}

/*
Activity output example

{
  "paragraph": "The quick brown fox jumps over the lazy [[[dog]]]. The [[[fox]]] was very fast and the [[[dog]]] was very [[[slow]]]. They lived in a beautiful [[[forest]]] near the river.",
  "options": ["dog", "fox", "dog", "slow", "forest", "fast", "lazy", "city", "cave"],
  "used": []
}
*/

export default function FillWords(props: CreateActivityProps) {

  const { setActivityValidation, setActivityFinalizer } = props;

  // Central state for all activity data
  const [activityData, setActivityData] = useState<ActivityDataType>({
    paragraph: "",
    options: [],
    used: [],
  });

  // For managing the word input and insertion
  const [wordInput, setWordInput] = useState("");
  const [extraWordInput, setExtraWordInput] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  // Validation effect
  useEffect(() => {
    // Paragraph must not be empty
    if (!activityData.paragraph.trim()) {
      setActivityValidation({ status: false, message: "Paragraph cannot be empty." });
      return;
    }

    // Must have at least one word option
    if (activityData.options.length === 0) {
      setActivityValidation({ status: false, message: "You must add at least one word option." });
      return;
    }

    setActivityValidation({ status: true, message: "" });
  }, [activityData, setActivityValidation]);

  // Finalizer effect
  useEffect(() => {
    setActivityFinalizer(() => {
      return (mediaFileUrls: Map<string, string> | false): ActivityDataType => {
        return activityData;
      };
    });
  }, [activityData, setActivityFinalizer]);

  // Add a word to the paragraph at cursor position
  function addWordToParagraph() {
    if (!wordInput.trim()) return;

    const beforeCursor = activityData.paragraph.slice(0, cursorPosition);
    const afterCursor = activityData.paragraph.slice(cursorPosition);
    const newParagraph = beforeCursor + `[[[${wordInput.trim()}]]]` + afterCursor;

    setActivityData(prev => {
      // Add to options if not already present
      const wordExists = prev.options.includes(wordInput.trim());
      const newOptions = wordExists ? prev.options : [...prev.options, wordInput.trim()];
      
      return {
        ...prev,
        paragraph: newParagraph,
        options: newOptions
      };
    });

    setWordInput("");
  }

  // Remove a word from paragraph
  function removeWordFromParagraph(word: string) {
    const newParagraph = activityData.paragraph.replace(`[[[${word}]]]`, word);
    setActivityData(prev => ({
      ...prev,
      paragraph: newParagraph,
      options: prev.options.filter(option => option !== word)
    }));
  }

  // Handle paragraph text change
  function handleParagraphChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newParagraph = e.target.value;
    
    setActivityData(prev => {
      // Extract new words from brackets
      const newWords: string[] = [];
      const regex = /\[\[\[([^\]]+)\]\]\]/g;
      let match;
      
      while ((match = regex.exec(newParagraph)) !== null) {
        const word = match[1];
        if (!prev.options.includes(word)) {
          newWords.push(word);
        }
      }
      
      return {
        ...prev,
        paragraph: newParagraph,
        options: [...prev.options, ...newWords]
      };
    });
    
    setCursorPosition(e.target.selectionStart);
  }

  // Handle word input change
  function handleWordInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWordInput(e.target.value);
  }

  // Handle extra word input change
  function handleExtraWordInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setExtraWordInput(e.target.value);
  }

  // Handle Enter key in word input
  function handleWordInputKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addWordToParagraph();
    }
  }

  // Handle Enter key in extra word input
  function handleExtraWordInputKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addExtraWord();
    }
  }

  // Add extra word to options
  function addExtraWord() {
    if (!extraWordInput.trim()) return;

    setActivityData(prev => {
      const wordExists = prev.options.includes(extraWordInput.trim());
      const newOptions = wordExists ? prev.options : [...prev.options, extraWordInput.trim()];
      
      return {
        ...prev,
        options: newOptions
      };
    });

    setExtraWordInput("");
  }

  // Extract words from paragraph for display
  function extractWordsFromParagraph() {
    const words: Array<{ word: string, startIndex: number, endIndex: number }> = [];
    const regex = /\[\[\[([^\]]+)\]\]\]/g;
    let match;
    
    while ((match = regex.exec(activityData.paragraph)) !== null) {
      words.push({
        word: match[1],
        startIndex: match.index,
        endIndex: match.index + match[0].length
      });
    }
    
    return words;
  }

  const paragraphWords = extractWordsFromParagraph();

  return (
    <section className="mb-6 bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Create Paragraph with Fill Words</h2>
      
      {/* Word Input Section - Special and Extra words in one row */}
      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-md font-semibold mb-3 text-blue-800">Add Words</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Special Words Input - Words that get inserted into paragraph with brackets */}
          <div>
            <h4 className="text-sm font-semibold mb-2 text-blue-700">Special Words</h4>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 border border-blue-300 rounded-lg bg-white transition-colors duration-300 focus:border-blue-500 focus:outline-none"
                placeholder="Type a word to add to paragraph..."
                value={wordInput}
                onChange={handleWordInputChange}
                onKeyDown={handleWordInputKeyPress}
              />
              <button
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm"
                onClick={addWordToParagraph}
              >
                Add
              </button>
            </div>
          </div>

          {/* Extra Words Input - Additional choices for students that don't appear in paragraph */}
          <div>
            <h4 className="text-sm font-semibold mb-2 text-green-700">Extra Words</h4>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 border border-green-300 rounded-lg bg-white transition-colors duration-300 focus:border-green-500 focus:outline-none"
                placeholder="Type extra words for students..."
                value={extraWordInput}
                onChange={handleExtraWordInputChange}
                onKeyDown={handleExtraWordInputKeyPress}
              />
              <button
                className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 text-sm"
                onClick={addExtraWord}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Current Options Display - Shows all available words for students with remove functionality */}
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Current Word Options</h3>
        <div className="flex flex-wrap gap-2">
          {activityData.options.map((word, index) => (
            <div key={index} className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg border border-gray-300">
              <span className="font-medium">{word}</span>
              <button
                className="text-red-500 hover:text-red-700 text-sm"
                onClick={() => {
                  setActivityData(prev => {
                    const wordToRemove = prev.options[index];
                    const newParagraph = prev.paragraph.replace(new RegExp(`\\[\\[\\[${wordToRemove}\\]\\]\\]`, 'g'), wordToRemove);
                    
                    return {
                      ...prev,
                      paragraph: newParagraph,
                      options: prev.options.filter((_, i) => i !== index)
                    };
                  });
                }}
                title="Remove word"
              >
                ×
              </button>
            </div>
          ))}
          {activityData.options.length === 0 && (
            <div className="text-gray-500 italic">No word options added yet.</div>
          )}
        </div>
      </div>

      {/* Paragraph Editor and Preview Section - Tabbed interface */}
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Paragraph Editor</h3>
        
        {/* Tab Buttons */}
        <div className="flex mb-2">
          <button
            className={`px-4 py-2 rounded-t-lg transition-colors duration-300 ${
              !showPreview 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setShowPreview(false)}
          >
            Editor
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg transition-colors duration-300 ${
              showPreview 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setShowPreview(true)}
          >
            Preview
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="border border-gray-300 rounded-b-lg">
          {!showPreview ? (
            /* Editor Tab - Main text area for writing the paragraph */
            <div className="p-4">
              <textarea
                className="w-full h-48 p-4 border border-gray-300 rounded-lg bg-white transition-colors duration-300 focus:border-blue-500 focus:outline-none resize-none"
                placeholder="Write your paragraph here. Use the input above to add special words that students need to fill in..."
                value={activityData.paragraph}
                onChange={handleParagraphChange}
                onSelect={(e) => setCursorPosition(e.currentTarget.selectionStart)}
              />
            </div>
          ) : (
            /* Preview Tab - Shows how students will see the paragraph */
            <div className="p-4 bg-gray-50">
              <h4 className="text-sm font-semibold mb-2 text-gray-700">Student View:</h4>
              <div className="text-gray-800 leading-relaxed">
                {paragraphWords.length > 0 ? (
                  <div>
                    {paragraphWords.map((wordInfo, index) => {
                      const beforeWord = activityData.paragraph.slice(
                        index === 0 ? 0 : paragraphWords[index - 1].endIndex,
                        wordInfo.startIndex
                      );
                      return (
                        <span key={index}>
                          {beforeWord}
                          <span className="inline-flex items-center gap-1 bg-yellow-200 border border-yellow-400 rounded px-2 py-1 mx-1">
                            {wordInfo.word}
                            <button
                              className="text-red-500 hover:text-red-700 text-sm"
                              onClick={() => removeWordFromParagraph(wordInfo.word)}
                              title="Remove word"
                            >
                              ×
                            </button>
                          </span>
                          {index === paragraphWords.length - 1 && 
                            activityData.paragraph.slice(wordInfo.endIndex)
                          }
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    {activityData.paragraph ? (
                      <span>{activityData.paragraph}</span>
                    ) : (
                      <span className="text-gray-500 italic">No paragraph text yet. Write your paragraph in the editor.</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
